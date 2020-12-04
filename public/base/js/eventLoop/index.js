console.log('tick1 根的开始 ');

function nextTick(callback) {
  new Promise((resolve) => {
    console.info('promise body')
    resolve([])
  }).then(callback)
}

function setImmediate(callback) {
  setTimeout(callback, 0)
}


nextTick(function X() {
  console.info('tick2 任务X主体 ')

  nextTick(function a() {
    console.info('tick3 任务X的子微任务，插队到Y任务之前 ')
  })

  setImmediate(function b() {
    console.info('tick6 任务X的子宏任务，立刻插入到任务队列末尾')
  });

  setTimeout(function c() {
    console.info('tick10 任务X的子宏任务，10ms后插入到任务队列末尾')
  }, 10);

  setTimeout(function d() {
    console.info('tick8 任务X的子宏任务，4ms后插入到任务队列末尾')
  }, 4);
})

setImmediate(function Y() {
  console.info('tick4 任务Y主体 ')

  nextTick(function a() {
    console.info('tick5 任务Y的子微任务，插队到X下的宏任务之前 ')
  })

  setImmediate(function b() {
    console.info('tick7 任务Y的子宏任务，立刻插入到任务队列末尾')
  });

  setTimeout(function c() {
    console.info('tick11 任务Y的子宏任务，10ms后插入到任务队列末尾')
  }, 10);

  setTimeout(function d() {
    console.info('tick9 任务Y的子宏任务，4ms后插入到任务队列末尾')
  }, 4);
});

console.log('tick1 根的结束 ');