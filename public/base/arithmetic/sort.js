function randomArray(len) {
  const result = []
  for (let i = 0; i < len; i++) {
    result.push(Math.round(Math.random() * len))
  }
  return result
}

console.info('快速排序')

/**
 * 快速排序，分而治之的思想，执行效率 O(N*logN)
 * 以数组第一个元素作为参照物，定义一个指针跟随参照，几次互换后，参照左侧都是比自己小的数，而右侧都比自己大
 * 第一次从右向左寻找比参照小的。如果找到，互换位置，下一次的对比范围变成这2个位置之间；如果没有找到，左侧范围前进一个单位；
 * 每互换一次，寻找方向翻转（从左向右寻找参照大的数，或从右向左寻找小的数），找到后互换位置，缩小查找范围，直到参照找到自己的位置；
 * 参照左侧都是比自己小但无序的，右侧都是比自己大且无序的，这两个数组按之前的方式继续排序，通过递归调用实现全部排序
 * @param {*} arr 
 * @param {*} startIndex 
 * @param {*} endIndex 
 */
function fasterSort(arr, startIndex = 0, endIndex = arr.length) {
  let start = startIndex
  let end = endIndex
  let staticPointer = startIndex
  if (end > 0) {
    let fromback = true
    while (start < end) {
      if (fromback) {// 从右向左
        for (let x = end; x > start; x--) {
          if (arr[x] < arr[staticPointer]) {// 比较部分，发现了可交换的元素
            excahnge(arr, x, staticPointer)
            staticPointer = x
            fromback = false
            end = x
            break;
          }
        }
        start++
      } else {// 从左向右
        for (let x = start; x < end; x++) {
          if (arr[x] > arr[staticPointer]) {
            excahnge(arr, x, staticPointer)
            staticPointer = x
            fromback = true
            start = x
            break;
          }
        }
        end--
      }
    }
    // start === end
    if (startIndex < staticPointer - 1) {
      fasterSort(arr, startIndex, staticPointer - 1)
    }
    if (staticPointer + 1 < endIndex) {
      fasterSort(arr, staticPointer + 1, endIndex)
    }
  }
}

function excahnge(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
  // console.info('exchange array', arr)
}

for (let i = 0; i < 10; i++) {
  const fastSort = randomArray(20)
  console.info('origin array', fastSort)
  fasterSort(fastSort)
  console.info('sorted array', fastSort)
}

