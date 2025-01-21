import { databank } from "./board.state";
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

export const cloneBoard=(oldboard:databank)=>{
    const peicestatus=merge({},oldboard.board)
    const newmovelist=cloneArray(oldboard.log)
    for (const [key, value] of Object.entries(oldboard.board)) {
        peicestatus[key]=merge({},value)
      }
    const newboard=merge({},oldboard)
    newboard.board=peicestatus
    newboard.log=newmovelist
    return newboard
}