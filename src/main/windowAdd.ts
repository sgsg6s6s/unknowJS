window.MonacoEnvironment = {
  getWorkerUrl: function(moduleId: string, label: string) {
    let result = './editor.worker.js'
    if (label === 'json') {
      result = './json.worker.js'
    }
    if (label === 'css') {
      result = './css.worker.js'
    }
    if (label === 'html') {
      result = './html.worker.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      result = './typescript.worker.js'
    }
    if (label === 'sql') {
      result = './sql.worker.js'
    }
    return result
  }
}
