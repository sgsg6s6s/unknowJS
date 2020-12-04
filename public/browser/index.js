const excludeEvents = ['onmouseenter', 'onmousemove', 'onmouseout', 'onmouseleave', 'onmouseover',
  'onpointerenter', 'onpointermove', 'onpointerout', 'onpointerleave', 'onpointerover',
  'onpointerrawupdate']

const includeEvents = ['onreadystatechange', 'onload', 'onhashchange']

function hashListenedByBody(event) {
  console.info('body标签监听地址变化', event)
}

function bodyOnLoad(event) {
  console.info('body on load', event)
}

function refreshLocationMsg() {
  const content = document.querySelector('#content')
  content.innerText = JSON.stringify({ hash: location.hash, url: location.href })
}

for (const target of [document, window]) {
  for (const key in target) {
    if (key.startsWith('on') && !excludeEvents.includes(key) && includeEvents.includes(key) && (typeof target[key] === 'function' || typeof target[key] === 'object')) {
      target[key] = function (event) {
        console.info('------------------')
        console.info(target.toString(), key, event)
        console.info('document state:', document.readyState)
        if (key === 'onhashchange') {
          refreshLocationMsg()
        }
      }
    }
  }
}

const pic = document.querySelector('#pic')
pic.src = '../../../static/img/favicon.ico'
pic.onload = function () {
  console.info('不等图片加载好，就 DOMContentLoaded')
}

document.addEventListener('DOMContentLoaded', function () {
  console.info('------------------')
  console.log('document addEventListener[DOMContentLoaded]');
  console.info('document state:', document.readyState)
});
window.addEventListener('DOMContentLoaded', function () {
  console.info('------------------')
  console.log('window addEventListener[DOMContentLoaded]');
  console.info('document state:', document.readyState)
});


document.querySelector('.append-hash').addEventListener('click', function (event) {
  location.href = location.href.split('#')[0] + '#' + Math.round(Math.random() * 100)
})



const iframes = document.querySelectorAll('iframe')
for (const iframe of iframes) {
  const name = iframe.name
  const blob = new Blob([`<h2>${name}</h2>`], { type: "text/html" })
  const html = URL.createObjectURL(blob)
  iframe.src = html
  iframe.contentWindow.addEventListener('hashchange', function hashchanged(event) {
    console.info(`${name} hashchange`, event)
  })
  URL.revokeObjectURL(blob)
}

(function () {
  console.info('cluster in last js file')
  refreshLocationMsg()
  const leftFrame = document.querySelector('[name="left"]')
  const middleFrame = document.querySelector('[name="middle"]')
  const rightFrame = document.querySelector('[name="right"]')
  console.info('exists:', leftFrame, middleFrame, rightFrame)
})();