import React from 'react';
import './Promo.css';
import World from '../../images/World.png'

export function Promo () {
  
  return (
    <section className='promo'>
      <div className='promo__content'>
        <img src={World} alt='Мир из слов' className='promo__img'/>
        <div className='promo__text'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__text-mini'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
         <a className='promo__link' href="#about" ><button className="promo__button">Узнать больше</button></a>
        </div>
      </div>
    </section>

  )
}

