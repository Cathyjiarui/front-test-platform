//判断对象是否在数组内
export const isInArray = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (value === arr[i].model) {
            return true;
        }
    }
    return false;
}
