import React from 'react';
import './Profile.css';
import { HeaderAuth } from "../HeaderAuth/HeaderAuth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidaty } from '../../utils/useValidaty';

export function Profile(props) {
  const {values, isValid, setValues, errors,  handleChange, resetForm} = useValidaty();
  const currentUser = React.useContext(CurrentUserContext);
  const [isInputs, setisInputs] = React.useState(false);

  const { email, name } = values;

  React.useEffect(() => {
    setValues({
      email: currentUser.email,
      name: currentUser.name,
    });
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateProfile(name, email);
  };

  React.useEffect(() => {
    const { name, email } = values;
    if (
      isValid &&
      (currentUser.name !== name || currentUser.email !== email)
    )  {
      setisInputs(false);
    } else {
      setisInputs(true);
    }
  }, [currentUser, values]);

  console.log()
  return (
      <section className="profile">
        <HeaderAuth />
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" name='profile' disabled={props.isFormDisabled}
               onSubmit={handleSubmit}>
            <label className="profile__label">
              <span className="profile__name">Имя</span>
              <input
                className="profile__input"
                name="name"
                type="name"
                onChange={handleChange}
                value={name || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className={`form__error-message ${errors.name  ? "form__error-message-active" : "" }`}>{errors.name}</span>
            <label className="profile__label">
              <span className="profile__name">E-mail</span>
              <input
                className="profile__input"
                name="email"
                type="email"
                onChange={handleChange}
                value={email || ''}
                minLength="2"
                maxLength="40"
                required
              />
            </label>
            <span className={`form__error-message ${errors.email ? "form__error-message-active" : "" }`}>{errors.email}</span>
            {props.isEditError && (
            <p className="profile__message">{props.setMessageProfile}</p>
          )}
          {props.isEditDone && (
            <p className="profile__message">{props.setMessageProfile}</p>
          )}
            <button
              disabled={!(isInputs ? false : isValid) ? true : ""}
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

 