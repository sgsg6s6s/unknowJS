const fs = require('fs')
const { join } = require('path')
function readFileInPath(dirPath) {
  const jsonFiles = []
  ;(function searchFiles(path) {
    const files = fs.readdirSync(path)
    files.forEach(function(item) {
      const fPath = join(path, item)
      const stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        searchFiles(fPath)
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath)
      }
    })
  })(dirPath)
  return jsonFiles
}
module.exports = {
  readFileInPath
}
