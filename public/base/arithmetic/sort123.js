/*
  区间1     区间二     区间三       区间四
[0:left] [left:cur] [cur:right] [right:length-1]
11111111  22222222  未处理的123  33333333333333         
从大到小排序
三个指针：left、cur、right
left左侧是最小值，right右侧是最大值
cur指针从左到右递增，外层循环直到cur>right
cur遇到1时：先确定区间一；再如果cur不在区间一，cur和left进行交换；再cur++
cur遇到3时：先cur和right进行交换；再确定区间四的范围
*/

const x = [3, 1, 2, 3, 2, 1, 2, 1, 2, 1, 3, 2, 1, 3, 1, 2, 2, 2, 1, 1, 3, 3, 3, 2, 2, 1, 1]

// const x = [1, 1, 2, 3, 3, 3, 1, 2, 1, 2, 1]
let left = 0, cur = 0, right = x.length - 1
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

while (cur <= right) {
  if (x[cur] === 1) {
    
    while (x[left] == 1) {
      
      left++
    }
    
    if (cur > left) {
      
      swap(x, cur, left)
      
    }
    cur++
  } else if (x[cur] === 3) {
    
    swap(x, cur, right)
    
    while (x[right] == 3) {
      right--
      
    }
    
  } else {
    
    cur++
  }
}
console.info(x)