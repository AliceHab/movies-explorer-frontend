import React from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <AuthForm
      buttonText={'Зарегистрироваться'}
      titleText={'Добро пожаловать!'}
      link={'/signin'}
      linkText={'Уже зарегистрированы?'}
      linkTitle={'Войти'}
    >
      <label htmlFor="name" className="auth-form__label">
        Имя
      </label>
      <input className="auth-form__input" required id="name" name="name" type="text" placeholder="Имя..."/>
      <span className="auth-form__input-error auth-form__name-input-error"></span>
      <label htmlFor="email" className="auth-form__label">
        E-mail
      </label>
      <input className="auth-form__input" required id="email" name="email" type="text" placeholder="Почта.."/>
      <span className="auth-form__input-error auth-form__email-input-error"></span>
      <label htmlFor="password" className="auth-form__label">
        Пароль
      </label>
      <input className="auth-form__input" required id="password" name="password" type="password" placeholder="Пароль..."/>
      <span className="auth-form__input-error auth-form__password-input-error"></span>
    </AuthForm>
  );
}

export default Register;
