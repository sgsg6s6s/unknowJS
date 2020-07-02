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