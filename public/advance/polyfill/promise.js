
const fulfilled = new Promise((resolve, reject) => {
    resolve(Promise.resolve(1))
})

const rejected = new Promise((resolve, reject) => {
    const notCatched = new Promise((resolve, reject) => {
        reject('no reason')
    })
    reject(notCatched)
})

const catched = new Promise((resolve, reject) => {
    console.info(0 / a)
})

fulfilled.then().then((value) => {
    console.info('has return onFulfilled', value)
    return value + 1000
}).then((value) => {
    console.info('last then', value)
})

fulfilled.then((value) => {
    console.info('another then', value)
})

rejected.catch().then((reason) => {
    console.info('has return onRejected', reason)
    return reason + '.not match!'
}).catch((reason) => {
    console.info('last reason', reason)
})

rejected.catch((value) => {
    console.info('another reason', value)
})

catched.catch().then((reason) => {
    console.info('has return onRejected', reason)
    return reason + '.0/0!'
}).catch((reason) => {
    console.info('last catch', reason)
})


function promiseAll(arrs) {
    const len = arrs && arrs.length
    if (len > 0) {
        let finished = 0
        const result = []
        return new Promise((resolve, reject) => {
            for (let i = 0; i < len; i++) {
                const promise = arrs[i]
                promise.then(value => {
                    result[i] = value
                    finished++
                    if (finished === len) {
                        resolve(result)
                    }
                }).catch(reason => {
                    reject(reason)
                })
            }
        })
    }
    return Promise.resolve([])
}

/**
 * 
 * @param {*} arrs promise数组
 * @returns 决议结果（按入参顺序的结果或者某个拒绝的理由），另外一个promise
 */
Promise.mimeAll = function (arrs) {
    const len = arrs && arrs.length
    if (len > 0) { // 类型检查和长度
        let finished = 0 // 理想情况下promise会分别成功，统计成功的数量
        const result = [] // 收集结果
        return new Promise((resolve, reject) => { // 返回新的promise
            for (let i = 0; i < len; i++) { // 按序遍历
                const promise = arrs[i]
                promise.then(value => {
                    result[i] = value
                    finished++
                    if (finished === len) { // 完成统计
                        resolve(result)
                    }
                }).catch(reason => { // 某个失败则全部失败
                    reject(reason)
                })
            }
        })
    }
    return Promise.resolve([])
}