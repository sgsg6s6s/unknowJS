(function ($) {
  const box2 = document.querySelector('.box2')

  $('#borderBox').click(function () {
    $('.box2').css({ boxSizing: 'border-box' })
    $('.box2').text(`height:${box2.clientHeight},width:${box2.clientWidth}`)
    $('#note').text(`offset height:${box2.offsetHeight},offset width:${box2.offsetWidth}`)
  })

  $('#contentBox').click(function () {
    $('.box2').css({ boxSizing: 'content-box' })

    $('.box2').text(`height:${box2.clientHeight},width:${box2.clientWidth}`)
    $('#note').text(`offset height:${box2.offsetHeight},offset width:${box2.offsetWidth}`)
  })

  for (let i = 0; i < 30; i++) {
    const div = document.createElement('div')
    div.className = 'child-div'
    div.innerHTML = `第${i}个元素</br>非常整齐`
    $('.flex').append(div)

    if (i % 2 == 0) {
      // div.style.order = i + 2
    }

  }
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 7; i++) {
      const span = document.createElement('i')
      span.className = 'sprite'
      span.style.backgroundPosition = `${-18 - i * 50}px ${-45 - j * 40}px`
      $('#spriteContainer').append(span)
    }
  }

})(window.$)