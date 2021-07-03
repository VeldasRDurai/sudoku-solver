// const orgin = [
//     [1,6,4,0,0,0,0,0,2],
//     [2,0,0,4,0,3,9,1,0],
//     [0,0,5,0,8,0,4,0,7],
//     [0,9,0,0,0,6,5,0,0],
//     [5,0,0,1,0,2,0,0,8],
//     [0,0,8,9,0,0,0,3,0],
//     [8,0,9,0,4,0,2,0,0],
//     [0,7,3,5,0,9,0,0,1],
//     [4,0,0,0,0,0,6,7,9]
// ];
// var matrix = [ ...orgin ];

const orgin = [
    [0,0,9,7,5,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,5,3,8,2,0,0,0],
    [0,1,0,0,0,0,0,0,3],
    [0,0,2,0,0,0,9,0,8],
    [4,0,6,0,0,0,0,0,0],
    [9,0,0,0,4,0,1,3,0],
    [7,0,0,0,0,6,5,4,9],
    [0,0,0,2,0,0,0,0,0]
];
var matrix = [ ...orgin ];

// const orgin = [
//     [0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,3,0,8,5],
//     [0,0,1,0,2,0,0,0,0],
//     [0,0,0,5,0,7,0,0,0],
//     [0,0,4,0,0,0,1,0,0],
//     [0,9,0,0,0,0,0,0,0],
//     [5,0,0,0,0,0,0,7,3],
//     [0,0,2,0,1,0,0,0,0],
//     [0,0,0,0,4,0,0,0,9]
// ];
// var matrix = [ ...orgin ];

// const boxIndex = ( a ) => {
//     let group = [ [0,1,2],[3,4,5],[6,7,8] ] ;
//     for( let i of group){
//         for ( let j of i){
//             if ( j === a ) return i ;
//         }
//     }
// }
// const possibleValues = ( x,y ) => {
//     let [ row , col , box , values ] = [ [] , [] , [] , [] ] ;
//     for (let i=0 ; i<9 ; i++){
//         row.push(matrix[x][i]);
//         col.push(matrix[i][y]);
//     }
//     for ( let i of boxIndex(x)){
//         for ( let j of boxIndex(y)){
//             box.push(matrix[i][j]);
//         }
//     }
//     for ( let i=1; i<10 ; i++ ){
//         !(row.some( (item) =>  item === i )) && !(col.some( (item) =>  item === i )) &&  !(box.some( (item) =>  item === i )) && values.push(i);
//     }
//     return values ;
// }
// const loop = () =>{
//     let changed = false;
//     for ( let i=0 ; i<9 ; i++ ){
//         for ( let j=0 ; j<9 ; j++){
//             if ( matrix[i][j] === 0 && possibleValues(i,j).length === 1 ){
//                 // console.log( i + "" + j );
//                 console.log("changed");
//                 changed = true;
//                 matrix[i][j] = possibleValues(i,j)[0];
//             }
//         }
//     }
//     // for ( let i=0 ; i<9 ; i++ ){
//     //     console.log(" " + matrix[i]);
//     // }
//     return changed;
// }

// const ifZero = () =>{
//     for ( let i=0 ; i<9 ; i++ ){
//         for ( let j=0 ; j<9 ; j++ ){
//             if (matrix[i][j] === 0) return true;
//         }    
//     }
//     return false;
// }

// const solve = () => {
//     let count = 0;
//     while(true){
//         if (ifZero()){
//             if(!loop()) console.log("not changing");
//         } else {
//             console.log("Completed in " + count + " th loop ...!");
//             break;
//         }
//         console.log(count);
//         count = count + 1 ;
//         if(count === 10 ){
//             console.log("unsolveable");
//             break;
//         }
//     }
// }

// for ( let i=0 ; i<9 ; i++ ){
//     console.log(" " + matrix[i]);
// }
// solve()
// for ( let i=0 ; i<9 ; i++ ){
//     console.log(" " + matrix[i]);
// }


const boxIndexb = ( a ) => {
        let group = [ [0,1,2],[3,4,5],[6,7,8] ] ;
        for( let i of group){
            for ( let j of i){
                if ( j === a ) return group.indexOf(i) ;
            }
        }
    }

// for ( let i=0; i<9 ; i++){
    let w = 2;
    let [row , col] = [ [] , [] ];
    for ( let j=0 ; j<9 ; j++){
        row.push(matrix[j].some((item) => item===w )); // checking each row for i value
        let validate = false;
        for ( let k=0 ; k<9 ; k++){
            if (matrix[k][j]===w){    // checking each col for i value
                validate = true;
                break;
            }
        }
        col.push(validate);
    }

    let group = [ [0,1,2],[3,4,5],[6,7,8] ] ;
    let box =[] ;
    for ( let i of group){
        for ( let j of group){
            let validate = false;
            for ( let ii of i){
                for ( let jj of j){
                    if (matrix[ii][jj] === w){
                        validate=true;
                    }
                }
            }
            box.push(validate);        
        }
    }


    console.log( w + " \n Row : " + row + " \n Col : " + col + " \n Box : " + box ) ; 
    let arr = [
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false,false],
    ];
    for ( let i=0 ; i<9 ; i++ ){
        for ( let j=0 ; j<9 ; j++){
            if (row[i]=== true && col[j] === true ){
                if ( box[boxIndexb(i)*3+boxIndexb(j)] === true ){
                    arr[i][j] = true;
                }
            }
            //  else{
            //     arr[i][j] = false;
            // }
        }
    }
    for ( let i=0 ; i<9 ; i++ ){
        console.log(""+arr[i]);
    }
// }