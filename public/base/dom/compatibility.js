
function bind(obj, eventStr, callback) {
  if (obj.addEventListener) {
    obj.addEventListener(eventStr, callback, false);
  } else {
    obj.attachEvent("on" + eventStr, callback);
  }
}

var outter = document.getElementById('outter')
var inner = document.getElementById('inner')

bind(inner, 'click', function (event) {
  console.info('inner click', 'cancelBubble', event.cancelBubble, 'stopPropagation', event.stopPropagation)
  // if (event) {
  //   event.cancelBubble = true
  //   if (event.stopPropagation) {
  //     event.stopPropagation()
  //   }
  // }
})

bind(outter, 'click', function (event) {
  console.info('outter click')
})