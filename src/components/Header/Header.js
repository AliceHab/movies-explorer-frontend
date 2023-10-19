import logo from '../../images/logo.svg';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Лого" className="header__logo" />
    </Link>
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
    pathname === '/movies' || pathname === '/profile' || pathname === '/saved-movies';

  // Выводим на определенных страницах
  const isMovieOrMain =
    pathname === '/movies' ||
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
                  <Link
                    to="/movies"
                    className={'header__links ' + (isLightTheme ? 'header__links_theme_light' : '')}
                  >
                    Фильмы
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-movies"
                    className={'header__links ' + (isLightTheme ? 'header__links_theme_light' : '')}
                  >
                    Сохраненные фильмы
                  </Link>
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
