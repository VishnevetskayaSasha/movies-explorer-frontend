import React, { useEffect, useMemo, useState } from 'react';
import './Movies.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth"
import { Footer } from "../Footer/Footer"
import { Preloader } from '../Preloader/Preloader';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { SERVER_ERR, NOT_FOUND, DURATION_LENGTH, MOVIES_SERVER_URL } from '../../constants/constants';


export function Movies() {
  const defaultSearchedMovies = useMemo(() => JSON.parse(localStorage.getItem("searchedMovies")) || [], [])
  const defaultSearchValue = useMemo(() => JSON.parse(localStorage.getItem("searchValue")) || "", [])
  const defaultIsShortMovies = useMemo(() => JSON.parse(localStorage.getItem("isShortMovies")) || false, [])
  const [allMovies, setAllMovies] = useState([]);
 // const [allMoviesLocal, setAllMoviesLocal] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState(defaultSearchedMovies);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState();


  const handleSubmit = (searchValue, isShortMovies) => {
    if(searchValue.length) {
      setIsLoading(true)
      let movies = allMovies.filter((movie) => 
        (movie.nameRU || movie.nameEN).toLowerCase().includes(searchValue.toLowerCase()
      ));

      if(isShortMovies) {
        movies = movies.filter((movie) => movie.duration <= DURATION_LENGTH)
      }

      //проверка на ошибки в поиске
      if(!movies.length) {
        setErrorMessage(NOT_FOUND)
        setTimeout(() =>  setErrorMessage(false), 700);
      }

      setSearchedMovies(getLikedMovies(movies))

      localStorage.setItem("searchValue", JSON.stringify(searchValue))
      localStorage.setItem("searchedMovies", JSON.stringify(movies))
      localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies))

      setTimeout(() =>  setIsLoading(false), 700);
    }
  }

  const handleLikeMovie = (movie) => {
    let request = movie.isLiked ? mainApi.deleteMovieSaved(movie._id) : mainApi.saveMovie(movie);
    
    request
    .then(() => {
      loadSavedMovies()
    })
    .catch((err) => {
      console.log(err);
    })  
  }


  const loadAllMovies = async () => {
    try {
      let localFilm = JSON.parse(localStorage.getItem("allMoviesLocal")); //получаем данные через переменную 
      console.log(typeof localFilm, localFilm)
      if(!localFilm?.length) {
        localFilm = await moviesApi.getAllMovies() // фильмы с сервера
        localStorage.setItem("allMoviesLocal", JSON.stringify(localFilm)); //записываем данные с сервера в localStorage
      }

      setAllMovies(localFilm.map((movie) => ({
        ...movie,
        image: MOVIES_SERVER_URL + movie.image.url,
      })))
      return localFilm;
    } catch (err) {
      setErrorMessage(SERVER_ERR);
    }
  }

 
  

  const loadSavedMovies = async () => {
    try {
      const savedMovies = await mainApi.getMoviesSaved()

      setSavedMovies(savedMovies)
      return savedMovies;
    } catch (err) {
      setErrorMessage(SERVER_ERR);
    }
  }

  const getLikedMovies = (movies) => {
    return movies.map((movie) => {
      const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);

      return ({
        ...movie, 
        isLiked: Boolean(savedMovie),
        _id: savedMovie?._id
      })
    })
  }

  useEffect(() => {
    setSearchedMovies(getLikedMovies(searchedMovies))
  }, [savedMovies])

  useEffect(() => {
    //  если в начале нужна загрузка раскомментить
    // setIsLoading(true)
    Promise.all([loadAllMovies(), loadSavedMovies()])
    // .finally(() => {
    //   setIsLoading(false)
    // })
  }, [])

  return (
    <section className='movies'>
      <HeaderAuth />
      <SearchForm 
        onSubmit={handleSubmit}
        defaultSearchValue={defaultSearchValue}
        defaultIsShortMovies={defaultIsShortMovies}
      />
        {!errorMessage && isLoading && (
          <Preloader />
        )}
        {errorMessage && (
          <div className='movies__err-message'><span>{errorMessage}</span></div>
        )}
        {!errorMessage && !isLoading && <MoviesCardList movies={searchedMovies} onMovieLike={handleLikeMovie}/>}
      <Footer />
    </section>
  )
}
