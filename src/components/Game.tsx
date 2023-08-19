import './Game.scss';
import Cookie, { CookieInt } from './Cookie';
import { useState } from "react";
import { allCookies } from '../cookies';

export function Game() {
  const [cookies, setCookies] = useState<CookieInt[]>([])
  const [cookieCount, setCookieCount] = useState(0)
  const [firstCookie, setFirstCookie] = useState<number | null>(null)
  const [secondCookie, setSecondCookie] = useState<number | null>(null)
  const [checkingMatch, setCheckingMatch] = useState<boolean>(false)
  const [attempts, setAttempts] = useState<number>(0)
  const [history, setHistory] = useState<number[][]>([])
  const [jarSize, setJarSize] = useState<string>('')
  const [timeoutId, setTimeoutId] = useState<any>(null)

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
    setCookieCount(e.target.value)
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

  async function cookieClicked(cookie: CookieInt, id: number) {
    console.log('cookie clicked', cookie)
    if (checkingMatch) {
      return
    }  else {
      console.log('in cookie clicked else: timeoutId', timeoutId)
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
        clearUnmatchedCookies(id);
      } else {
        setCheckingMatch(true)
        await checkForMatch(cookie, id)
      }
    }
  }

  function clearUnmatchedCookies(id: number | null = null) {
    const clearedTempCookies = cookies.map((cookie: CookieInt, index) => {
      if (index === firstCookie || index === secondCookie) {
        return {... cookie, color: '', selected: false}
      } else if (id) {
        if (id === index) {
          setFirstCookie(id)
          return {...cookie, color: 'green', selected: true}
        } else {
          return cookie
        }
      } else {
        return cookie
      }
    })
    setCookies(clearedTempCookies)
    if (id === null) setFirstCookie(null)
    setSecondCookie(null)
    return;
  }

  async function checkForMatch(cookie: any, id: number) {
    if (firstCookie === null) {
      console.log('first cookie if')
      const tempCookies = cookies.map((cookie: CookieInt, index) => {
        if (index === id)  return {...cookie, color: 'green', selected: true}
        return cookie;
      })
      setCookies(tempCookies)
      setFirstCookie(id)
      setCheckingMatch(false)
      return
    } else {
      console.log('second cookie if')
      setSecondCookie(id)
      if (cookies[firstCookie].type === cookies[id].type) {
        console.log('yay match!')
        const tempCookies = cookies.map((cookie: CookieInt, index) => {
          if (index === firstCookie || index === id) {
            return {... cookie, color: 'green', selected: true}
          } else {
            return cookie
          }
        })
        setAttempts(attempts + 1)
        setCheckingMatch(false)
        setCookies(tempCookies)
        setHistory([...history, [firstCookie, id]])
        setFirstCookie(null)
        setSecondCookie(null)
      } else {
        console.log('no match')
        const tempCookies = cookies.map((cookie: CookieInt, index) => {
          if (index === firstCookie || index === id) {
            return {... cookie, color: 'orange', selected: true}
          } else {
            return {...cookie, disabled: true}
          }
        })
        setCookies(tempCookies)
        setCheckingMatch(false)
        setAttempts(attempts + 1)
        
        const timeoutId = setTimeout(() => {
          clearUnmatchedCookies();
          setTimeoutId(null)
        }, 2500)
        setTimeoutId(timeoutId)
      }
    }
  }

  return (
    <>
      <div className='game-container'>
        <div className='game-header'>
          <div></div>
          <h1>Cookie Confusion</h1>
          <div>attempts: {attempts}</div>
        </div>
        {cookieCount !== 0 &&
        <div className={`cookie-jar ${jarSize}`}>
          {
            cookies.map((cookie: CookieInt, index) => (
              <Cookie key={index} id={index} cookie={cookie} cookieClicked={cookieClicked} imageSize={jarSize}/>
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