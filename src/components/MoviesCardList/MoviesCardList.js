import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import {
  NUMBER_OF_FILMS_DESK,
  NUMBER_OF_FILMS_TABLET,
  NUMBER_OF_FILMS_MOB,
  MORE_OF_FILMS_BIGDESK,
  MORE_OF_FILMS_DESK,
  MORE_OF_FILMS_TABLET_MOB,
  WIDTH_SCREEN_BIGDESK,
  WIDTH_SCREEN_DESK,
  WIDTH_SCREEN_TABLET,
} from "../../constants/constants"


export function MoviesCardList( {
    movies = [],
    errorMessage,
    onMovieRemove,
    onMovieLike,
    disableMore = false
} ) {
    const [visibleMovies, setVisibleMovies] = React.useState([]); // карточки, которые будут отображаться
    const [moviesCount, setMoviesCount] = React.useState(0); // количество карточек для отображения
    const [additionMovies, setAdditionMovies] = React.useState(0); // количество карточек которые добаляются
    const [additionMoviesCount, setAdditionMoviesCount] = React.useState(0); // количество карточек которые добаляются

    function handleMoviesCount() {
        if (document.documentElement.clientWidth > (WIDTH_SCREEN_BIGDESK)) {
            setMoviesCount(NUMBER_OF_FILMS_DESK); // кол-во на странице
            setAdditionMovies(MORE_OF_FILMS_BIGDESK); //кол-во добавлений
        }  else if (document.documentElement.clientWidth > (WIDTH_SCREEN_DESK)) {
            setMoviesCount(NUMBER_OF_FILMS_DESK);
            setAdditionMovies(MORE_OF_FILMS_DESK);
        } else if (document.documentElement.clientWidth > (WIDTH_SCREEN_TABLET)) {
            setMoviesCount(NUMBER_OF_FILMS_TABLET);
            setAdditionMovies(MORE_OF_FILMS_TABLET_MOB);
        } else {
            setMoviesCount(NUMBER_OF_FILMS_MOB);
            setAdditionMovies(MORE_OF_FILMS_TABLET_MOB);
        }
    }

    function handleMoreMovies() {
        setVisibleMovies(movies.slice(0, visibleMovies.length + additionMovies));
        setAdditionMoviesCount(visibleMovies.length + additionMovies)
    }

    React.useEffect(() => {
        setVisibleMovies(disableMore ? movies : movies.slice(0, additionMoviesCount || moviesCount))            
    }, [movies, moviesCount]);

    React.useEffect(() => {
        handleMoviesCount();

        const handleResizeWindow = () => {
            setTimeout(handleMoviesCount, 3000);
        }
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        }
    }, []);

  return (
    <section className="movies-list">
      {errorMessage ? (
        <span className="movies__error">{errorMessage}</span>
      ) : (
        <ul className="movies-list__items">
          {visibleMovies.map((movie) => (
            <MoviesCard
                key={movie.id || movie.movieId}
                onRemove={onMovieRemove}
                onLikeClick={onMovieLike}
                movie={movie}/>
        ))}
        </ul>
      )}
      {!disableMore && visibleMovies.length < movies.length &&
        (<button type="button"
            aria-label="Загрузить еще карточки"
            onClick={handleMoreMovies}
            className="movies-list__button">Ещё
        </button>) 
      }
    </section>
  );
}



