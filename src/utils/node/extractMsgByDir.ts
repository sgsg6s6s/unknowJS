const fs = require('fs')
const { join } = require('path')

export function extractConfig(dirPath: string) {
  const jsonFiles = []
  function findJsonFile(path: string) {
    const files = fs.readdirSync(path)
    files.forEach(function(item: string, index: number) {
      const fPath = join(path, item)
      const stat = fs.statSync(fPath)
      if (stat.isDirectory() === true) {
        findJsonFile(fPath)
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath)
      }
    })
  }
}
