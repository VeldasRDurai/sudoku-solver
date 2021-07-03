import React, { useRef } from "react";
import styled from "styled-components";

const Input = styled.input`
    background-color:yellow;
    border: 1px solid black;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    &:focus{
        outline: none;
    }
`;

const SmallBox = ({ setBoard, board, index }) => {
    const inputRef = useRef();
    const onChange = event =>
        (isNaN(event.target.value) || event.target.value=== ' ') ?
            (()=>event.target.value = '')() :
            setBoard([ ...board.slice(0, index),Number(inputRef.current.value),...board.slice(index+1) ]);
    return (
        <Input ref={inputRef} type='text' maxLength={1}
            onChange={ e => onChange(e) } />
    );
}

export default SmallBox;