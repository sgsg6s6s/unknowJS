export function randomArray (len) {
    const result = []
    for (let i = 0; i < len; i++) {
        result.push(Math.round(Math.random() * len))
    }
    return result
}

export function excahnge (arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}