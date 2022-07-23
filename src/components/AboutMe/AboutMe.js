import React from "react";
import "./AboutMe.css";
import line from '../../images/line.svg';
import photo from '../../images/my-photo.jpeg'

export function AboutMe () {
  return (
    <section className="me">
      <div className="me__content">
        <h2 className="me__title">Студент</h2>
        <img className='line' alt="Линия" src={line}/>
        <div className="me__description">
          <div className="me__about">
            <h3 className="me__name">Саша</h3>
            <p className="me__text">Фронтенд-разработчик, 24 года</p>
            <p className="me__text-mini">Я родилась и живу в Москве. В 2019 году закончила факультет Экономики и права в РЭУ им. Г.В. Плеханова.
              В 2021 году решила кардинально изменить сферу деятельности и начала проходить курс по веб-разработке от Яндекс Практикума. Сейчас я работаю младшим веб разработчиком
              и продолжаю развивать свои навыки. Из ближайших планов - выучить PHP </p>
            <div className="me__social-list">
              <a target="_blank" rel="noreferrer" className="me__social-item" href='http://t.me/vishenca'>Telegram</a>
              <a target="_blank" rel="noreferrer" className="me__social-item" href='https://github.com/VishnevetskayaSasha'>Github</a>
            </div>
          </div>
          <img className="me__photo" src={photo} alt="Фото"
        />
        </div>
      </div>
    </section>
  )
}
