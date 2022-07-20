import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

export function Header () {
  return (
    <header className='header'>
      <div className='header__content'>
        <Link to="/">
          <img className='header__logo' alt="Лого" src={logo}/>
        </Link>
        <div className='header__auth'>
          <Link className='header__link' to="/signup">
            Регистрация
          </Link>
          <Link className='header__link' to="/signin">
            <button type='submit' className='header__button'>
              Войти
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}



