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

console.log( evaluation([
    [0,0,0,0,0,0,2,0,0],
    [0,8,0,0,0,7,0,9,0],
    [6,0,2,0,0,0,0,0,0],
    [0,7,0,0,6,0,0,0,0],
    [0,0,0,9,0,1,0,0,0],
    [0,0,0,0,2,0,0,4,0],
    [0,0,5,0,0,0,6,0,3],
    [0,9,0,4,0,0,0,7,0],
    [0,0,6,0,0,0,0,0,0],
] ));