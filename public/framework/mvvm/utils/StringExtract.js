/**
 * 获得字符串中双括号的匹配结果
 * @param {*} str 
 */
function getBraceParseResult(str) {
  const parseResult = []
  if (str && str.length > 0) {
    const stack = []

    for (let i = 0; i < str.length; i++) {
      const c = str[i]
      if (c === '{' && str[i + 1] === '{') {
        if (stack.length === 0) {
          stack.push({
            braceStart: i,
          })
        } else {
          console.error('double brace syntax error')
        }
      } else if (c === '}' && str[i + 1] === '}') {
        if (stack.length === 1) {
          const ele = stack.pop()
          ele.braceEnd = i + 2
          ele.content = str.substring(ele.braceStart + 2, i)
          parseResult.push(ele)
        } else {
          console.error('double brace syntax error')
        }
      }
    }
  }
  return parseResult
}