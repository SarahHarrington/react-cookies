import './Game.css';
import { useState } from "react"
import { allCookies } from '../cookies';

export function Game() {
  const [cookies, setCookies] = useState([])

  function shuffleCookies(array: object[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function startGame() {
    // shuffle the cookies
    // pick how many matches?
  }

  function cookieCountClicked(e: any) {
    console.log('clicked cookie count', e.target.value)
  }

  return (
    <div className='game-container'>
      <h2>How hungry are you?</h2>
      <div>
        <button value='10' onClick={cookieCountClicked} className='cookie-count'>10</button>
        <button value='15' onClick={cookieCountClicked} className='cookie-count'>15</button>
        <button value='20' onClick={cookieCountClicked} className='cookie-count'>20</button>
      </div>
      <button>Start Game</button>
    </div>
  )
}