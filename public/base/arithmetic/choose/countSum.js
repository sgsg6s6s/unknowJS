/**
 * 题目：
 * 有一个数组[1,...,n]（本题为n=13），从数组选择不限数量的数字，使它们相加为sum（本题sum=14）。编写一个算法得出所有的组合。
 * 注意：每个组合内部数字不能重复，组合之间可以重复。例如：[1,13]和[1,5,8]都是正确的组合。
 */
const startMills = Date.now()
function find (arr, sum, count) {
  if (count > 1) {
    let start = 0
    let result = []
    while (start <= arr.length - count && start < sum) {
      const tmp = find(arr.slice(start + 1), sum - arr[start], count - 1)// 二维数组
      if (tmp.length > 0) {
        result = result.concat(tmp.map(e => {// 一维数组
          return [arr[start], ...e]
        }))
      }
      start++
    }
    return result
  } else {
    const result = arr.find(e => e === sum)
    return result ? [[sum]] : []
  }
}
const len = 200
const sum = 101
const arr = []
let i = 0
// 排序
while (i < len) {
  arr.push(++i)
}
console.info(arr)
const MIN_TIMES = 2
let lastSum = 0
let maxTimes = 0
while (maxTimes < len) {
  lastSum += arr[maxTimes]
  if (lastSum > sum) {
    break;
  } {
    maxTimes++
  }
}
console.info(maxTimes)
let result = []
for (let i = MIN_TIMES; i <= maxTimes; i++) {
  result = result.concat(find(arr, sum, i))
}
console.info(result, (Date.now() - startMills) / 1000 + '秒')