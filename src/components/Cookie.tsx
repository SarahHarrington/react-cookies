import { useState } from "react";

export interface CookieInt {
  type: string;
  alt: string;
  src: string;
}

export function Cookie({ cookie }: any) {
  const [showCookie, setShowCookie] = useState(false);

  function cookieClicked(cookie: object) {
    console.log('the cookie', cookie)
    setShowCookie(!showCookie)

  }

  return (
    <div className='cookie-card' onClick={() => cookieClicked(cookie)}>
      <img className={showCookie ? 'show-cookie' : 'hide-cookie'} src={cookie.src} alt={cookie.alt} />
    </div>
  )
}