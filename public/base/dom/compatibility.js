/* eslint-disable no-var */
function getBrowserName() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
  var browser = 'IE '
  if (userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1) {
    browser += 11
  } else {
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        browser += 7;
      } else if (fIEVersion == 8) {
        browser += 8;
      } else if (fIEVersion == 9) {
        browser += 9;
      } else if (fIEVersion == 10) {
        browser += 10;
      } else {
        browser += 6;
      }
    } else if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) {
      browser = 'Edge';//edge
    } else if (userAgent.indexOf('Firefox') != -1) {
      browser = "Firefox";
    } else if (userAgent.indexOf('OPR') != -1) {
      browser = "Opera";
    } else if (userAgent.indexOf('Chrome') != -1) {
      browser = "Chrome";
    } else if (userAgent.indexOf('Safari') != -1) {
      browser = "Safari";
    } else {
      browser = 'Unknow';
    }
  }
  return browser;
}

console.info('浏览器为', getBrowserName())

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