(function () {

  function reactiveCallback(form) {
    form.innerText = JSON.stringify(data)
  }

  const data = {
    nickname: 'piano',
    age: 0,
    isManager: false,
    pet: 2
  }

  const applyForm = document.querySelector('#applyForm')
  const commitBtn = document.querySelector('.commit-btn')
  const reactiveMsg = document.querySelector('.reactive-msg')
  const commitMsg = document.querySelector('.commit-msg')

  // 与框架无关
  commitBtn.addEventListener('click', () => { reactiveCallback(commitMsg) })

  const serviceMethods = {
    // 数据变化执行
    dataChangedCallback() {
      reactiveCallback(reactiveMsg)
    },
    abc: 123
  }

  dataBindNotify(applyForm, data, serviceMethods)
  domEventNotify(applyForm, data)

  // init
  updateForm(applyForm, data)
  invokeMethods(serviceMethods)
})()

function dataBindNotify(form, data, serviceMethods) {
  const proto = Object.create(data.__proto__);
  data.__proto__ = proto
  for (const key in data) {
    const innerKey = '_' + key
    proto[innerKey] = data[key] // 定义描述符set会将value改为undefined，这里提前赋值给下划线开头的内部变量
    Object.defineProperty(data, key, {
      set(value) {
        proto[innerKey] = value
        updateElement(form, key, value)
        invokeMethods(serviceMethods)
      },
      get() {
        return proto[innerKey]
      }
    })
  }
  console.info('data', data)
}

function invokeMethods(serviceMethods) {
  for (const key in serviceMethods) {
    if (typeof serviceMethods[key] === 'function') {
      serviceMethods[key]()
    }
  }
}

function domEventNotify(form, data) {
  for (const name in data) {
    const doms = form.querySelectorAll(`[name=${name}]`)
    if (doms) {
      for (const dom of doms) {
        dom.addEventListener('change', function (event) {
          console.info(event, this, this.value)
          data[name] = event.target.value // 单向数据流
        })
      }
    }
  }
}

/**
 * 更新整个form
 * @param {*} form 
 * @param {*} data 
 */
function updateForm(form, data = {}) {
  for (const name in data) {
    updateElement(form, name, data[name])
  }
}

/**
 * 更新form的某个元素
 * @param {*} form 
 * @param {*} data 
 */
function updateElement(form, name, newValue) {
  const doms = form.querySelectorAll(`[name=${name}]`)
  for (const dom of doms) {
    const { type } = dom
    switch (type) {
      case 'radio': {
        if (String(dom.value) == String(newValue)) {
          dom.checked = true
        } else {
          dom.checked = false
        }
        break;
      }
      default: {
        dom.value = newValue
      }
    }
  }
}
