import React from "react";
import "./Footer.css";
import lineGrey from '../../images/line-grey.svg';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__conteiner">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <img className='line-grey' alt="Линия" src={lineGrey}/>
        <div className="footer__content">
          <p className="footer__copyright">&copy; 2022</p>
          <div className="footer__social-list">
            <a target="_blank" rel="noreferrer" className="footer__social-item" href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
            <a target="_blank" rel="noreferrer" className="footer__social-item" href='http://t.me/vishenca'>Telegram</a>
            <a target="_blank" rel="noreferrer" className="footer__social-item" href='https://github.com/VishnevetskayaSasha'>Github</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
