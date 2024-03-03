function getAllLocalStorage() {
    const items = { ...localStorage }
    return items
}

function setLocalStorage(data: []) {
    data.forEach((item: object) => {
        if (localStorage.length === 0) {
            localStorage.setItem('0', JSON.stringify(item))
        } else {
            const localStorageKeys = Object.keys(getAllLocalStorage())
            const KeyIDToNum = localStorageKeys.map((key) => {
                return parseInt(key)
            })
            const nextKeyID = Math.max.apply(Math, KeyIDToNum) + 1

            localStorage.setItem(`${nextKeyID}`, JSON.stringify(item))
        }
    })
}

function clearLocalStorage() {
    localStorage.clear()
}

export { getAllLocalStorage, setLocalStorage, clearLocalStorage }
