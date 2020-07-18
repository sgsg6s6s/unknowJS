const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const { readFileInPath } = require('./src/utils/node/extractMsgByDir')
const notePathDir = '/src/assets/notes'
const notePath = __dirname + notePathDir
const files = readFileInPath(notePath)
// console.info(files)
module.exports = {
  productionSourceMap: true,
  devServer: {
    port: 8080,
    open: true,
    // before,
    proxy: {
      '/api/mock': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api/mock': '/mock'    //代理的路径
        }
      },
      '^/api/auth': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
      '^/api/data': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    }
  },
  configureWebpack: config => {
    // console.info(config.node)
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'json'],
        features: ['coreCommands', 'find']
      })
    )
    config.entry['editor.worker'] = 'monaco-editor/esm/vs/editor/editor.worker.js'
    config.entry['ts.worker'] = 'monaco-editor/esm/vs/language/typescript/ts.worker'
  }
}
