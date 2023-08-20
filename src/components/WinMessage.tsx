import {
  useWindowSize,
} from '@react-hook/window-size'
import Confetti from 'react-confetti'

interface WinMessageProps {
  attempts: number;
  gameLength: string;
  resetGame: () => void;
}

export default function WinMessage({attempts, resetGame, gameLength}: WinMessageProps) {
  const [width, height] = useWindowSize()

  return (
    <>
    <Confetti
      width={width}
      height={height}
      recycle={false}
      tweenDuration={50000}
    />
    <div className='win-message'>
      <h1>You won!</h1>
      <p>Attempts: {attempts}</p>
      <p>{gameLength}</p>
      <button onClick={resetGame}>play again?</button>
    </div>
  </>
  )
}