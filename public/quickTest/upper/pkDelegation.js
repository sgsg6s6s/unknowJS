const Controller = {
  errors: [],
  showDialog(title, msg) {
    alert(title)
    const span = document.createElement('span')
    span.innerHTML = msg
    document.body.append(span)
  },
  success(msg) {
    this.showDialog('Success', msg)
  },
  failure(msg) {
    this.errors.push(msg)
    this.showDialog('Error', msg)
  }
}
const LoginController = Object.assign(Object.create(Controller), {
  getUserName() {
    return document.querySelector('#userName').value
  },
  getPassword() {
    return document.querySelector('#password').value
  },
  validateEntry(user, pw) {
    user = user || this.getUserName()
    pw = pw || this.getPassword()
    if (!(user && pw)) {
      return this.loginFailure('please enter username and password!')
    } else if (pw.length < 5) {
      return this.loginFailure('Password must be 5+ characters!')
    }

    return true
  },
  loginFailure(msg) {
    this.failure('Login invalid:' + msg)
  }
})

const AuthController = {
  errors: [],
  server(url, data) {
    console.info({ url, data })
    return true
  },

  checkAuth() {
    const userName = this.getUserName()
    const pwd = this.getPassword()
    if (this.validateEntry(userName, pwd)) {
      const result = this.server('/login', { login: userName, password: pwd })
      if (result) {
        this.successAuth.bind(this)()
      } else {
        this.failureAuth.bind(this)()
      }
    }
  },

  successAuth() {
    this.success('Authenticated')
  },

  failureAuth(msg) {
    this.failure('Auth invalid:' + msg)
  }
}
Object.setPrototypeOf(AuthController, LoginController)
;(function() {
  document.querySelector('#login').addEventListener('click', () => {
    AuthController.checkAuth()
  })
})()
