import { useState } from "react";

/* function Square() {
    const [value, setValue] = useState(null);

    function handleClick(){
        if (value == null) {
            setValue('X');
        }
        else {
            setValue(null);
        }
    }

    return (
        <button 
            className="square"
            onClick={handleClick}
        >
            {value}
        </button>
    );
} */

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>
        {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
    let rows = 3;
    let cols = 3;
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next player: " + (xIsNext ? "X" : "O"); // inline if-else statement
    }
    
    function handleClick(i) {
        if (squares[i] || winner) {
            return;
        }
        
        const nextSquares = squares.slice();
        if (xIsNext){
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }
        
        onPlay(nextSquares);
    }

    function renderSquares(squares, status) {
        let boardDescription = [<div className="status">{status}</div>];
    
        for (let i = 0; i < rows; i++){
            let rowChildren = [];
            for (let j = 0; j < cols; j++){
                let currSquare = (3 * i) + j;
                rowChildren = [...rowChildren, <Square value={squares[currSquare]} onSquareClick={() => handleClick(currSquare)} />];
            }
            let currRow = <><div className="board-row">{rowChildren}</div></>;
            boardDescription = [...boardDescription, currRow];
        }

        return boardDescription;
    }
    
    let boardDescription = renderSquares(squares, status);
    
    return boardDescription;
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currMove, setCurrMove] = useState(0);
    const xIsNext = (currMove % 2 === 0);
    const currentSquares = history[currMove];
    
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrMove(nextHistory.length - 1);
    }
    
    function jumpTo(nextMove) {
        setCurrMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move === currMove){
            if (move == 0){
                return(
                    <li key={move}>You are at game start</li>
                );
            }
            else {
                return(
                    <li key={move}>You are at move #{move}</li>
                );
            }
        }
        else if (move > 0) {
            description = 'Go to move #' + move;
        }
        else {
            description = 'Go to game start';
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ul>{moves}</ul>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++){
        const [x, y, z] = winConditions[i];
        if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
            return squares[x];
        }
    }

    return null;
}