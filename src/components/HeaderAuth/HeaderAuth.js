import React from "react";
import {Link, useLocation} from 'react-router-dom';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import burger from '../../images/burger.svg';
import Navigation from '../Navigation/Navigation';
import account from '../../images/account.svg';
import './HeaderAuth.css';

export function HeaderAuth () {

  const [activeBurger, setActiveBurger] = React.useState(false);
  const location = useLocation();
  const isLocationMovies = location.pathname === "/movies";
  const isLocationMain = location.pathname === "/";
  const isLocationSavedMovies = location.pathname === "/saved-movies";

  function handleActiveBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className={`header-auth ${isLocationMain ? "header-auth-main" : ""}`}> 
      <div className='header-auth__content'>
        <div className="header-auth__container">
          <Link to="/">
            <img className='header__logo' alt="Лого" src={logo}/>
          </Link>
          <Navigation />
        </div>
        <Link to="/profile" className="header-auth__account">
          <span className="header-auth__text">Аккаунт</span>
          <img className="header-auth__img" alt="Аккаунт" src={account}></img>
        </Link>
        <img className="header-auth__burger"
        onClick={handleActiveBurger} alt="Три полоски" src={burger}></img>
        <div className={`header-auth__burger-menu ${activeBurger ? "header-auth__burger-menu-active" : ""}`}
        >
          <div className="header-auth__burger-content">
          <img className="header-auth__burger-img" alt="Крестик" src={close} onClick={handleActiveBurger}></img>
            <div className="header-auth__burger-conteiner">
              <div className="header-auth__burger-list">
                <Link className={`header-auth__burger-link ${isLocationMain ? "header-auth__burger-link-active" : ""}`} to="/">Главная</Link>
                <Link className={`header-auth__burger-link ${isLocationMovies ? "header-auth__burger-link-active" : ""}`} to="/movies">Фильмы</Link>
                <Link className={`header-auth__burger-link ${isLocationSavedMovies ? "header-auth__burger-link-active" : ""}`} to="/saved-movies">Сохранённые фильмы</Link>
              </div>
              <Link to="/profile" className="header-auth__burger-account">
                <span className="header-auth__burger-text">Аккаунт</span>
                <img className="header-auth__burger-auth-img" alt="Аккаунт" src={account}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

