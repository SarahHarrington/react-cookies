import React from 'react';
import './App.css';
import { useState } from 'react'
import { Game } from './components/Game';
import {
  useWindowSize,
} from '@react-hook/window-size'
import Confetti from 'react-confetti'

function App() {
  const [width, height] = useWindowSize()
  const [isFalling, setIsFalling] = useState<boolean>(true)
  
  function updateIsFalling() {
    setIsFalling(true)
  }
  
  return (
    <div className="App">
      {isFalling &&
        <>
          <Confetti
            width={width}
            height={height}
          />
          <div className='win-message'>
            <h1>You won!</h1>
            <button >play again?</button>
          </div>
        </>        
      }
      <Game updateIsFalling={updateIsFalling}/>
    </div>
  );
}

export default App;
