function Widget(width = 50, height = 50) {
  this.width = width
  this.height = height
  this.$el = null
}
Widget.prototype.render = function($target) {
  if (this.$el) {
    this.$el.style.width = this.width + 'px'
    this.$el.style.height = this.height + 'px'
    $target.append(this.$el)
  }
}

function Button(width, height, label = 'Default') {
  Widget.call(this, width, height)
  this.label = label
  this.$el = document.createElement('button')
  this.$el.innerText = label
}

Button.prototype = Object.create(Widget.prototype)
Button.prototype.render = function($target) {
  Widget.prototype.render.call(this, $target)
  this.$el.addEventListener('click', this.onClick)
}

Button.prototype.onClick = function(event) {
  console.info('Button ' + this.label + ' has been clicked.', event)
}

window.onload = function() {
  const b1 = new Button(200, 30, 'button1')
  b1.render(document.body)
  const b2 = new Button(200, 30, 'button1')
  b2.render(document.body)
  b1.onClick()
}
