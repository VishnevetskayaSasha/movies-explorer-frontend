import React from 'react';
import './FilterCheckbox.css';

export function FilterCheckbox({
  onChange,
  isChecked,
}) {
  const handleChange = () => {
    onChange(!isChecked)
  }
  return (
    <div className="filter">
      <p className="filter__text">Короткометражки</p>
      <div className="filter__container">
        <button className={`filter__label ${isChecked ? "filter__label-active" : ""}`} onClick={handleChange} ></button>
      </div>
    </div>
  );
}

