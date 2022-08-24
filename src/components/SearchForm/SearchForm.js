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

  // const isLocationMovies = useLocation().pathname === '/movies';
  
  // function handelIsSearchMovies(evt) {
  //     if (isLocationMovies) {
  //         props.setSearchMovies(evt.target.value);
  //     } else {
  //       props.onGetMovies();
  //       props.setSearchSavedMovies(evt.target.value);
  //     }
  // }

  // function handleSubmit(evt) {
      
  //     evt.preventDefault();

  //     if (isLocationMovies) {
  //         if (!props.searchMovies ) {
  //             props.setMessageSearchResult(NOT_WORD_MOWIES);
  //             return;
  //         }
  //     } else {
  //         if (!props.searchSavedMovies ) {
  //             props.setMessageSearchResult(NOT_WORD_MOWIES);
  //             return;
  //         }
  //     }
  //     props.setMessageSearchResult(null);
  //     props.setIsPreloader(true);
  //     props.onGetMovies();
  //     setTimeout(() =>  props.setIsPreloader(false), 700);
  //   }

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
    onSubmit?.(searchValue, isShortMovies)
  }
  
  return (
    <div className="search">
      <div className="search__content">
      <form onSubmit={handleSubmit} name="search-films" className="search__form">
        <div className="search__container">
          <input 
            id="search" 
            name="search" 
            type="text" 
            className="search__input"
            value={searchValue}
            required
            onChange={handleInputChange}
            minLength={2}
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
      <img className='line-grey' alt="Линия" src={lineGrey}/>
    </div>
  )
}
