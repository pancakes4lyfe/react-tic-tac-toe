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
        class: 'square'
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
  const[winner, setWinner] = useState('');
  // const[boardStatus, setBoardStatus] = useState('grid');

  
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const fillSquare = (squareId) => {
    const updatedSquare = {id:squareId, value:turn, class:'square'};
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
      
      if (turn === 'x') {
        setTurn(PLAYER_2);
      } else {
        setTurn(PLAYER_1);
      }
  }

  const handleClick = (squareId, squareValue) => {
    if (winner) {
      console.log('Nope, game over!');
    } else if (squareValue) {
      console.log('Already Clicked!');
    } else {
      fillSquare(squareId);
    }
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
        row[0].class = 'red-square';
        row[1].class = 'red-square';
        row[2].class= 'red-square';
      }       
    }
    for (let i = 0; i < 3; i++) {
      if (squares[0][i].value === squares[1][i].value && squares[0][i].value === squares[2][i].value && squares[0][i].value !== '') {
        winner = squares[0][i].value;
        squares[0][i].class = 'red-square';
        squares[1][i].class = 'red-square';
        squares[2][i].class= 'red-square';
      }
    }
    if (squares[0][0].value === squares[1][1].value && squares[0][0].value === squares[2][2].value && squares[0][0].value !== '') {
      winner = squares[1][1].value;
      squares[0][0].class = 'red-square';
      squares[1][1].class = 'red-square';
      squares[2][2].class= 'red-square';
    }
    if (squares[0][2].value === squares[1][1].value && squares[0][2].value === squares[2][0].value && squares[0][2].value !== '') {
      winner = squares[1][1].value;
      squares[0][2].class = 'red-square';
      squares[1][1].class = 'red-square';
      squares[2][0].class= 'red-square';
    }
    let fullBoard = true;
    for (let row of squares) {
      for (let square of row) {
        if (!square.value) {
          fullBoard = false;
        }
      }
    }
    if (fullBoard && !winner) {
      winner = 'TIE';
      // setBoardStatus('tieBoard');
    }
    if (winner) {
      setWinner(winner);
    }
  }

  if (!winner) {
    checkForWinner()
  } 
  

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setTurn(PLAYER_1);
    setWinner('');
    // setBoardStatus('grid');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board /*className={boardStatus}*/ squares={squares} onClickCallback={handleClick} />
      </main>
    </div>
  );
}

export default App;
