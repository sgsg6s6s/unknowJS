/**
 * 查找出有出度和没有出度的矩阵点
 * 通过没有出度的矩阵点反向寻找周边点，每次将周边点的深度降低，每次一定产生没有出度的新节点，继续。
 * 累计次数到全部是没有出度的节点，次数记录就是最长路径
 * 
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = function (matrix) {
  if (matrix == null || matrix.length == 0) {
    return 0;
  }

  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]] // 上下左右几个方向
  const outputDegrees = [] // 二位数组记录出度
  const leafLocations = [] // 记录叶子节点的坐标
  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {// rowIdx in [0,matrix.length]
    const columns = matrix[rowIdx]
    for (let columnIdx = 0; columnIdx < columns.length; columnIdx++) {
      if (!outputDegrees[rowIdx]) {
        outputDegrees[rowIdx] = Array.from({ length: columns.length }).fill(0)
      }

      for (const direction of directions) {
        if (matrix[rowIdx + direction[0]] && matrix[rowIdx][columnIdx] < matrix[rowIdx + direction[0]][columnIdx + direction[1]]) {// 上
          outputDegrees[rowIdx][columnIdx]++
        }
      }
      if (outputDegrees[rowIdx][columnIdx] === 0) {
        leafLocations.push([rowIdx, columnIdx])
      }
    }
  }

  let level = 0
  while (leafLocations.length > 0) {
    level++ // 倒序查找的次数
    const len = leafLocations.length // 缓存一个批次的节点
    for (let i = 0; i < len; i++) {
      const leafLocation = leafLocations.shift()// 从头拿，不能按索引拿
      const rowIdx = leafLocation[0]
      const columnIdx = leafLocation[1]
      for (const direction of directions) {
        const newRowInx = rowIdx + direction[0]
        const newColumnInx = columnIdx + direction[1]
        if (matrix[newRowInx] && matrix[rowIdx][columnIdx] > matrix[newRowInx][newColumnInx]) {// 比对周边节点，并修改周边节点
          outputDegrees[newRowInx][newColumnInx]--
          if (outputDegrees[newRowInx][newColumnInx] === 0) { // 周边节点成为叶子结点
            leafLocations.push([newRowInx, newColumnInx])
          }
        }
      }
    }
  }
  return level
};

var nums =
  // [
  //   [9, 9, 4],
  //   [6, 6, 8],
  //   [2, 1, 1]
  // ]
  [[3, 4, 5], [3, 2, 6], [2, 2, 1]]
// [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [19, 18, 17, 16, 15, 14, 13, 12, 11, 10], [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [39, 38, 37, 36, 35, 34, 33, 32, 31, 30], [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], [59, 58, 57, 56, 55, 54, 53, 52, 51, 50], [60, 61, 62, 63, 64, 65, 66, 67, 68, 69], [79, 78, 77, 76, 75, 74, 73, 72, 71, 70], [80, 81, 82, 83, 84, 85, 86, 87, 88, 89], [99, 98, 97, 96, 95, 94, 93, 92, 91, 90], [100, 101, 102, 103, 104, 105, 106, 107, 108, 109], [119, 118, 117, 116, 115, 114, 113, 112, 111, 110], [120, 121, 122, 123, 124, 125, 126, 127, 128, 129], [139, 138, 137, 136, 135, 134, 133, 132, 131, 130], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


console.info(longestIncreasingPath(nums))
const graph = {
  "a": ["b", "d"],
  "b": ["c"],
  "d": ["e", "c"],
  "e": ["c"],
  "c": ["a"],
}

function topoSort(graph) {
  const countParent = {}
  // 统计点有多少指向自己的边
  for (const key in graph) {
    if (countParent[key] === void 0) {
      countParent[key] = 0
    }
    const children = graph[key]
    for (const child of children) {
      if (countParent[child]) {
        countParent[child]++
      } else {
        countParent[child] = 1
      }
    }
  }

  const queue = []

  // 指向自己的边如果为0（入度为0）则入栈
  for (const key in countParent) {
    if (!countParent[key]) {
      queue.push(key)
    }
  }

  const result = []

  while (queue.length > 0) {// 没有环形
    const key = queue.pop()
    result.push(key)
    for (const child of graph[key]) {
      countParent[child]--

      if (countParent[child] === 0) {
        queue.push(child)
      }
    }
  }
  return result
}

console.info(topoSort(graph))