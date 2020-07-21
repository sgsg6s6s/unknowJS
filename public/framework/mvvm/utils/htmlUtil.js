/**
 * 规则字符串
 * 
 * test unit:
 *  '<b :value="a<2 && b>3" :key="item.id" v-for="(item,index) in items">{{a > b}}</b><input/><input/><span></span><d>123</d><c/><f/><e>123</e>'.split(/(<([a-zA-Z0-9]+)( [^`'" ]*=([`'"]).*\4)*(?:>?.*<\/\2>|\/>))/)
 * 匹配 <XXX CCC="DDD">YYY</XXX >或<XXX/> 
 * 注意：规则放到字符串里好多字符都加了转义
 * $1:匹配内容, $2:tagName, $3:键值对字符串, $4:引号 $5:innerHTML
 */
const closedTagRegString = '(<([a-zA-Z0-9]+)( [^`\'" ]*=([`\'"]).*\\4)*(?:>?(.*)<\\/\\2>|\\/>))'
const closedTagReg = new RegExp(closedTagRegString, 'g') // RegExp


const innerTextReg = /<([a-zA-Z0-9]+)( [^`'" ]*=([`'"]).*\3)*>(.*)<\/\1>/ // 匹配标签内部内容
const splitResultExcludes = ['', ' ', '\'', '"', '`', undefined]
const closedIngoreTagNames = ['input', 'img', 'hr', 'br']
const closedIngoreRegArr = []

for (const tag of closedIngoreTagNames) {
  closedIngoreRegArr.push(new RegExp(closedTagRegString.replace('[a-zA-Z0-9]+', tag), 'g'))
}

const shakeTable = {
  '\\r\\n': '',
  '\\s+': ' ',
  ' *= *': '=',
  ' *" *': '"',
  ' *\' *': '\'',
  ' *` *': '`',
  ' *< *': '<',
  ' *> *': '>',
  ' *\\/>': '\\/>',
}

function formatUnclosedTag(html) {
  let result = html
  for (const reg of closedIngoreRegArr) {
    result = result.replace(reg, shakeTable[reg])
  }
  return result
}

/**
 * 去除html模板不重要的字符
 * @param {string} str 
 */
function shakeChars(str = "") {
  let result = str.trim()
  for (const reg of shakeTable) {
    result = result.replace(new RegExp(reg, 'g'), shakeTable[reg])
  }
  return result
}


function extractChildren(html) {
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
          const attrPeriods = splitResult[i].split(' ')
          const attributes = []
          for (const period of attrPeriods) {
            const pair = period.split('=')
            attributes.push({ attr: pair[0], expression: pair[1].substring(1, pair[1].length - 1) })
          }
          lastNode.attributes = attributes
          break;
        }
        case 5: {
          const innerHTML = lastNode.innerHTML = splitResult[i]
          if (innerHTML.length > 0) {
            lastNode.children = extractChildren(innerHTML)
          }
          break;
        }
      }
    }
  }
  return nodes
}

function formatHTML(html) {
  const result = []
  if (typeof html === "string") {
    const rowHTML = formatUnclosedTag(shakeChars(html))
    let i = 0
    const stack = []
    const len = rowHTML.length
    for (; i < len; i++) {
      const c = rowHTML[i]
      if (c === '<') {
        if (rowHTML[i + 1] === '/') {// 标签闭合开始
          if (stack.length === 0) {
            console.info('error html')
          }
          const node = stack[stack.length - 1]
          node.closeTagIndex = i // 结束标记位置 
        } else {// 标签开始
          const node = {
            startIndex: i
          }
          if (stack.length === 0) {// 顶层节点
            node.parent = null
          } else {
            const last = stack[stack.length - 1]
            node.parent = last
            if (last.children) {
              last.children.push(node)
            } else {// 第一次添加子节点
              last.children = [node]
            }
          }
          stack.push(node)
        }

      } else if (c === '>') {// 标签结尾
        const node = stack[stack.length - 1]// 栈顶节点
        const { closeTagIndex, startIndex, startHTML, tagName } = node

        // <div> , <br /> , </div>  三种不同的处理
        // <br /> , </div> 两种情况要将节点处理完毕


        if (closeTagIndex > 0 || ['input', 'br', 'hr'].includes(tagName)) {// 标签闭合，叶子节点不一定加结束标签

          if (closeTagIndex > 0) {// 解析innerHTML
            node.innerHTML = rowHTML.substring(startIndex + startHTML.length, closeTagIndex)
          }
          node.html = rowHTML.substring(startIndex, i + 1)// 完整html代码
          console.info(node.innerHTML, node.innerHTML)
          const topNode = stack.pop()
          if (stack.length === 0) {
            result.push(topNode)
          }

        } else if (rowHTML[i - 1] === '/') { // 标签结束且闭合


        } else {// 解析完开始标签，提取静态信息完毕
          const endIndex = i + 1
          node.endIndex = endIndex
          node.startHTML = rowHTML.substring(node.startIndex, endIndex)
          Object.assign(node, extractMsg(node.startHTML))
        }
      }
    }
  }
  return result
}

function extractMsg(html) {
  const matchResult = closedTagReg.exec(html)
  const msg = {}
  if (matchResult && matchResult.length > 1) {// 完整的标签
    // ["<br test="123"/>", "br test="123"", index: 0, input: "<br test="123"/>", groups: undefined]

    // 目前正则仅支持双引号
    const periods = RegExp.$1.split(/(\s+.*=\".*\")/)
    const len = periods.length
    msg.tagName = periods[0]
    msg.attributes = {}
    for (let i = 1; i < len; i++) {
      const period = periods[i]
      if (period.length > 0) {
        const attrMaps = period.split('=')// 属性键值对
        if (attrMaps.length === 1 || attrMaps[1].length === 0) {// 键值对不完整，容错
          console.info('键值对不完整，容错', period)
        } else {
          msg.attributes[attrMaps[0].trim()] = attrMaps[1]
        }
      }
    }

  } else {
    console.info('提取错误', html, matchResult)
  }
  return msg
}