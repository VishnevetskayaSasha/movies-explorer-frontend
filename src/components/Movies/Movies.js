import React from 'react';
import './Movies.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth"
import { Footer } from "../Footer/Footer"
import { Preloader } from '../Preloader/Preloader';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList'


export function Movies() {
  return (
    <section className='movies'>
      <HeaderAuth />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <Footer />
    </section>
  )
}
