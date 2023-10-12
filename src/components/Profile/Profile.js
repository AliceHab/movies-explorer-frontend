import React from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import api from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ updateUserDate }) {
  const currentUser = React.useContext(CurrentUserContext);

  function signOut() {
    api.signOut();
    localStorage.clear();
  }

  const [isEdit, setIsEdit] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [editMessage, setEditMessage] = React.useState('');
  const [editStatus, setEditStatus] = React.useState(false);
  const [isValueSame, setIsValueSame] = React.useState(false);
  const { values, handleChange, errors, isValid, setValues } = useForm({
    email: '',
    name: '',
  });

  function checkValuesForChange() {
    if (values.email !== currentUser.data.email || values.name !== currentUser.data.name) {
      setIsValueSame(true);
    } else {
      setIsValueSame(false);
    }
  }

  React.useEffect(() => {
    checkValuesForChange();
    console.log(isValueSame);
  }, [values.email, values.name]);

  React.useEffect(() => {
    if (currentUser.data) {
      setValues({ name: currentUser.data.name, email: currentUser.data.email });
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    api
      .editUserInfo(values.name, values.email)
      .then((res) => {
        setEditMessage('Данные изменены');
        setEditStatus(true);
        updateUserDate();
      })
      .catch((err) => {
        console.error(err);
        setEditMessage('Произошла ошибка');
        setEditStatus(false);
      });

    setTimeout(() => {
      setIsEdit(false);
      setIsFetching(false);
    }, 1500);
  }

  // Редактировать
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
  // Сохранить
  const editOn = (
    <>
      <span className={editStatus ? 'profile__edit-status_success' : 'profile__edit-status_err'}>
        {editMessage}
      </span>
      <input
        type="submit"
        className={
          'profile__button-save ' +
          (!isValid || !isValueSame ? 'profile__button-save_disabled' : '')
        }
        value="Сохранить"
        disabled={!isValid || isFetching}
      />
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
            className={'profile__input ' + (errors.name ? 'profile__input_err' : '')}
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
            className={'profile__input ' + (errors.email ? 'profile__input_err' : '')}
            required
            id="email"
            name="email"
            type="email"
            pattern="\S+@\S+\.\S+"
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
