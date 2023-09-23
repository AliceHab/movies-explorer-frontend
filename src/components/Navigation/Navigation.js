import React from 'react';

const handleClickRedirect = (url) => {
  window.location.href = url;
};

function Navigation({ isOpen }) {
  // Запрещает прокручивание, когда открыто меню
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body_no-scroll');
    } else {
      document.body.classList.remove('body_no-scroll');
    }
  }, [isOpen]);

  return (
    <nav className={`navigation ${isOpen ? 'navigation_opened' : ''}`}>
      <div className="navigation__wrapper">
        <ul className="navigation__list">
          <li>
            <a href="/" className={'navigation__links'}>
              Главная
            </a>
          </li>
          <li>
            <a href="/movie" className={'navigation__links'}>
              Фильмы
            </a>
          </li>
          <li>
            <a href="/saved-movies" className={'navigation__links'}>
              Сохраненные фильмы
            </a>
          </li>
        </ul>
        <input
          type="submit"
          className={'navigation__button-account-nav'}
          value="Аккаунт"
          onClick={() => handleClickRedirect('/profile')}
        />
      </div>
    </nav>
  );
}

export default Navigation;
