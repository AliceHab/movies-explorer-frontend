import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

function Register({ setIsLogged, isLoggedIn }) {
  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/movies', { replace: true });
    }
  }, [isLoggedIn]);

  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [isFetching, setIsFetching] = React.useState(false);
  const [fetchError, setFetchError] = React.useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    api
      .registerUser(values.password, values.email, values.name)
      .then((res) => {
        if (res) {
          api
            .loginUser(values.password, values.email)
            .then((res) => {
              if (res) {
                setIsLogged(true);
                resetForm();
                setTimeout(() => {
                  navigate('/movies', { replace: true });
                }, 2000);
              }
            })
            .catch((err) => {
              setIsLogged(false);
              console.error(err);
            })
            .finally(() => {});
        }
        resetForm();
      })
      .catch((err) => {
        setFetchError(err);
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
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
      isFetching={isFetching}
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
        pattern="\S+@\S+\.\S+"
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
