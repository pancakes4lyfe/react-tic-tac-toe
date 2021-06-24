import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [turn, setTurn] = useState(PLAYER_1);
  const[winner, setWinner] = useState('')

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const handleClick = (squareId) => {
    const updatedSquare = {id:squareId, value:turn};
    const updatedSquaresData = squares.map(row => {
      return row.map(square => {
        if (square.id === squareId) {
          return updatedSquare;
        } else {
          return square;
        }
      });
    });
    setSquares(updatedSquaresData);
    checkForWinner()
    if (turn === 'X') {
      setTurn(PLAYER_2);
    } else {
      setTurn(PLAYER_1);
    }
    return winner;
  }


  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if 
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if 
    //    all three squares have the same value.
    let winner = '';
    for (let row of squares){
      if (row[0].value === row[1].value && row[0].value === row[2].value && row[0].value !== ''){
        winner = (row[0].value);
      }       
    }
    for (let i = 0; i < 3; i++) {
      if (squares[0][i].value === squares[1][i].value && squares[0][i].value === squares[2][i].value && squares[0][i].value !== '') {
        winner = squares[0][i].value;
      }
    }
    if ((squares[0][0].value === squares[1][1].value && squares[0][0].value === squares[2][2].value && squares[0][0].value !== '') || (squares[0][2].value === squares[1][1].value && squares[0][2].value === squares[2][0].value && squares[0][2].value !== '')) {
      winner = squares[1][1].value;
    }
    if (winner) {
      setWinner(winner);
    }
    // console.log(winner);
  }

  if (!winner) {
    checkForWinner()
  } 
  

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={handleClick} />
      </main>
    </div>
  );
}

export default App;
