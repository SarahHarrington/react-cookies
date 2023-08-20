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
  const [isFalling, setIsFalling] = useState(true)
    return (
      <div className="App">
        {isFalling &&         
          <Confetti
            width={width}
            height={height}
          />
        }

        <Game />
      </div>
  );
}

export default App;
