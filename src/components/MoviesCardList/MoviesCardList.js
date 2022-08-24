import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


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
        if (document.documentElement.clientWidth > 1200) {
            setMoviesCount(12); // кол-во на странице
            setAdditionMovies(4); //кол-во добавлений
        }  else if (document.documentElement.clientWidth > 1136) {
            setMoviesCount(12);
            setAdditionMovies(3);
        } else if (document.documentElement.clientWidth > 767) {
            setMoviesCount(8);
            setAdditionMovies(2);
        } else {
            setMoviesCount(5);
            setAdditionMovies(2);
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



