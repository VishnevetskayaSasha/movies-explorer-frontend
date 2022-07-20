import React from 'react';
import './Register.css';
import Form from '../Form/Form';

export function Register(props) {
  return (
    <section className='register'>
      <Form
        name='register'
        formName="register"
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        text='Уже зарегистрированы?'
        onSubmit={props.onSubmit}
        className='auth__container_signin'
        rout='/signin'
        lintText='Войти'
      />
    </section>
  )
}