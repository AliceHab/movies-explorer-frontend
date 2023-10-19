import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

function Login({ setIsLogged, isLoggedIn }) {
  React.useEffect(() => {
    if (isLoggedIn === true) {
      navigate('/movies', { replace: true });
    }
  }, [isLoggedIn]);

  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    api
      .loginUser(values.password, values.email)
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setTimeout(() => {
            navigate('/movies', { replace: true });
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLogged(false);
        console.error(err);
      })
      .finally(() => {
        resetForm();
        setIsFetching(false);
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
      isFetching={isFetching}
    >
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

export default Login;
