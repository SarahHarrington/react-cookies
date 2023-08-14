import './Game.css';
import { Cookie, CookieInt } from './Cookie';
import { useState } from "react";
import { allCookies } from '../cookies';

export function Game() {
  const [cookies, setCookies] = useState<[]>([])
  const [cookieCount, setCookieCount] = useState(0)

  function shuffleCookies(cookiesToShuffle: any) {
    let currentIndex = cookiesToShuffle.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cookiesToShuffle[currentIndex];
      cookiesToShuffle[currentIndex] = cookiesToShuffle[randomIndex];
      cookiesToShuffle[randomIndex] = temporaryValue;
    }
    return cookiesToShuffle;
  }

  function startGame(e: any) {
    console.log('start game clicked')
    setCookieCount(e.target.value)
    let shuffledCookies = shuffleCookies(allCookies);
    shuffledCookies = shuffledCookies.slice(0, e.target.value)
    shuffledCookies = [...shuffledCookies, ...shuffledCookies]
    const gameCookies = shuffleCookies(shuffledCookies)
    setCookies(gameCookies)
  }

  return (
    <div className='game-container'>
      {cookieCount !== 0 ? (
        cookies.map((cookie: CookieInt, index) => (
          <Cookie cookie={cookie} key={index}/>
        ))
      ) : (
        <>
          <h2>How hungry are you?</h2>
          <div>
            <button value='10' onClick={startGame} className='cookie-count'>10</button>
            <button value='15' onClick={startGame} className='cookie-count'>15</button>
            <button value='20' onClick={startGame} className='cookie-count'>20</button>
          </div>
        </>
      ) 
      }
    </div>
  )
}