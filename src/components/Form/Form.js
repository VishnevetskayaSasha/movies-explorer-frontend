import React from 'react';
import { NavLink, Link, useLocation,  } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Form.css';

function Form (props) {
  const location = useLocation();
  const islocationPrivateUp = location.pathname === "/signup";
 
 // console.log(props)
  return (
    <div className='form'>
      <div className='form__content'>
        <Link to="/">
              <img className='header__logo header__logo-form' alt="Лого" src={logo}/>
        </Link>
        <h2 className='form__title'>{props.title}</h2>
        <form className="form__main" name={`form_${props.formName}`} onSubmit={props.onSubmit} disabled={props.isFormDisabled} noValidate>
        <div>
        {props.name === 'register' && (
              <>
        <label className='form__label'> Имя </label>
        <input
            type="text"
            id="name"
            name="name"
            className='form__input'
            required  
            minLength="2" 
            maxLength="40"
            value={props.values.name || ""} 
            onChange={props.handleChange}/>
          <span className={`form__error-message ${props.errors.name ? "form__error-message-active" : "" }`}>{props.errors.name}</span>
          </>
            )}
          <label className="form__label"> Email </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form__input" 
            required  
            minLength="2" 
            maxLength="40"
            value={props.values.email || ""} 
            onChange={props.handleChange}/>
          <span className={`form__error-message ${props.errors.email ? "form__error-message-active" : "" }`}>{props.errors.email}</span>
          <label className="form__label"> Пароль </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form__input" 
            required  
            minLength="2" 
            maxLength="40"
            value= {props.values.password || ""}
            onChange={props.handleChange}/>
            <span className={`form__error-message ${props.errors.password ? "form__error-message-active" : "" }`}>{props.errors.password}</span>
          </div>
          {props.isEditError && (
            <p className="profile__message">{props.setMessageErr}</p>
          )}
          <div>
            <button 
              type="submit" 
              disabled={!props.buttonState ? true : ""}
              className={`form__button ${!props.buttonState ? "form__button_inactive" : ""}  ${islocationPrivateUp ? "form__button-up" : "form__button-in"}`}
              >
              {props.buttonText} 
            </button>
           
            <p className='form__text'>
              {props.text}
              <NavLink to={props.rout} className="form__link">
                    {props.lintText}
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Form;

