import React, { useRef, useState, useEffect } from 'react'
import logoPastelito from '../img/logoPastelito.png'
import '../styles/Header.css'
import "bootstrap-icons/font/bootstrap-icons.css";

function HeaderFeed() {
  const fondoRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  function scrollear() {
    if (!scrolled && fondoRef.current) {
      fondoRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div>
      <div className="header">
        <div className='logo'>
          <img src={logoPastelito} alt="" />
        </div>
        <div className='flecha'>
          <i onClick={scrollear} className={`bi ${scrolled ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
        </div>
      </div>
      <div className="fondoHeader">
      </div>

      <div ref={fondoRef}></div>
    </div>
  )
}

export default HeaderFeed