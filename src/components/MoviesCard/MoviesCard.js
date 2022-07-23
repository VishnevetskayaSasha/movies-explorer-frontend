import './MoviesCard.css';
import React from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

  const location = useLocation();
  const isLocationMoviesSaved = location.pathname === '/saved-movies';

  const [isAddCard, setAddACardSaved ] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(true);

  function handleAddSaved() {
      isAddCard ? setAddACardSaved(false) : setAddACardSaved(true);
  }

  function handleDeleteSaved() {
      setAddACardSaved(false);
  }


  return (
      <li className="movie__item">
        <img src={props.img} alt="Кадр из фильма" className="movie__img"/>
        <div className="movie__description">
          <h2 className="movie__title">33 слова о дизайне</h2>
          { isLocationMoviesSaved &&
              <button
              type="button" // кнопка удаления из избранного
              className="movie__delite movie__delite-active"
              onClick={handleDeleteSaved}
              ></button>
          }
          { !isLocationMoviesSaved && // кнопка сохранения в избранное
            <button
            type="button"
            className={`movie__like ${props.isAddCard ? "movie__add-active" : "movie__add"}`}
            onClick={handleAddSaved}
            ></button>
          }
        </div>
        <p className="movie__duration">1ч42м</p>
      </li>
      )

}

export default MoviesCard;
