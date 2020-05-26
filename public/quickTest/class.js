;(function() {
  class Widget {
    static count = 1
    constructor(width = 50, height = 50) {
      this.width = width
      this.height = height
      this.$el = null
    }
    render($target) {
      if (this.$el) {
        this.$el.style.width = this.width + 'px'
        this.$el.style.height = this.height + 'px'
        $target.append(this.$el)
      }
    }
    add() {
      Widget.count++
    }
    getCount() {
      return Widget.count
    }
  }

  class Button extends Widget {
    constructor(width = 50, height = 50, label = 'Default') {
      super(width, height)
      this.label = label
      this.$el = document.createElement('button')
      this.$el.innerText = label
    }
    render($target) {
      super.render($target)
      this.$el.addEventListener('click', this.onClick)
    }

    onClick(event) {
      console.info('Button ' + this.label + ' has been clicked.', event)
    }
  }

  const b1 = new Button(200, 30, 'button3')
  b1.render(document.body)
  const b2 = new Button(200, 30, 'button4')
  b2.render(document.body)
  b1.onClick()
  b1.add()
  console.info(Widget.count)
  b2.add()
  console.info(Widget.count)
})()
