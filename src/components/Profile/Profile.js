import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__line">
          <label for="name" className="profile__label">
            Имя
          </label>
          <input className="profile__input" required id="name" name="name" type="text" dir="rtl" />
        </div>
        <div className="profile__border"></div>
        <div className="profile__line">
          <label for="email" className="profile__label">
            E-mail
          </label>
          <input className="profile__input" required id="email" name="email" type="text" dir="rtl" />
        </div>

        <input type="submit" className="profile__button" value="Редактировать" />
      </form>
      <Link className="profile__back">Выйти из аккаунта</Link>
    </div>
  );
}

export default Profile;
