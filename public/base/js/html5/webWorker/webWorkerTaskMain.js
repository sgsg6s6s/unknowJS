self.importScripts('webWorkerTask1.js', 'webWorkerTask2.js');
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);