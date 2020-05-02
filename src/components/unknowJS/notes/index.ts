const fs = require('fs')
console.info(fs)
export const notesConfig: { [key: string]: string[][] } = {}

// function extractConfig(dirPath: string) {
//     let jsonFiles = []
//     function findJsonFile(path) {
//         let files = fs.readdirSync(path)
//         files.forEach(function(item, index) {
//             let fPath = join(path, item)
//             let stat = fs.statSync(fPath)
//             if (stat.isDirectory() === true) {
//                 findJsonFile(fPath)
//             }
//             if (stat.isFile() === true) {
//                 jsonFiles.push(fPath)
//             }
//         })
//     }
// }
