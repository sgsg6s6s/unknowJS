console.info('异步的现在和将来')

// 使浏览器假死一段时间
function jsDone(mills) {
  const now = Date.now()
  console.info('before done')
  let i = 0
  while (Date.now() - now < mills) {
    i++
  }
  console.info('after done', (Date.now() - now) / 1000)
}

// 模拟ajax请求
function get(input, mills = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.info('resolve time', Date.now(), input)
      resolve(input)
    }, mills)
  })
}

let result = []

// 异步回调
function response(data) {
  jsDone(2000)
  result = result.concat(data)
  console.info('async see', result)
}

// 异步回调
function responseBetter(data) {
  const bufferLen = 2
  const time = 2000 / Math.ceil(data.length / bufferLen) // 处理时间按比例拆
  for (let i = 0; i < data.length; i += bufferLen) {
    setTimeout(() => {
      jsDone(time)
      result.push(...data.slice(i, i + bufferLen))
      console.info('async see', result)
    }, 0)
  }
}

// 异步回调
function deliverResponse(data) {
  const bufferLen = 2
  const time = 2000 / Math.ceil(data.length / bufferLen) // 处理时间按比例拆
  const chunk = data.splice(0, bufferLen)
  jsDone(time)
  result = result.concat(chunk)
  console.info('async see', result)

  if (data.length > 0) {
    setTimeout(() => {
      deliverResponse(data)
    }, 0)
  }
}

get([1, 3, 5, 7, 9], 2000).then(deliverResponse)
get([2, 4, 6, 8, 10], 2000).then(deliverResponse)

console.info('sync see', result)
