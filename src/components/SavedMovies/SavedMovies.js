import React from 'react';
import './SavedMovies.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth"
import { Footer } from "../Footer/Footer"
import { Preloader } from '../Preloader/Preloader';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'


export function SavedMovies() {
  return (
    <section className='saved-movies'>
      <HeaderAuth />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <Footer />
    </section>
  )
}