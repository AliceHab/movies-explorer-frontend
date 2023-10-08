import logo from '../../images/logo.svg';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Logo = () => {
  return (
    <a href="/">
      <img src={logo} alt="Лого" className="header__logo" />
    </a>
  );
};

const handleClickRedirect = (url) => {
  window.location.href = url;
};

function Header({ active, setActive, isLoggedIn }) {
  const toggleActive = () => {
    setActive(!active);
  };

  const location = useLocation();
  const { pathname } = location;

  // Определяем цвет шапки
  const isLightTheme =
    pathname === '/movie' || pathname === '/profile' || pathname === '/saved-movies';

  // Выводим на определенных страницах
  const isMovieOrMain =
    pathname === '/movie' ||
    pathname === '/saved-movies' ||
    pathname === '/' ||
    pathname === '/profile';

  // Кнопки и бургер
  const accountBtn = (
    <>
      <input
        type="submit"
        className={'header__button-account'}
        value="Аккаунт"
        onClick={() => handleClickRedirect('/profile')}
      />
      <div
        className={`header__burger ${active ? 'header__burger_active' : ''} ${
          isLightTheme ? 'header__burger_light' : 'header__burger_dark'
        }`}
        onClick={toggleActive}
      >
        <span
          className={`header__burger-line ${
            isLightTheme ? 'header__burger-line_light' : 'header__burger-line_dark'
          }`}
        ></span>
      </div>
    </>
  );

  const loginBtn = (
    <input
      type="submit"
      className={active ? 'header__button-account_active' : 'header__button-login'}
      value="Войти"
      onClick={() => handleClickRedirect('/signin')}
    />
  );

  const registerBtn = (
    <input
      type="submit"
      className="header__button-register"
      value="Регистрация"
      onClick={() => handleClickRedirect('/signup')}
    />
  );

  const nonAuthBtn = (
    <div className="header__btn">
      {registerBtn}
      {loginBtn}
    </div>
  );

  // // Временна переменная, заменяющая проверку авторизации
  // let linkText = '';

  return (
    <>
      {isMovieOrMain && (
        <header className={'header ' + (isLightTheme ? 'header_theme_ligth' : '')}>
          <Logo />
          {isLoggedIn && (
            <nav className="header__nav">
              <ul className="header__list">
                <li>
                  <a
                    href="/movie"
                    className={'header__links ' + (isLightTheme ? 'header__links_theme_light' : '')}
                  >
                    Фильмы
                  </a>
                </li>
                <li>
                  <a
                    href="/saved-movies"
                    className={'header__links ' + (isLightTheme ? 'header__links_theme_light' : '')}
                  >
                    Сохраненные фильмы
                  </a>
                </li>
              </ul>
            </nav>
          )}
          {isLoggedIn ? accountBtn : nonAuthBtn}
        </header>
      )}
    </>
  );
}

export default Header;
