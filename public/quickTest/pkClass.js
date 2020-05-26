function Controller() {
  this.errors = []
}
Controller.prototype.showDialog = function(title, msg) {
  alert(title)
  const span = document.createElement('span')
  span.innerHTML = msg
  document.body.append(span)
}
Controller.prototype.success = function(msg) {
  this.showDialog('Success', msg)
}
Controller.prototype.failure = function(msg) {
  this.errors.push(msg)
  this.showDialog('Error', msg)
}

function LoginController() {
  Controller.call(this)
}
LoginController.prototype = Object.create(Controller.prototype)

LoginController.prototype.getUserName = function() {
  return document.querySelector('#userName').value
}

LoginController.prototype.getPassword = function() {
  return document.querySelector('#password').value
}

LoginController.prototype.validateEntry = function(user, pw) {
  user = user || this.getUserName()
  pw = pw || this.getPassword()
  if (!(user && pw)) {
    return this.failure('please enter username and password!')
  } else if (pw.length < 5) {
    return this.failure('Password must be 5+ characters!')
  }

  return true
}

LoginController.prototype.failure = function(msg) {
  Controller.prototype.failure.call(this, 'Login invalid:' + msg)
}

function AuthController(login) {
  Controller.call(this)
  this.login = login
}
AuthController.prototype = Object.create(Controller.prototype)

AuthController.prototype.server = function(url, data) {
  console.info({ url, data })
  return true
}

AuthController.prototype.checkAuth = function() {
  const userName = this.login.getUserName()
  const pwd = this.login.getPassword()
  if (this.login.validateEntry(userName, pwd)) {
    const result = this.server('/login', { login: userName, password: window.btoa(pwd) })
    if (result) {
      this.success.bind(this)()
    } else {
      this.failure.bind(this)()
    }
  }
}

AuthController.prototype.success = function() {
  Controller.prototype.success.call(this, 'Authenticated')
}

AuthController.prototype.failure = function(msg) {
  Controller.prototype.failure.call(this, 'Auth invalid:' + msg)
}
;(function() {
  const auth = new AuthController(new LoginController())
  document.querySelector('#login').addEventListener('click', () => {
    auth.checkAuth()
  })
})()
