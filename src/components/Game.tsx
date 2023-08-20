import './Game.scss';
import WinMessage from './WinMessage';
import Cookie, { CookieInt } from './Cookie';
import { useState, useCallback } from "react";
import { useImmer } from 'use-immer';
import { allCookies } from '../cookies';

export function Game() {
  const [cookies, setCookies] = useImmer<CookieInt[]>([])
  const [cookieCount, setCookieCount] = useState<number>(0)
  const [firstCookie, setFirstCookie] = useState<number | null>(null)
  const [checkingMatch, setCheckingMatch] = useState<boolean>(false)
  const [attempts, setAttempts] = useState<number>(0)
  const [history, setHistory] = useState<number[][]>([])
  const [jarSize, setJarSize] = useState<string>('')
  const [matchedCount, setMatchedCount] = useState<number>(0)
  const [gameStart, setGameStart] = useState<number>(0)
  const [gameLength, setGameLength] = useState<string>('')

  const [isFalling, setIsFalling] = useState<boolean>(false)
  
  function updateIsFalling() {
    setIsFalling(true)
  }
  
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

  const clearCookie = useCallback((id: number) => {
    setCookies((draft) => {
      const c = draft.find((cookie, index) => index === id);
      if (c) {
        c.color = ''
        c.selected = false
      }
    });
  }, []);

  const greenCookie = useCallback((id: number) => {
    setCookies((draft) => {
      const c = draft.find((cookie, index) => index === id);
      if (c) {
        c.color = 'green'
        c.selected = true
      }
    });
  }, []);

  const orangeCookie = useCallback((id: number) => {
    setCookies((draft) => {
      const c = draft.find((cookie, index) => index === id);
      if (c) {
        c.color = 'orange'
        c.selected = true
      }
    });
  }, []);

  function startGame(e: any) {
    setGameStart(Date.now())
    setCookieCount(parseInt(e.target.value))
    if(e.target.value === '10') setJarSize('small')
    if(e.target.value === '15') setJarSize('medium')
    if(e.target.value === '20') setJarSize('large')
    let shuffledCookies = shuffleCookies(allCookies);
    shuffledCookies = shuffledCookies.slice(0, e.target.value)
    shuffledCookies = [...shuffledCookies, ...shuffledCookies]
    const gameCookies = shuffleCookies(shuffledCookies)
    setCookies(gameCookies)
    return
  }
  
  function getGameTime() {
    const endTime = Date.now()
    if (gameStart) {
      const length = (endTime - gameStart) / 1000
      if (length > 60) {
        const min = length / 60
        const sec = length % 60
        setGameLength(`That game was ${min.toFixed(0)} minutes ${sec.toFixed(0)} seconds`)
      } else {
        setGameLength(`That game was ${length.toFixed(0)} seconds`)
      }
      // setGameLength(length) 
    }
  }

  async function cookieClicked(cookie: CookieInt, id: number) {
    cookies.map((cookie, index) => {
      if (cookie.color === 'orange') clearCookie(index)
    })
    if (checkingMatch) return
    checkForMatch(cookie, id)
  }

  function finishRound(firstCookie: number, id: number) {
    setAttempts(attempts + 1)
    setCheckingMatch(false)
    setHistory([...history, [firstCookie, id]])
    setFirstCookie(null)
  }

  async function checkForMatch(cookie: any, id: number) {
    if (firstCookie === null) {
      greenCookie(id)
      setFirstCookie(id)
      setCheckingMatch(false)
      return
    } else {
      if (cookies[firstCookie].type === cookies[id].type) {
        cookies.map((cookie: CookieInt, index) => {
          if (index === firstCookie || index === id) {
            greenCookie(id)
          }
          return
        })
        setMatchedCount(matchedCount + 1)
        if (cookieCount === matchedCount + 1) {
          updateIsFalling()
          getGameTime()
        }
        
      } else {
        cookies.map((cookie: CookieInt, index) => {
          if (index === firstCookie || index === id) {
            orangeCookie(id)
            orangeCookie(firstCookie)
          } else {
            return cookie;
          }
        })
      }
    }
    finishRound(firstCookie, id)
  }

  function resetGame() {
    setAttempts(0)
    setIsFalling(false)
    setFirstCookie(null)
    setCookieCount(0)
    setJarSize('')
    setMatchedCount(0)
    setCheckingMatch(false)
    setHistory([])
    setCookies([])
  }

  return (
    <>
      {isFalling &&
        <WinMessage attempts={attempts} resetGame={resetGame} gameLength={gameLength}/>
      }
      <div className='game-container'>
        <div className='game-header'>
          <div></div>
          <h1>Cookie Confusion</h1>
        </div>
        {cookieCount !== 0 &&
          <div className={`cookie-jar ${jarSize}`}>
            {
              cookies.map((cookie: CookieInt, index) => (
                <Cookie 
                  key={index} 
                  id={index} 
                  cookie={cookie} 
                  cookieClicked={cookieClicked} 
                  imageSize={jarSize}
                  clearCookie={clearCookie}
                />
              ))
            }
          </div>
        }
          {cookieCount === 0 && 
            <>
              <div className='game-welcome'>
                <h2>How hungry are you?</h2>
                  <button value='10' onClick={startGame} className='cookie-count'>lil bit</button>
                  <button value='15' onClick={startGame} className='cookie-count'>pretty hungry</button>
                  <button value='20' onClick={startGame} className='cookie-count'>RAVENOUS</button>
              </div>
            </>
          }       
      </div>
    </>
  )
}