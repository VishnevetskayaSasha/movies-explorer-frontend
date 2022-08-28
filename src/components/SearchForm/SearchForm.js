import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import search from '../../images/search.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import lineGrey from '../../images/line-grey.svg';
import { NOT_WORD_MOWIES } from '../../constants/constants'

export function SearchForm ({
  onSearchChange,
  onShortMoviesCheckedChange,
  onSubmit,
  defaultSearchValue = "",
  defaultIsShortMovies = false
}) {
  
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const [isShortMovies, setIsShortMovies] = useState(defaultIsShortMovies);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    onSearchChange?.(e.target.value)
  }

  const handleIsShortMoviesChanged = () => {
    setIsShortMovies(!isShortMovies)
    onShortMoviesCheckedChange?.(!isShortMovies)
    onSubmit?.(searchValue, !isShortMovies)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(searchValue, isShortMovies)
      showErrorMessage();
      setTimeout(() =>  setErrorMessage(), 1300);
    }
   }

   useEffect(() => {
    if (searchValue !== '') {
      showErrorMessage();
    }
  }, [searchValue]);
  
    function showErrorMessage() {
      if (searchValue === '') {
        setErrorMessage(NOT_WORD_MOWIES);
      }
    }
    

  return (
    <div className="search">
      <div className="search__content">
      <form onSubmit={handleSubmit} name="search-films" className="search__form" noValidate>
        <div className="search__container">
          <input 
            id="search" 
            name="search" 
            type="text" 
            className="search__input"
            value={searchValue}
            required
            onChange={handleInputChange}
            minLength={1}
            placeholder="Фильм"
          />
          <button
            type="submit"
            className="search__button"
          ><img className='search__img' alt="Поиск" src={search}/>
          </button>
        </div>
      </form> 
      <FilterCheckbox onChange={handleIsShortMoviesChanged} isChecked={isShortMovies} />
      </div>
      <span className="profile__message">
          {errorMessage}
        </span>
      <img className='line-grey' alt="Линия" src={lineGrey}/>
    </div>
  )
}
