import React from 'react';
import './Profile.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth";
import { NavLink } from 'react-router-dom';



export function Profile(props) {
  const currentUser = {
    'name': 'Caша',
    'email': 'Sasha@gmail.com'
  };
  const [ values, setValues ] = React.useState({});
  const [isCorrectly, setIsCorrectly] = React.useState(true);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setValues({...values, [name]: value });
}

function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({name: values.name, email: values.email})
} 

  return (
      <section className="profile">
        <HeaderAuth />
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" name='profile' onSubmit={handleSubmit}>
            <label className="profile__label">
              <span className="profile__name">Имя</span>
              <input
                className="profile__input"
                name="name"
                type="name"
                onChange={handleChange}
                value={currentUser.name || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className={`form__error-message ${!isCorrectly ? "form__error-message-active" : "" }`}>Что-то пошло не так...</span>
            <label className="profile__label">
              <span className="profile__name">E-mail</span>
              <input
                className="profile__input"
                name="email"
                type="email"
                onChange={handleChange}
                value={currentUser.email || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className={`form__error-message ${!isCorrectly ? "form__error-message-active" : "" }`}>Что-то пошло не так...</span>
            <button
              type="submit"
              className='profile__button'>
              Редактировать
            </button>
          </form>
          <button type="button" className="profile__button profile__button-out" onClick={props.onSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    );
  }
