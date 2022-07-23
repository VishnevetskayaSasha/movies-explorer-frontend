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
              <a className="portfolio_link" href="https://vishnevetskayasasha.github.io/how-to-learn/" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Статичный сайт</p>
                <img className='arrow' alt="Стрелка" src={arrow}/>
              </a>
            </div>
            <img className='line-grey' alt="Линия" src={lineGrey}/>
          </li>
          <li className="portfolio__items">
            <div className="portfolio__item">
              <a className="portfolio_link" href="https://vishnevetskayasasha.github.io/russian-travel/" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Адаптивный сайт</p>
                <img className='arrow' alt="Стрелка" src={arrow}/>
              </a>
            </div>
            <img className='line-grey' alt="Линия" src={lineGrey}/>
          </li>
          <li className="portfolio__items">
            <div className="portfolio__item">
              <a className="portfolio_link" href="http://VishnevetskayaSasha.github.io/react-mesto-auth" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Одностраничное приложение</p>
                <img className='arrow' alt="Стрелка" src={arrow}/>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
