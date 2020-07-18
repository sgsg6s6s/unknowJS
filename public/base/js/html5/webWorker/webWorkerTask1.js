self.addEventListener('message', function (e) {
  self.postMessage('task1: ' + e.data);
  // self.close()// 关闭 Worker 线程
}, false);