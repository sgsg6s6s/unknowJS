console.info('[macroTask0] [root > console] start')
var a = {}
console.log(a.pet.name)
// const person = {
//   firstName: 'Lydia',
//   lastname: 'Hallie',
//   pet: {
//     name: 'Mara',
//     breed: 'Dutch Tulip Hound'
//   },
//   getFullName: function () {
//     return `${this.firstName}/${this.lastName}`
//   }
// }

// console.log(person.pet?.name)
// console.log(person.pet?.family?.name)
// console.log(person.getFullName?.())
// console.log(person.getLastName?.())


setTimeout(() => {
  console.info('[macroTask1] [root > setTimeout] after 0')
  setTimeout(() => {
    console.info('[macroTask2] [root > setTimeout > setTimeout] after 0')
    setTimeout(() => {
      console.info('[macroTask3] [root > setTimeout > setTimeout > setTimeout] after 0')
    })
  })

  new Promise((resolve) => {
    console.info('[macroTask1] [root > setTimeout > new Promise(resolve)]')
    resolve(2)
  }).then((value) => {
    console.info('[microTask2] [root > setTimeout > new Promise(resolve).then]', value)
    setTimeout(() => {
      console.info('[macroTask3] [root > setTimeout > new Promise(resolve).then > setTimeout] after 0')
    })
    setTimeout(() => {
      console.info('[macroTask3] [root > setTimeout > new Promise(resolve).then > setTimeout] after 1')
    }, 1)
    console.info('[microTask2] [root > setTimeout > new Promise(resolve).then] 111')
    new Promise((resolve) => {
      console.info('[macroTask2] [root > setTimeout > new Promise(resolve).then > new Promise(resolve)]')
      console.info('[microTask2] [root > setTimeout > new Promise(resolve).then] 112')
      resolve(2)
    }).then((value) => {
      console.info('[microTask2] [root > setTimeout > new Promise(resolve).then] 113')
      console.info('[macroTask2] [root > setTimeout > new Promise(resolve).then > new Promise(resolve).then', value)
      setTimeout(() => {
        console.info('[macroTask3] [root > setTimeout > new Promise(resolve).then > new Promise(resolve).then > setTimeout] after 1')
      }, 1)
    })
    console.info('[microTask2] [root > setTimeout > new Promise(resolve).then] 222')
    Promise.resolve(2).then((value) => {
      let result = 0
      for (let i = 0; i < 1000000; i++) {
        result += i
      }
      console.info('[microTask2] result', result)
      console.info('[microTask2] [root > setTimeout > new Promise(resolve).then > Promise.resolve().then]', value)
      Promise.resolve(2).then((value) => {
        console.info('[microTask2] [root > setTimeout > new Promise(resolve).then > Promise.resolve().then> Promise.resolve().then]', value)
      })
    })
    console.info('[microTask2] [root > setTimeout > new Promise(resolve).then] 333')
  })
}, 0)

setTimeout(() => {
  console.info('[macroTask1] [root > setTimeout] after 3ms')
}, 3)


let result = 0
for (let i = 0; i < 10000000; i++) {
  result += i
}
console.info('[microTask0] result', result)

new Promise((resolve) => {
  console.info('[macroTask0] [root > new Promise(resolve)]')
  resolve(1)
  setTimeout(() => {
    console.info('[macroTask2] [root > new Promise(resolve) > setTimeout] after 100')
    new Promise((resolve) => {
      console.info('[macroTask2] [root > new Promise(resolve) > setTimeout > new Promise(resolve)]')
      resolve(2)
    }).then((value) => {
      console.info('[microTask2] [root > new Promise(resolve) > setTimeout > new Promise(resolve).then]', value)
    })
  }, 100)
}).then((value) => {
  console.info('[microTask1] [root > new Promise(resolve).then]', value)
})

console.info('[macroTask0] [root > console] end')