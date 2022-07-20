import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation () {
  return (
    <div className="navigation">
        <Link className="navigation__link" to="/movies">Фильмы</Link>
        <Link className="navigation__link" to="/saved-movies">Сохранённые фильмы</Link>
    </div>
  )
}

export default Navigation;

