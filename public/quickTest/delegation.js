;(function() {
  const Widget = {
    constructor(width = 50, height = 50) {
      this.width = width
      this.height = height
      this.$el = null
    },
    render($target) {
      if (this.$el) {
        this.$el.style.width = this.width + 'px'
        this.$el.style.height = this.height + 'px'
        $target.append(this.$el)
      }
    }
  }

  const Button = Object.create(Widget)

  Button.onClick = function(event) {
    console.info('Button ' + this.label + ' has been clicked.', event)
  }

  Button.setup = function(width = 50, height = 50, label = 'Default') {
    this.constructor(width, height)
    this.label = label
    this.$el = document.createElement('button')
    this.$el.innerText = label
  }
  Button.renderButton = function($target) {
    this.render($target)
    this.$el.addEventListener('click', this.onClick)
  }

  const b1 = Object.create(Button)
  b1.setup(200, 30, 'button5')
  b1.renderButton(document.body)
  const b2 = Object.create(Button)
  b2.setup(200, 30, 'button6')
  b2.renderButton(document.body)
  b1.onClick()
})()
