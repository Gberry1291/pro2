export const merge = (orig: any, props: any) => {
    return Object.assign({}, orig, props);
};

export const cloneArray = (origArray: any[]) => {
    const newArray = [];
    for (const element of origArray) {
        if (element) {
            newArray.push(merge({}, element));
        }
    }

    return newArray;
};