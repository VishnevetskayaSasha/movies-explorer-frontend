import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import film1 from '../../images/film1.png';
import film2 from '../../images/film2.png';
import film3 from '../../images/film3.png';
import film4 from '../../images/film4.png';
import film5 from '../../images/film5.png';
import film6 from '../../images/film6.png';
import film7 from '../../images/film7.png';
import film8 from '../../images/film8.png';
import film9 from '../../images/film9.png';
import film10 from '../../images/film10.png';
import film11 from '../../images/film11.png';
import film12 from '../../images/film12.png';
import film13 from '../../images/film13.png';
import film14 from '../../images/film14.png';
import film15 from '../../images/film15.png';
import film16 from '../../images/film16.png';


export function MoviesCardList() {
  const location = useLocation();
  const isLocationMovies = location.pathname === '/movies';

  return (
    <section className="movies-list">
      {isLocationMovies &&
      <div>
        <ul className="movies-list__items">
          <MoviesCard img={film1}/>
          <MoviesCard img={film2} isAddCard={true}/>
          <MoviesCard img={film3}/>
          <MoviesCard img={film4} />
          <MoviesCard img={film5} isAddCard={true}/>
          <MoviesCard img={film6} />
          <MoviesCard img={film7} />
          <MoviesCard img={film8} isAddCard={true}/>
          <MoviesCard img={film9} />
          <MoviesCard img={film10} />
          <MoviesCard img={film11} isAddCard={true}/>
          <MoviesCard img={film12} />
          <MoviesCard img={film13} isAddCard={true}/>
          <MoviesCard img={film14} />
          <MoviesCard img={film15} />
          <MoviesCard img={film16} isAddCard={true}/>
        </ul>
        <button
          type="button"
          className="movies-list__button">Ещё</button>
      </div>
      }
      {!isLocationMovies && // временное решение для верстки
      <div>
        <ul className="movies-list__items movies-list__saved">
          <MoviesCard img={film1}/>
          <MoviesCard img={film2}/>
          <MoviesCard img={film3}/>
        </ul>
      </div>
      }
    </section>
  );
}

