import './MoviesCard.css';
import React from "react";
import { HOUR_DURATION } from "../../constants/constants"

function MoviesCard({
  onRemove,
  onLikeClick,
  movie,
}) {
  
    const getFormattedDuration = () => {
        const duration = {};
        duration['hours'] = Math.floor(movie.duration / (HOUR_DURATION));
        duration['minutes'] = movie.duration % (HOUR_DURATION);
        return duration;
    }

    const handleLikeClick = () => {
      onLikeClick(movie)
    }

    const handleRemove = () => {
      onRemove(movie)
    }

  return (
      <li className="movie__item">
        {/* <img alt="Кадр из фильма" src={isLocationMoviesSaved ?   props.movie.image : MOVIES_SERVER_URL + props.movie.image.url} className="movie__img"/> */}
        <div className='movie__img-block'>
          <a rel="noreferrer" target="_blank" href={movie.trailerLink}>
            <img alt="Кадр из фильма" src={movie.image} className="movie__img"/>
          </a>
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{movie.nameRU}</h2>
          { onLikeClick && 
              <button
              type="button" 
              className={`movie__like ${movie.isLiked ? "movie__add-active" : "movie__add"}`}
              onClick={handleLikeClick}
              ></button>
          }
          { onRemove && 
            <button
            type="button"
            className="movie__delite movie__delite-active"
            onClick={handleRemove}
            ></button>
          }
        </div>
        <p className="movie__duration">{`${ getFormattedDuration().hours !== 0 ? `${getFormattedDuration().hours}ч ` : "" } ${getFormattedDuration().minutes}м`}</p>
      </li>
      )

}

export default MoviesCard;
