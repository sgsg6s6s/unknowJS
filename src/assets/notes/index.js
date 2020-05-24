const { readFileInPath } = require('@/utils/node/extractMsgByDir')
const notePathDir = '/src/assets/notes'
const notePath = __dirname + notePathDir
const files = readFileInPath(notePath)
console.info(files)
console.info(11111)
export { files }
