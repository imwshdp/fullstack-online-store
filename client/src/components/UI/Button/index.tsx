import React, { MouseEventHandler, useState } from 'react';
import css from "./index.module.css";

interface TProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  onclick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<TProps & React.PropsWithChildren> = ({children, width, height, color, onclick, disabled}) => {

  const [clickEnded, setClickEnded] = useState<boolean>(true)
  const [ripples, setRipples] = useState<{ x: number, y: number }[]>([])

  const clicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!clickEnded) return;
    setClickEnded(false)

    let x = e.clientX - (e.target as HTMLButtonElement).offsetLeft;
    let y = e.clientY - (e.target as HTMLButtonElement).offsetTop;

    setRipples(prev => [...prev, { x: x, y: y }])

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.x !== x && ripple.y !== y))
      setClickEnded(true)
    }, 1000);

    if(onclick) onclick()
  }
  
  return (
    <button
      type='button'
      style={{
        height: height ? height : "inherit",
        background: color ? "transparent" : "",
        backgroundColor: disabled ? "#e5e4e2" : color,
        width: width ? width : "inherit",
        color: color ? "black" : ""
      }}
      onClick={(e) => clicked(e)}
      disabled={disabled}
    >
      <>
        {children}
        {ripples.map(ripple =>
          <span
            key={ripple.x + ripple.y + Date.now()}
            className={css.Ripples}
            style={{ left: ripple.x, top: ripple.y }}
          >
          </span>
        )}
      </>
    </button>
  );
}

export default Button;