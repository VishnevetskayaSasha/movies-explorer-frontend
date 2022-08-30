import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useValidaty } from '../../utils/useValidaty';

export function Login(props) {
  //console.log(props)
  const {values, errors, isValid, handleChange, resetForm} = useValidaty();
  const [isInputs, setisInputs] = React.useState(false);
  //const [disabled, setDisabled] = React.useState(true);

    React.useEffect(() => {
        resetForm();
    },// eslint-disable-next-line
    []);

    React.useEffect(() => {
       checkInputs()
   },// eslint-disable-next-line
   [values]);

    function checkInputs () {
        if  ((values.email && values.password) !== undefined) {
            setisInputs(true);
        } else {
            setisInputs(false);
        }
        
    }
    
    function handleLogin(evt) {
        evt.preventDefault();
        props.handleIsLogin({email: values.email, password: values.password}); 
        
    }

  return (
    <section className='login'>
      <Form
        name='login'
        formName="login"
        title='Рады видеть!'
        buttonText='Войти'
        text='Еще не зарегистрированы?'
        onSubmit={handleLogin}
        className='auth__container_signin'
        rout='/signup'
        lintText='Регистрация'
        values={values}
        errors={errors}
        handleChange={handleChange}
        isAuth={props.isAuth}
        isFormDisabled={props.isFormDisabled}
        buttonState={ isInputs ? isValid : false}
        isEditError={props.isEditError}
        setMessageErr={props.setMessageErr}
      />
    </section>
  )
}