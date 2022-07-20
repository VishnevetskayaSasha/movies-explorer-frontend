import React from 'react';
import './Login.css';
import Form from '../Form/Form';

export function Login(props) {
  return (
    <section className='login'>
      <Form
        name='login'
        formName="login"
        title='Рады видеть!'
        buttonText='Войти'
        text='Еще не зарегистрированы?'
        onSubmit={props.onSubmit}
        className='auth__container_signin'
        rout='/signup'
        lintText='Регистрация'
      />
    </section>
  )
}