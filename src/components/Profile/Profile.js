import React from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);

  function signOut() {
    api.signOut();
    localStorage.clear();
  }

  const [isEdit, setIsEdit] = React.useState(false);

  const { values, handleChange, setValues } = useForm({
    email: '',
    name: '',
  });

  React.useEffect(() => {
    if (currentUser.data) {
      setValues({ name: currentUser.data.name, email: currentUser.data.email });
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    api.editUserInfo(values.name, values.email).catch((err) => {
      console.error(err);
    });

    setIsEdit(false);
  }

  const editOff = (
    <>
      <input
        type="button"
        className="profile__button"
        value="Редактировать"
        onClick={() => setIsEdit(true)}
      />
      <Link className="profile__back" to="/" onClick={signOut}>
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

  return (
    <div className="profile">
      <h1 className="profile__title">Привет, {currentUser?.data?.name || ''}!</h1>
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
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
            onChange={handleChange}
            value={values.name || ''}
            disabled={!isEdit && 'disabled'}
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
            onChange={handleChange}
            value={values.email || ''}
            disabled={!isEdit && 'disabled'}
          />
        </div>
        {isEdit ? editOn : editOff}
      </form>
    </div>
  );
}

export default Profile;
