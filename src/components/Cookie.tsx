import { useState, useEffect, AnimationEvent } from "react";
import './Cookie.scss';

export interface CookieInt {
  type: string;
  alt: string;
  src: string;
  color: string;
  selected: boolean;
}

export default function Cookie({ cookie, id, cookieClicked, imageSize, clearCookie }: any) {
  const [showCookie, setShowCookie] = useState(cookie.selected);
  const [cardColor, setCardColor] = useState(cookie.color)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (cookie.color === '' || cookie.selected) {
      setCardColor(cookie.color)
      setShowCookie(cookie.selected)
      setDisabled(true)
    } 
    if (cookie.color === 'orange' || cookie.color === '') {
      setDisabled(false)
    }
  }, [cookie.color, cookie.selected])

  function clearClass(e: AnimationEvent, id: number) {
    if (e.animationName === 'mismatch') {
      setShowCookie(false)
      setCardColor('')
      clearCookie(id)
    }
  }

  return (
    <button 
      disabled={disabled} 
      className={`cookie-card ${cardColor} ${imageSize}`} 
      onClick={() => cookieClicked(cookie, id)}
      onAnimationEnd={(e) => clearClass(e, id)}
    >
      <img className={`${showCookie ? 'show-cookie' : 'hide-cookie'} ${imageSize}` } src={cookie.src} alt={cookie.alt} />
    </button>
  )
}