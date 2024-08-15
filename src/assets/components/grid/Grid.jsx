import React, { useState } from 'react';
import Card from '../card/card';
import { ToastContainer, toast } from 'react-toastify';
import './grid.css';
import 'react-toastify/dist/ReactToastify.css';

function isWinner(Board, symbol) {
  // Check rows
  if (Board[0] === symbol && Board[1] === symbol && Board[2] === symbol) return symbol;
  if (Board[3] === symbol && Board[4] === symbol && Board[5] === symbol) return symbol;
  if (Board[6] === symbol && Board[7] === symbol && Board[8] === symbol) return symbol;

  // Check columns
  if (Board[0] === symbol && Board[3] === symbol && Board[6] === symbol) return symbol;
  if (Board[1] === symbol && Board[4] === symbol && Board[7] === symbol) return symbol;
  if (Board[2] === symbol && Board[5] === symbol && Board[8] === symbol) return symbol;

  // Check diagonals
  if (Board[0] === symbol && Board[4] === symbol && Board[8] === symbol) return symbol;
  if (Board[2] === symbol && Board[4] === symbol && Board[6] === symbol) return symbol;

  return null;
}

export const Grid = ({ numberofcards }) => {
  const [turn, setTurn] = useState(true); // false->X, true->O
  const [Board, setBoard] = useState(Array(numberofcards).fill(''));
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (Board[index] || winner) return; // Prevent overwriting or playing after game ends

    const newBoard = [...Board];
    newBoard[index] = turn ? 'O' : 'X';

    setBoard(newBoard);

    const win = isWinner(newBoard, turn ? 'O' : 'X');
    if (win) {
      setWinner(win);
      toast.success(`Congratulations! ${win} wins the game!!`);
    }

    setTurn(!turn);
  }

  function reset() {
    setBoard(Array(numberofcards).fill(''));
    setWinner(null);
    setTurn(true);
  }

  return (
    <div className='grid-wrapper'>
       {winner && (
        <>
          <h1 className='winner'>Winner is {winner}</h1>
          <button className='reset' onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h1 className='turn-highlight'>Current Turn: {turn ? 'O' : 'X'}</h1>
      <div className='grid'>
        {Board.map((value, idx) => (
          <Card gameEnd={winner ? true : false} onPlay={() => play(idx)} player={value} key={idx} index={idx} />
        ))}
      </div>
     
      <ToastContainer position='top-center' />
    </div>
  );
};

export default Grid;
