import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import { useValidaty } from '../../utils/useValidaty';

export function Register(props) {
  const {values, isValid, errors,  handleChange, resetForm} = useValidaty();
    const [isInputs, setisInputs] = React.useState(false);


    React.useEffect(() => {
        resetForm();
    },// eslint-disable-next-line
    []);

    React.useEffect(() => {
        checkInputs();
    },// eslint-disable-next-line
    [values]);

    function checkInputs () {
        if ((values.name && values.email && values.password) !== undefined) {
            setisInputs(true);
        } else {
            setisInputs(false);
        }
    }

    function handleRegister(evt) {
        evt.preventDefault();
        props.setIsAuth(true);
        props.handleIsRegister({name: values.name, email: values.email, password: values.password});
    }

   // console.log(props)
    
  return (
    <section className='register'>
      <Form
        name='register'
        formName="register"
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        text='Уже зарегистрированы?'
        onSubmit={handleRegister}
        className='auth__container_signin'
        rout='/signin'
        lintText='Войти'
        values={values}
        handleChange={handleChange}
        isAuth={props.isAuth}
        isFormDisabled={props.isFormDisabled}
        buttonState={ isInputs ? isValid : false}
        isEditError={props.isEditError}
        setMessageErr={props.setMessageErr}
        errors={errors}
      />
    </section>
  )
}