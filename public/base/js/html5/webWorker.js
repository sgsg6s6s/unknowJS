(function () {
  const configs = {
    title: 'Web Worker',
    target: '.worker-container',
    autoRefresh: false,
    autoLoad: true,
    refresh() {
      function samePageWork() {
        onmessage = function ({ data: { list } }) {
          console.info('worker receive list:', list)
          postMessage({ object: { name: 'buffer', age: 30 } })
        }
      }
      // function -> Blob -> ObjectURL -> new Work
      console.info(samePageWork.toString())
      const mainWorker = new Worker(URL.createObjectURL(new Blob([`(${samePageWork.toString()})()`])))

      mainWorker.postMessage({ list: [1, 3, 5] })

      mainWorker.onmessage = function ({ data: { object } }) {
        console.info('main receiver object:', object)
      }

      const worker = new Worker('./webWorker/webWorkerTaskMain.js')
      let receiverTimes = 0
      worker.postMessage('Hello World');
      worker.postMessage({ method: 'echo', args: ['Work'] });
      worker.onmessage = function (event) {
        console.log('Received message ' + event.data);
        receiverTimes++
        if (receiverTimes < 1000) {
          doSomething();
        } else {
          console.info('before terminate')
          worker.terminate();
        }
      }
      worker.onerror = function onerror(msg) {
        console.log('Error info:' + msg);
      }

      function doSomething() {
        // 执行任务
        worker.postMessage('Work done!');
      }
    },
  }


  window.framework(configs)
})()