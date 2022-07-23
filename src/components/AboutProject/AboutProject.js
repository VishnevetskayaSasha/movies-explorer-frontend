import React from 'react';
import './AboutProject.css'
import line from '../../images/line.svg';

export function AboutProject () {
  return (
    <section className='project' id="about">
      <div className='project__conteiner'>
        <h2 className='project__title'>О проекте</h2>
        <img className='line' alt="Линия" src={line}/>
        <div className='priject__content'>
          <div className='project__block'>
            <h3 className='project__block-title'>Дипломный проект включал 5 этапов</h3>
            <p className='project__block-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className='project__block'>
            <h3 className='project__block-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='project__block-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='project__time'>
          <p className='project__time-title project__time-title_back'>1 неделя</p>
          <p className='project__time-title project__time-title_front'>4 недели</p>
          <p className='project__time-subtitle'>Back-end</p>
          <p className='project__time-subtitle'>Front-end</p>
        </div>
      </div>
    </section>
  )
}
