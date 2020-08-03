



const shakeTable = {
  '<!--.*?-->': '', // 注释
  '\\r\\n': '', // 换行
  '\\s+': ' ', // 空白字符串变为一个空格
  ' *(=|<|>|/>) *': '$1',// 左右都不需要保留空格
  ' *("|\'|`)': '$1', // 去掉引号前的空格
}

// 格式化未封闭的标签
const toCloseTagReplaceReg = /(<(input|img|hr|br)( [^`'" ]*=([`'"])((?<!\/>).)*?\4)*)>/g
//  将html字符串拆分出完整的标签字符串
const nodeSplitReg = /(?:(<\/?[a-zA-Z0-9]+(?: [^`'" ]*=([`'"]).*?\2)*\/?>))/g

// 从完整的标签字符串提取 没有值的标签属性名称
const extractSingleAttrMatchReg = /(?<!=[`'"][^`'"]*)(?<= )[^<`'">=]+(?= |>)/g

// 从完整的标签字符串提取 所有标签属性名称
const extractAllAttrMatchReg = /(?<= )[^`'" ]*(?==([`'"])(?:.*?\1))|(?<!=[`'"][^`'"]*)(?<= )[^<`'">=]+(?= |>)/g

// 从完整的标签字符串提取 属性名称和值
const extractValuedAttrMatchReg = /(?<= )[^`'" ]*=([`'"])(?:.*?\1)/g

// 提取属性名称和属性值
const extractKeyValueExecReg = /([^<`'">\\/ ]*)=([`'"])(.*?)\2/g
// 提取tag名字
const extractTagNameMatchReg = /(?<=<)[^<'"`>\\/ ]*(?= ?)/g

// split方式属性提取，但遇到无值的属性不好处理，暂时不使用这种方式
const attributeSplitReg = /(?: ([^`\\'" ]*)=([`'"])(?:.*?\2))/g



function formatHTML(html) {
  let tree = []
  const startMills = Date.now()
  if (typeof html === "string") {
    console.info('html length', html.length)
    const shaked = shakeChars(html)
    console.info('shaked length', shaked.length, shaked)
    const closedHTML = formatUnclosedTag(shaked)
    console.info('closedHTML length', closedHTML.length, closedHTML)
    const tags = _collectTag(closedHTML)
    console.info('tags length', tags.length, tags)
    tree = buildTree(tags)
    console.info('tree length', tree.length, tree)
  }
  console.info('format HTML costs', (Date.now() - startMills) / 1000)
  return tree
}

function _collectTag(html) {
  const result = []
  if (html) {
    const splitResults = html.split(nodeSplitReg)
    for (const tagPeriod of splitResults) {
      if (tagPeriod && tagPeriod.length > 0 && !["`", "\\'", "\""].includes(tagPeriod)) {
        result.push(tagPeriod)
      }
    }
  }
  return result
}

function buildTree(tags) {
  const root = []
  const stack = []
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i]
    const tagLength = tag.length
    if (tag[0] === '<' && tag[tagLength - 1] === '>') { // <xxxx>
      if (tag[1] === '/') { // </xxxx
        if (tag[tagLength - 2] === '/') {
          console.error('bad tag </xxxx/>', tag)
        } else { //</xxxx> 出栈
          outStack(stack, root)
        }
      } else if (tag[tagLength - 2] === '/') { // <xxxx/> 入栈 + 出栈
        const node = createTagNode(tag, stack)
        inStack(node, stack)
        outStack(stack, root)
      } else { // <xxxx> 入栈
        const node = createTagNode(tag)
        inStack(node, stack)
      }
    } else { // textNode 入栈 + 出栈
      const node = createTextNode(tag, stack)
      inStack(node, stack)
      outStack(stack, root)
    }
  }
  console.info('root', root)
  return root
}

function createTextNode(tag) {
  return {
    nodeType: 'text',
    innerText: tag
  }
}

function createTagNode(tag) {
  const pairResult = tag.match(new RegExp(extractValuedAttrMatchReg))// 提取属性
  const tagMatch = tag.match(new RegExp(extractTagNameMatchReg))
  if (!tagMatch) {
    console.info(tag, tagMatch)
  }
  const node = { nodeType: 'tag', attributes: [], tagName: tagMatch && tagMatch[0], children: [], html: tag }

  if (pairResult) {
    for (const pair of pairResult) {
      const pairs = new RegExp(extractKeyValueExecReg).exec(pair)
      if (pairs[0].length > 0) {// 匹配成功
        node.attributes.push({
          name: pairs[1],
          expression: pairs[3],
        })
      }
    }
  }
  return node
}


function inStack(node, stack) {
  const topNode = stack[stack.length - 1]
  if (topNode) {// 设置父子关系
    topNode.children.push(node)
    node.parent = topNode
  } else {
    node.parent = null
  }
  stack.push(node)
}

function outStack(stack, root) {
  const node = stack.pop()
  if (stack.length === 0) {// 跟节点
    root.push(node)
  }
}


function formatUnclosedTag(html) {
  const start = Date.now()
  const result = html.replace(toCloseTagReplaceReg, '$1/>')
  console.info('formatUnclosedTag costs:', (Date.now() - start))
  return result
}

/**
 * 去除html模板不重要的字符
 * @param {string} str 
 */
function shakeChars(str = "") {
  let result = str.trim()
  const start = Date.now()
  for (const reg in shakeTable) {
    result = result.replace(new RegExp(reg, 'g'), shakeTable[reg])
  }
  console.info('shakeChars costs:', (Date.now() - start))
  return result
}

let xx = 0

/**
 * 这个方法判断有问题，处理不了复杂的同名嵌套，比如：<a><a :key="a<b"><a>123</a><a/></a><a><b></b></a><c></c><d/></a><a></a>
 * @param {*} html 
 */
function extractChildren(html) {
  xx++
  /**
    * 规则字符串
    *
    * test unit:
    *  '<b :value="a<2 && b>3" :key="item.id" v-for="(item,index) in items">{{a > b}}</b><input/><input/><span></span><d>123</d><c/><f/><e>123</e>'.split(/(<([a-zA-Z0-9]+)( [^`'" ]*=([`'"]).*\4)*(?:>?.*<\/\2>|\/>))/)
          * 匹配 < XXX CCC = "DDD" > YYY</XXX > 或 < XXX />
    * 注意：规则放到字符串里好多字符都加了转义
    * $1: 匹配内容, $2: tagName, $3: 键值对字符串, $4: 引号 $5: innerHTML
    */
  const closedTagRegString = '(<([a-zA-Z0-9]+)( [^`\'" ]*=([`\'"]).*?\\4)*(?:>?(.*)<\\/\\2>|\\/>))'
  const closedTagReg = new RegExp(closedTagRegString, 'g') // RegExp

  const start = Date.now()
  const nodes = [] // 子DOM节点
  // 拿到第一个闭合标签的innerText
  const splitResult = html.split(closedTagReg)
  const resultLen = splitResult.length // 至少一个
  if (resultLen === 1) {// 匹配失败
    console.info('leaf node', html)
  } else {
    let lastNode
    for (let i = 1; i < resultLen; i++) {
      switch (i % 6) {
        case 1: {
          lastNode = {}
          nodes.push(lastNode)
          lastNode.html = splitResult[i]
          break;
        }
        case 2: {
          lastNode.tagName = splitResult[i]
          break;
        }
        case 3: {
          if (splitResult[i]) {
            const attrPeriods = splitResult[i].split(attributeSplitReg)
            const attributes = []
            let attribute
            for (let i = 1; i < attrPeriods.length; i++) {
              if (i % 2 === 1) {
                attribute = { name: attrPeriods[i] }
                attributes.push(attribute)
              } else {
                attribute.expression = attrPeriods[i].substring(0, attrPeriods[i].length - 1)
              }
            }
            lastNode.attributes = attributes
          }
          break;
        }
        case 5: {
          const innerHTML = splitResult[i]
          if (innerHTML && innerHTML.length > 0) {
            lastNode.innerHTML = innerHTML
            lastNode.children = extractChildren(innerHTML)
          }
          break;
        }
      }
    }
  }
  if (xx === 1) {
    console.info('no xx ' + xx + ' cost ', Date.now() - start)
  }
  return nodes
}


