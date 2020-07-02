const p1 = new Promise((resolve, reject) => {
  foo.bar()
  resolve(2)
})

const p2 = new Promise((resolve, reject) => {
  resolve(1)
})

const p10 = new Promise((resolve, reject) => {
  reject('p10 reject')
})

const w1 = async () => {
  console.info('1. 吞掉异常错误')

  await p1.then(() => {
    console.info('p1 then fulfilled')
  }, (r) => {
    console.info('p1 then rejected', r)
  }).catch(r => {
    console.info('p1 catch', r)
  })

  await p2.then(() => {
    console.info('p2 then fulfilled')
    foo.bar()
    console.info('p2 then fulfilled over')
  }, (r) => {
    console.info('p2 then rejected', r)
  }).catch(r => {
    console.info('p2 catch到差点被吞掉异常，这个异常的产生来自fulfilled回调内部，而不是决议函数', r)
  })
}

const w2 = async () => {
  console.info('2. promise信任问题')
  console.info('Promise.resolve(p2) === p2', Promise.resolve(p2) === p2)

  const fakePromise = {
    then(resolve, reject) {
      resolve('fulfilled')
      reject('whatever')
    }
  }

  await fakePromise.then((result) => {
    console.info('fake onFulfiled', result)
  }, (reason) => {
    console.info('fake onRejected', reason)
  })

  await Promise.resolve(fakePromise).then(function onFulfiled(result) {
    console.info('wrapped promise resolve, onFulfiled', result)
  }, function onRejected(reason) {
    console.info('wrapped promise resolve, onRejected', reason)
  })

  await Promise.reject(fakePromise).then((result) => {
    console.info('wrapped promise reject, resolve', result)
  }, (reason) => {
    console.info('wrapped promise reject, reject', reason)
  })
}

const w3 = async () => {
  console.info('3. resolve方法的细节')

  await p2.then(function onFulfiled(result) {
    console.info('p2 resolve number', result)
  })

  const p3 = new Promise((resolve, reject) => {
    console.info('p3 resolve a rejected promise')
    resolve(Promise.reject('too young!'))
  })
  await p3.then(function onFulfiled(result) {
    console.info('p3 onFulfiled', result)
  }, function onRejected(reason) {
    console.info('p3 onRejected', reason)
  })
}

const w4 = async () => {
  console.info('4. race and delay')
  function foo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('foo done!')
      }, 200)
    })
  }

  function timeout(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(delay + 'ms passed,timeout!')
      }, delay)
    })
  }

  await Promise.race([foo(), timeout(300)]).then((result) => {
    console.info('race1 onFulfilled,timeout 300 :', result)
  }, (reason) => {
    console.info('race1 onRejected,timeout 300 :', reason)
  })
  await Promise.race([foo(), timeout(100)]).then((result) => {
    console.info('race2 onFulfilled,timeout 100 :', result)
  }, (reason) => {
    console.info('race2 onRejected,timeout 100 :', reason)
  })


  if (!Promise.observe) {
    Promise.observe = function (pr, cb) {
      pr.then(
        (result) => {
          console.info('pr then onFulfilled', result)
          Promise.resolve(result).then(cb)
        }, (reason) => {
          console.info('pr then onRejected', reason)
          Promise.reject(reason).then(cb)
        }
      )
      return pr
    }
  }

  await Promise.race([Promise.observe(foo(), function cleanup(msg) {
    console.info('cleanup', msg)
  }), timeout(100)]).then((result) => {
    console.info('race3 onFulfilled,timeout 300 :', result)
  }, (reason) => {
    console.info('race3 onRejected,timeout 300 :', reason)
  })


}

const w5 = async () => {
  if (!Promise.first) {
    Promise.first = function (prs) {
      return new Promise((resolve, reject) => {
        const len = prs && prs.length
        let countRejected = 0
        if (len && len > 0) {
          prs.forEach(pr => {
            pr.then((result) => {
              console.info('pr then onFulfilled', result)
              resolve(result)
            }, () => {
              countRejected++
              if (countRejected == len) {
                reject('reject all promise')
              }
            })
          })

        } else {
          reject('empty promise list')
        }
      })
    }
  }


  await Promise.first().catch((msg) => { console.info(msg) })
  await Promise.first([]).catch((msg) => { console.info(msg) })
  await Promise.first([p10, p1]).catch((msg) => { console.info(msg) })
  await Promise.first([p1, p2, p10]).then((msg) => { console.info('first is :', msg) })
}

if (!Promise.wrap) {
  /**
   * fn is single param , fn like fn(a,b,cb) ,cb is error-first style
   */
  Promise.wrap = function wrap(fn) {

    // Promise.wrap(ajax)(a,b)
    return function () {
      // eslint-disable-next-line prefer-rest-params
      const args = [].slice.call(null, arguments)
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line prefer-spread
        fn.apply(null, args.concat(function (err, v) {
          if (err) {
            reject(err)
          } else {
            resolve(v)
          }
        }))
      })
    }
  }
}


(async () => {
  await w1()
  await w2()
  await w3()
  await w4()
  await w5()
})()






