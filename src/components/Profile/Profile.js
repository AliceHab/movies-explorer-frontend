import React from 'react';
import { Link } from 'react-router-dom';

const isEdit = false;

const editOff = (
  <>
    <input type="submit" className="profile__button" value="Редактировать" />
    <Link className="profile__back" to="/">
      Выйти из аккаунта
    </Link>
  </>
);
const editOn = (
  <>
    <span className="profile__input-error"></span>
    <input type="submit" className="profile__button-save" value="Сохранить" />
  </>
);

function Profile() {
  return (
    <div className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form" name="profile">
        <div className="profile__line">
          <label htmlFor="name" className="profile__label">
            Имя
          </label>
          <input
            className="profile__input"
            required
            id="name"
            name="name"
            type="text"
            dir="rtl"
            placeholder="...Ваше имя"
          />
        </div>
        <div className="profile__border"></div>
        <div className="profile__line">
          <label htmlFor="email" className="profile__label">
            E-mail
          </label>
          <input
            className="profile__input"
            required
            id="email"
            name="email"
            type="text"
            dir="rtl"
            placeholder="...Ваша почта"
          />
        </div>
      </form>

      {isEdit ? editOn : editOff}
    </div>
  );
}

export default Profile;
