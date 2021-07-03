var fs = require('fs');

// fs.writeFile ( "sudo31.js" , "const all = [\n" , (error) => {
//     if (error){
//         console.log(error.name);
//     } else {
//         console.log("Successfull...1 :)");
//     }
// });

const create = ( j = 1 , k=[] ) => {
    if( j<9 ){
        let accumulator = [];
        for ( let i=1 ; i<10 ; i++){
            if ( k.some( (item) => item === i ) ){
                continue;
            } else {
                accumulator.push(create( j+1 , [...k , i ] ));
            }
        }
        return accumulator.toString() ;
    } else {
        let accumulator = [];
        for ( let i=1 ; i<10 ; i++){
            if ( k.some( (item) => item === i ) ){
                continue;
            } else {
                accumulator.push( "\n\'" + [...k , i ].toString().split(",").join("") + "\'");
            }
        }
        return accumulator.toString() ;
    }
}

const data1 = create();

// fs.appendFile ( "sudo31.js" , data1 , (error) => {
//     if (error){
//         console.log(error.name);
//     } else {
//         console.log("Successfull...2 :)");
//         fs.appendFile ( "sudo31.js" , "];" , (error) => {
//             if (error){
//                 console.log(error.name);
//             } else {
//                 console.log("Successfull...3 :)");
//             }
//         });
//     }
// });
