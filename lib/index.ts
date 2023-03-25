let hashArr: string[];
let hashMap: any;

type HASH_VAL = {
    arr: string[],
    map: any
}

const getHashValues = (hashStr: string): HASH_VAL => {
    const tempHashArr: string[] = hashStr.split('');
    if(tempHashArr.length !== 60) {
        throw new Error('key entered should be of length 60');
    }
    let index: number = 0;
    const tempHashMap: any = {};
    tempHashArr.forEach((char) => {
        tempHashMap[char] = index++;
    });
    if(Object.keys(tempHashMap).length !== tempHashArr.length) {
        throw new Error('invalid key');
    }
    return {
        arr: tempHashArr,
        map: tempHashMap
    }
};

export const setPrivateKey = (key: string): void => {
    const hashValues: HASH_VAL = getHashValues(key);
    hashArr = hashValues.arr;
    hashMap = hashValues.map;
};
export const mask = (numToMask: number): string => {
    const numList: number[] = Array.from(String(numToMask), Number);
    const lastIndex = numList.length - 1;
    let index = 0;
    let maskedStr = '';
    let prevDigit;
    let currDigit;
    while (index <= lastIndex) {
        currDigit = numList[index];
        if (prevDigit) {
            maskedStr += hashArr[Number(`${prevDigit}${currDigit}`)];
            prevDigit = null;

        } else if (currDigit === 0 || currDigit > 5 || index === lastIndex) {
            maskedStr += hashArr[currDigit];

        } else {
            prevDigit = currDigit;
        }
        index++;
    }
    return maskedStr;
};
export const unmask = (maskedStr: string): number => {
    const maskedCharList = Array.from(maskedStr);
    let result = '';
    maskedCharList.forEach((maskedChar) => {
        result += hashMap[maskedChar];
    });
    return Number(result);
};
