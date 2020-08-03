console.info('script file between dom')
console.info('document state:', document.readyState)

  ; (function () {
    console.info('cluster in between js file')
  })();