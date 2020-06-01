// import { testData } from '@/components/unknowJS/metadata/test.js'
// console.info(testData)

export const books: Array<string> = ['上卷', '中卷', '下卷']
export const chapters: { [key: string]: { [key: string]: Array<string> } } = {
  上卷: {
    作用域和闭包: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
    this和对象原型: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托']
  },
  中卷: {
    类型和语法: ['类型', '值', '原生函数', '强制类型转换', '语法'],
    异步和性能: ['异步', '回调', 'Promise', '生成器', '程序性能', '性能测试和调优']
  },
  下卷: {
    第一部分: [
      // '作用域',
      // '词法作用域',
      // '函数作用域和块作用域',
      // '提升',
      // '作用域闭包'
    ],
    第二部分: [
      // '关于this',
      // 'this全面解析',
      // '对象',
      // '混合对象类',
      // '原型',
      // '行为委托'
    ]
  }
}
