const b = null;
var bd3 = [ 
    [b, b, b, b, b, 8, 9, 1, b],
    [b, b, 1, b, b, b, b, b, 3],
    [9, b, b, b, 2, 7, b, b, 5],
    [3, b, 2, 5, 6, b, b, b, b],
    [5, b, b, b, b, b, b, b, 8],
    [b, b, b, b, 8, 3, 5, b, 4],
    [8, b, b, 7, 4, b, b, b, 2],
    [6, b, b, b, b, b, 1, b, b],
    [b, 5, 7, 3, b, b, b, b, b]
];

var bd5 = [
    [ b, b, b, b, b, b, b, b, b],
    [ b, b, b, b, b, 3, b, 8, 5],
    [ b, b, 1, b, 2, b, b, b, b],
    [ b, b, b, 5, b, 7, b, b, b],
    [ b, b, 4, b, b, b, 1, b, b],
    [ b, 9, b, b, b, b, b, b, b],
    [ 5, b, b, b, b, b, b, 7, 3],
    [ b, b, 2, b, 1, b, b, b, b],
    [ b, b, b, b, 4, b, b, b, 9]
];

// const range = (start, end) => 
//     Array(Math.abs(start-end)+1).fill(start).
//         map( (v,i) => v+i*(start>end?-1:1) );

const solve = ( board ) => 
    solved(board) ? board : 
    searchForSolution( sortValidBoard( fillfirstEmpty(board) ) );
    
const solved = board => !board.some( item => item.some( item2 => item2 === null ));

const fillfirstEmpty = (board) => { 
    var res = []
    const firstEmptyPos = findFirstEmptyPos(board);
    if (firstEmptyPos !== undefined){
        for(var i = 1; i <= 9; i++){
            var newBoard = [...board];
            var row = [...newBoard[firstEmptyPos.y]];
            row[firstEmptyPos.x] = i;
            newBoard[firstEmptyPos.y] = row;
            res.push(newBoard)
        }
    }
    return res;
}

const findFirstEmptyPos = (board) => {
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) return { x: j, y: i };
        }
    }
}

const sortValidBoard = (boards) => 
    boards.filter( board => rowsGood(board) && columnsGood(board) && boxesGood(board) );

function rowsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true;
    // board.some( item =>  
    //     item.some( (item2, index2) => 
    //         item2 !== null && item.indexOf(item2) !== index2 ));
}
function columnsGood(board){
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true;
    // range(0,8).map( i => board.map(d => d[i]) )
    //     .some( item =>  item.some( (item2, index2) => 
    //         item2 !== null && item.indexOf(item2) !== index2 ));
}


function boxesGood(board){
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];
    for (var y = 0; y < 9; y += 3){
        for (var x = 0; x < 9; x += 3){
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

function searchForSolution(boards){
    if (boards.length < 1){
        return false
    }
    else {
        var first = boards.shift()
        const tryPath = solve(first)
        if (tryPath != false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}


console.log( solve(bd5) );