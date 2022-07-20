import React from "react";
import "./Portfolio.css";
import lineGrey from '../../images/line-grey.svg';
import arrow from '../../images/arrow.svg';

export function Portfolio () {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__items">
            <div className="portfolio__item">
              <a className="portfolio_link" href="https://vishnevetskayasasha.github.io/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
              <img className='arrow' alt="Стрелка" src={arrow}/>
            </div>
            <img className='line-grey' alt="Линия" src={lineGrey}/>
          </li>
          <li className="portfolio__items">
            <div className="portfolio__item">
              <a className="portfolio_link" href="https://vishnevetskayasasha.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
              <img className='arrow' alt="Стрелка" src={arrow}/>
            </div>
            <img className='line-grey' alt="Линия" src={lineGrey}/>
          </li>
          <li className="portfolio__items">
            <div className="portfolio__item">
              <a className="portfolio_link" href="http://VishnevetskayaSasha.github.io/react-mesto-auth" target="_blank" rel="noreferrer">Одностраничное приложение</a>
              <img className='arrow' alt="Стрелка" src={arrow}/>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
