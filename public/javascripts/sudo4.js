const fs = require("fs");

const boxCreator = ( row ) => {
    let col = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ] ;
    let box = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ];
    for( let i=0 ; i<9 ; i++){
        for( let j=0 ; j<9 ; j++){
            box[ (Math.floor(i/3) * 3) + (Math.floor(j/3)) ].push(row[i][j]);
            col[i].push(row[j][i]);    
        }   
    }
    return [ col , box ] ;
}

const evaluation = ( row ) => {
    [ col , box ] = boxCreator( row );
    return row.map( (item1,i) => {
        return item1.map( (item2,j) => {
            if ( item2 !== 0){
                return [] ;
            } else {
                let contain = new Set([ ...row[i] , ...col[j] , ...box[(Math.floor(i/3) * 3) + (Math.floor(j/3))] ]) ;
                let full = new Set([1,2,3,4,5,6,7,8,9]);
                let notContain = new Set();

                full.forEach( elem => notContain.add(elem) );
                contain.forEach( elem => notContain.delete(elem) ); // notContain = full - contain
                return [...notContain];
            }
        });
    });
}

const fillThePossible = ( sudo ) => {
    let w = 0;
    while(true){
        w= w+1;
        let notContainer = evaluation(sudo);

        if( !notContainer.some( item1 => item1.some( item2 => item2.length === 1))){
            console.log("it's enough...mwone....");
            return [ [...sudo] , [...notContainer] ];
        }

        for( let i=0 ; i<9 ; i++){
            for( let j=0 ; j<9 ; j++){
                if ( notContainer[i][j].length === 1 ){
                    sudo[i][j] = notContainer[i][j][0]; 
                }       
            }
        }
        if( w===100){
            console.log("INFINITE LOOP ilekk....adichu poyi enta balyam...");
            break;
        }
    }
}

const validOrNot = ( row ) => {
    [ col , box ] = boxCreator( row );
    for( let i=0 ; i<9 ; i++){
        for( let j=0 ; j<9 ; j++){
            if( row[i][j] !== 0 ){
                if ( col[j].filter( item => item===row[i][j] ).length > 1 ){
                    // console.log("Found column error at " + i + " : " + j);
                    return false ;
                }
                if ( row[i].filter( item => item===row[i][j] ).length > 1 ){
                    // console.log("Found row error at " + i + " : " + j);
                    return false ;
                }
                if ( box[(Math.floor(i/3) * 3) + (Math.floor(j/3))].filter( item => item===row[i][j] ).length > 1 ){
                    // console.log("Found box error at " + i + " : " + j);
                    return false ;
                }
            }     
        }
    }
    return true;    
}

const someForThreeD = ( notContainer) => {
    for( let i=0 ; i<9 ; i++){
        for( let j=0 ; j<9 ; j++){
            if( notContainer[i][j].length > 1 ){
                console.log( "Inside " + i + " : " + j);
                return [ i , j ];
            }     
        }
    }
    // console.log("bottom");
    return [ false , false ];
}

let sudo = [
    [0,0,0,0,0,0,2,0,0],
    [0,8,0,0,0,7,0,9,0],
    [6,0,2,0,0,0,0,0,0],
    [0,7,0,0,6,0,0,0,0],
    [0,0,0,9,0,1,0,0,0],
    [0,0,0,0,2,0,0,4,0],
    [0,0,5,0,0,0,6,0,3],
    [0,9,0,4,0,0,0,7,0],
    [0,0,6,0,0,0,0,0,0],
];

const solve = ( sudo ) => {
    // if( validOrNot(sudo) ){
        let [ newSudo , notContainer ] = fillThePossible( [...sudo] );
        let [ i , j ] = someForThreeD(notContainer);
        if(i===false || j===false ){ 
            console.log("SUCCESS...");
            fs.appendFile ( "sudo41.txt" , "\n==> " + newSudo.toString() , (error) => {
                if (error){
                    console.log(error.name);
                } else {
                    console.log("Successfull...1 :)");
                }
            });
            return 0 ; 
        } else {
            console.log( notContainer[i][j] );
            notContainer[i][j].forEach( (item) => {
                console.log(item);
                // console.log(newSudo+"");
                let nextSudo = [...newSudo];
                nextSudo[i][j] = item ;
                solve(nextSudo);
            });
            return 0;
        }
    // } else {
    //     console.log("FAILD...."); 
    //     return [] ;
    // }
}

solve( [...sudo] );

// const result = solve( [...sudo] ) ;
// console.log( result );

// const fs = require("fs");
// fs.writeFile ( "sudo41.txt" , result.toString() , (error) => {
//     if (error){
//         console.log(error.name);
//     } else {
//         console.log("Successfull...1 :)");
//     }
// });

// if( validOrNot(sudo) ){
//     // let loopController = 0;
//     // while(true){
//         // loopController = loopController + 1;
//         console.log("___________________LOOP STARTS");
//         let notContainer = fillThePossible(sudo) ;
//         console.log( notContainer );
//         console.log(sudo);
//         // [ i , j ] = someForThreeD(notContainer);
//         // if(i===false || j===false ){ console.log("SUCCESS..."); break; }
//         // sudo[i][j] = notContainer[i][j][0];
//         console.log("LOOP ENDS____________________");
//         // if(loopController > 100){ console.log("INFINITE LOOP..."); break;}
//     // }
// } else {
//     console.log("It is not valid");
// }
