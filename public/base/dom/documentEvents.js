// document.createEvent()
// event.initEvent()
// element.dispatchEvent()

// 自定义事件的触发
// const dom = document.querySelector('#tester')
// dom.addEventListener('alert', function eventCallback(event) {
//   console.log(event)
//   dom.removeEventListener('alert', eventCallback, false)
// }, false);

// // 创建
// const evt = document.createEvent("HTMLEvents");
// // 初始化
// evt.initEvent("alert", false, false);

// // 触发, 即弹出文字
// dom.dispatchEvent(evt);
// dom.dispatchEvent(evt);

// $(".outter").click(function callback(event) {
//   console.info('outter', event, event.target, event.currentTarget)
//   $(this).off("click");
//   this.addEventListener("click", callback, true)
// })

// $(".inner").click(function callback(event) {
//   console.info('inner', event.target, event.currentTarget)
//   event.stopPropagation();
//   // return false;

//   $(this).off("click");
//   this.addEventListener("click", callback, true)
// })

window.addEventListener("click", function (event) {
  console.info('window', event.target, event.currentTarget)
}, true)


document.addEventListener("click", function (event) {
  console.info('document', event.target, event.currentTarget)
}, true)

// const first = document.querySelector('#first')

// first.addEventListener("click", function (event) {
//   let target = event.target;
//   while (target !== first) {
//     if (target.className.includes('replace')) {
//       console.info('first', event.target, event.currentTarget, target.getAttribute('msg'))
//       break;
//     }
//     target = target.parentNode;
//   }

// }, false)
