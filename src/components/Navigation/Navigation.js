import React from "react";
import {  NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation () {

  return (
    <div className="navigation">
        <NavLink className="navigation__link" to="/movies">Фильмы</NavLink>
        <NavLink className="navigation__link" to="/saved-movies">Сохранённые фильмы</NavLink>
    </div>
  )
}

export default Navigation;

