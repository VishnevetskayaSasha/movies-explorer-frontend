import React from "react";
import "./SearchForm.css";
import search from '../../images/search.svg';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import lineGrey from '../../images/line-grey.svg';

export function SearchForm () {
  function handleSubmit(evt) {
    evt.preventDefault();
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
            required
            minLength="2"
            placeholder="Фильм"
          />
          <button
            type="submit"
            className="search__button"
          ><img className='search__img' alt="Поиск" src={search}/>
          </button>
        </div>
      </form> 
      <FilterCheckbox />
      </div>
      <img className='line-grey' alt="Линия" src={lineGrey}/>
    </div>
  )
}
