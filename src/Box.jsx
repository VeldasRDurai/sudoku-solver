import React, { useState } from "react";
import styled from "styled-components";
import SmallBox from "./SmallBox";

const Div = styled.div`
    background-color:palegreen;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto;
    justify-content: center;
    align-items:center;
    
`;

const Box = () => {
    // A 9X9 2D array with all null values
    const [ board, setBoard ] = useState( Array(81).fill(null) );
    const [ result, setResult ] = useState([]);
    const changeToTwoD = () => {
        var twoDBoard = [];
        for(let i=0; i<81; i+=9){
            twoDBoard.push( board.slice(i,i+9) );
        }
        // console.log( solve(twoDBoard) );
        setResult( solve(twoDBoard) );
    }

    return (
        <Div>
            { board.map( (_,i) => <SmallBox key={i} index={i} board={board} setBoard={setBoard} /> ) }
            <button onClick={ changeToTwoD } >solve</button>
            <div> 
                { result }
            </div>
        </Div>
    );
}

const solve = board => 
    solved(board) ? board : 
    searchForSolution( sortValidBoard( fillfirstEmpty(board) ) );
    
const solved = board =>{
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

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

const findFirstEmptyPos = board => {
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) return { x: j, y: i };
        }
    }
}

const sortValidBoard = boards => 
    boards.filter( board => rowsGood(board) && columnsGood(board) && boxesGood(board) );

const rowsGood = board => {
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
}
const columnsGood = board => {
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
}


const boxesGood = board => {
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

const searchForSolution = boards => {
    if (boards.length < 1){
        return false
    }
    else {
        var first = boards.shift()
        const tryPath = solve(first)
        if (tryPath !== false){
            return tryPath
        }
        else{
            return searchForSolution(boards)
        }
    }
}

export default Box;