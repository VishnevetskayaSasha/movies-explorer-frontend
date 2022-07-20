import React from 'react';
import './FilterCheckbox.css';

export function FilterCheckbox() {
  const [isCheckbox, setIsCheckbox ] = React.useState(false);

  function handleCheckbox() {
      isCheckbox ? setIsCheckbox(false) : setIsCheckbox(true);
  }

  return (
    <div className="filter">
      <p className="filter__text">Короткометражки</p>
      <div className="filter__container">
        <input type="checkbox" id="highload1" name="highload1"></input>
        <label htmlFor="highload1" className="label" onClick={handleCheckbox}></label>
      </div>
    </div>
  );
}

