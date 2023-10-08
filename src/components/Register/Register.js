import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

function Register() {
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [fetchError, setFetchError] = React.useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    api
      .registerUser(values.password, values.email, values.name)
      .then((res) => {
        if (res) {
          // setIsRegister(true);
          // console.log(res);
          setTimeout(() => {
            navigate('/signin', { replace: true });
          }, 2000);
        }
      })
      .catch((err) => {
        // setIsRegister(false);
        setFetchError(err);
        console.error(err);
      })
      .finally(() => {
        resetForm();
      });
  }

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      buttonText={'Зарегистрироваться'}
      titleText={'Добро пожаловать!'}
      link={'/signin'}
      linkText={'Уже зарегистрированы?'}
      linkTitle={'Войти'}
      isValid={isValid}
      fetchError={fetchError}
    >
      <label htmlFor="name" className="auth-form__label">
        Имя
      </label>
      <input
        className="auth-form__input"
        required
        id="name"
        name="name"
        type="text"
        placeholder="Имя..."
        value={values.name || ''}
        onChange={handleChange}
        pattern="[a-zA-Zа-яА-Я\s\-]+"
      />
      <span className="auth-form__input-error auth-form__name-input-error">{errors.name}</span>
      <label htmlFor="email" className="auth-form__label">
        E-mail
      </label>
      <input
        className="auth-form__input"
        required
        id="email"
        name="email"
        type="email"
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

export default Register;
