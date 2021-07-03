let array = [];
let x = [1,2,3,4,5,6,7,8,9];
let start = [];

const arrayCreator = (index,start) => {
    console.log("start : " + start);   
    console.log("\n\nindex : " + index + "\n");    
    let newArr = [] ;
    for ( let i of x ){
        let k = 0;
        for ( let j of start ){
            if ( i === j ){
                k=i;
                break;
            } 
        }
        if ( k === 0){
            newArr.push(i);
        }
    }
    console.log("New array " + newArr);

    for ( let i of newArr){
        array[index] = i;
        if (index<8){
            start.push(i);
            // start2 = Object.assign(start);
            arrayCreator(index+1,start);
        } else {
            console.log("Big array "+array);
        }
    }
    if (start.length ===2 ){
        return 1;
    }
};
arrayCreator(0,start);

// let start = [] ;
// let newArr = [] ;
// for ( let i of x ){
//     let k = 0;
//     for ( let j of start ){
//         if ( i === j ){
//             k=i;
//             break;
//         } 
//     }
//     if ( k === 0){
//         newArr.push(i);
//     }
// }
// console.log(newArr);