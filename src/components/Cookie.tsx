import { useState, useEffect } from "react";
import './Cookie.scss';

export interface CookieInt {
  type: string;
  alt: string;
  src: string;
}

export default function Cookie({ cookie, id, cookieClicked, imageSize }: any) {
  const [showCookie, setShowCookie] = useState(cookie.selected);
  const [cardColor, setCardColor] = useState(cookie.color)

  useEffect(() => {
    setCardColor(cookie.color)
    setShowCookie(cookie.selected)
  }, [cookie.color, cookie.selected])

  return (
    <button disabled={cookie.selected} className={`cookie-card ${cardColor} ${imageSize}`} onClick={() => cookieClicked(cookie, id)}>
      <img className={`${showCookie ? 'show-cookie' : 'hide-cookie'} ${imageSize}` } src={cookie.src} alt={cookie.alt} />
    </button>
  )
}