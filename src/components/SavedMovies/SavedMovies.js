import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth"
import { Footer } from "../Footer/Footer"
import { Preloader } from '../Preloader/Preloader';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'
import { mainApi } from '../../utils/MainApi';
import { SERVER_ERR, NOT_FOUND, DURATION_LENGTH } from '../../constants/constants';

export function SavedMovies() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (searchValue, isShortMovies) => {
      setIsLoading(true)
      let movies = savedMovies.filter((movie) => 
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

      setSearchedMovies(movies)
      setTimeout(() =>  setIsLoading(false), 700);
  }

  const handleRemoveMovie = async (movieToRemove) => {
    try {
      await mainApi.deleteMovieSaved(movieToRemove._id)
      await loadSavedMovies();

      setSearchedMovies((prev) => prev.filter((movie) => movie.movieId !== movieToRemove.movieId))
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    loadSavedMovies()
    .then((movies) => {
      setSearchedMovies(movies)
    })
  }, [])

  return (
    <section className='saved-movies'>
      <HeaderAuth />
      <SearchForm onSubmit={handleSubmit}/>
      {!errorMessage && isLoading && (
          <Preloader />
        )}
        {errorMessage && (
          <div className='movies__err-message'><span>{errorMessage}</span></div>
        )}
      {!errorMessage && !isLoading && <MoviesCardList disableMore movies={searchedMovies} onMovieRemove={handleRemoveMovie}/>}
      <Footer />
    </section>
  )
}
