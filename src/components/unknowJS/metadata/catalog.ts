// import { testData } from '@/components/unknowJS/metadata/test.js'
// console.info(testData)

export const books: Array<string> = ['上卷', '中卷', '下卷']
export const chapters: { [key: string]: { [key: string]: Array<string> } } = {
  上卷: {
    第一部分: [
      '作用域',
      '词法作用域',
      '函数作用域和块作用域',
      '提升',
      '作用域闭包'
    ],
    第二部分: [
      '关于this',
      'this全面解析',
      '对象',
      '混合对象类',
      '原型',
      '行为委托'
    ]
  },
  中卷: {
    第一部分: [
      '作用域',
      '词法作用域',
      '函数作用域和块作用域',
      '提升',
      '作用域闭包'
    ],
    第二部分: [
      '关于this',
      'this全面解析',
      '对象',
      '混合对象类',
      '原型',
      '行为委托'
    ]
  },
  下卷: {
    第一部分: [
      '作用域',
      '词法作用域',
      '函数作用域和块作用域',
      '提升',
      '作用域闭包'
    ],
    第二部分: [
      '关于this',
      'this全面解析',
      '对象',
      '混合对象类',
      '原型',
      '行为委托'
    ]
  }
}
