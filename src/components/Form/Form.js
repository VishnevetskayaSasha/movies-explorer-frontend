import React from 'react';
import { NavLink, Link, useLocation,  } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Form.css';

function Form (props) {
  const [ values, setValues ] = React.useState({});
  const location = useLocation();
  const islocationPrivateUp = location.pathname === "/signup";
  const [isCorrectly, setIsCorrectly] = React.useState(true);

    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setValues({...values, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit({name: values.name, email: values.email, password: values.password})
    } 

  return (
    <div className='form'>
      <Link to="/">
            <img className='header__logo header__logo-form' alt="Лого" src={logo}/>
      </Link>
      <h2 className='form__title'>{props.title}</h2>
      <form className="form__main" name={`form_${props.formName}`} onSubmit={handleSubmit} >
      <div>
      {props.name === 'register' && (
            <>
      <label className='form__label'> Имя </label>
      <input
          type="name"
          id="name"
          name="name"
          className='form__input'
          required  
          minLength="2" 
          maxLength="40"
          value={values.name || ""} 
          onChange={handleChange}/>
        <span className={`form__error-message ${!isCorrectly ? "form__error-message-active" : "" }`}>Что-то пошло не так...</span>
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
          value={values.email || ""} 
          onChange={handleChange}/>
        <span className={`form__error-message ${!isCorrectly ? "form__error-message-active" : "" }`}>Что-то пошло не так...</span>
        <label className="form__label"> Пароль </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input" 
          required  
          minLength="2" 
          maxLength="40"
          value= {values.password || ""}
          onChange={handleChange}/>
          <span className={`form__error-message ${!isCorrectly ? "form__error-message-active" : "" }`}>Что-то пошло не так...</span>
        </div>
        <div>
          <button 
            type="submit" 
            className={`form__button ${islocationPrivateUp ? "form__button-up" : "form__button-in"}`}>
            {props.buttonText}
          </button>
          {props.errorMessage && <p className='form_error-message'>{props.errorMessage}</p>}
          <p className='form__text'>
            {props.text}
            <NavLink to={props.rout} className="form__link">
                  {props.lintText}
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  )
}
export default Form;

