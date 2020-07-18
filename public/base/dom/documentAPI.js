const domContainer = document.querySelector('#domContainer')
const div = document.createElement('div')
const div3 = document.createElement('div')
const span = document.createElement('span')
const text = document.createTextNode('text node')

div3.innerText = '添加到第二个div前头'
domContainer.appendChild(div)
div.appendChild(span)
span.appendChild(text)

const div2 = domContainer.append('<div>第二个div</div>')
domContainer.insertBefore(div3, div2)

const removeButton = document.createElement('button')
removeButton.addEventListener('click', function () {
  domContainer.removeChild(domContainer.firstChild)
})
removeButton.innerText = 'remove first'
domContainer.appendChild(removeButton)

const replaceButton = document.createElement('button')
replaceButton.addEventListener('click', function () {
  domContainer.replaceChild(document.createTextNode('replace with text node</br>'), domContainer.firstChild)
})
replaceButton.innerText = 'replace first'
domContainer.appendChild(replaceButton)