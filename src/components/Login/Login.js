import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

function Login({ setIsLogged, setCurrentUser }) {
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .loginUser(values.password, values.email)
      .then((res) => {
        if (res) {
          // setShowInfo(true);
          setIsLogged(true);
          // setTextInfo("Входим...");
          setTimeout(() => {
            navigate('/movie', { replace: true });
            // setEmail(values.email);
          }, 2000);
        }
      })
      .catch((err) => {
        // setShowInfo(true);
        setIsLogged(false);
        console.error(err);
      })
      .finally(() => {
        resetForm();
      });
  }

  return (
    <AuthForm
      buttonText={'Войти'}
      titleText={'Рады видеть!'}
      link={'/signup'}
      linkText={'Ещё не зарегистрированы?'}
      linkTitle={'Регистрация'}
      handleSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="email" className="auth-form__label">
        E-mail
      </label>
      <input
        className="auth-form__input"
        required
        id="email"
        name="email"
        type="text"
        placeholder="Почта.."
        value={values.email || ''}
        onChange={handleChange}
      />
      <span className="auth-form__input-error auth-form__email-input-error">{errors.email}</span>
      <label htmlFor="password" className="auth-form__label">
        Пароль
      </label>
      <input
        className="auth-form__input"
        required
        id="password"
        name="password"
        type="password"
        placeholder="Пароль..."
        value={values.password || ''}
        onChange={handleChange}
      />
      <span className="auth-form__input-error auth-form__password-input-error">
        {errors.password}
      </span>
    </AuthForm>
  );
}

export default Login;
