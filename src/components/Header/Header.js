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

function Header({ active, setActive }) {
  const location = useLocation();
  const { pathname } = location;

  // Определяем цвет шапки
  const isLightTheme =
    pathname === '/movie' || pathname === '/profile' || pathname === '/saved-movies';

  // Открытие меню
  const [isActiveBurger, setIsActiveBurger] = React.useState(false);

  const toggleActive = () => {
    setIsActiveBurger(!isActiveBurger);
  };

  // Выводим на определенных страницах
  const isMovieOrMain =
    pathname === '/movie' ||
    pathname === '/saved-movies' ||
    pathname === '/' ||
    pathname === '/profile';

  // Запрещает прокручивание, когда открыто меню
  React.useEffect(() => {
    if (active) {
      document.body.classList.add('body_no-scroll');
    } else {
      document.body.classList.remove('body_no-scroll');
    }
  }, [active]);

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
        className={`header__burger ${isActiveBurger ? 'active' : ''}`}
        onClick={() => {
          setActive(!active);
          toggleActive();
        }}
      >
        <span className="header__burger-line"></span>
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

  // Временна переменная, заменяющая проверку авторизации
  let linkText = 'ит';

  return (
    <>
      {isMovieOrMain && (
        <header className={'header ' + (isLightTheme ? 'header_theme_ligth' : '')}>
          <Logo />
          {linkText && (
            <nav className={'header__nav ' + (active ? 'header__nav_active' : '')}>
              <ul className="header__list">
                <li>
                  <a
                    href="/"
                    className={
                      'header__links_main ' + (isLightTheme ? 'header__links_theme_light' : '')
                    }
                  >
                    Главная
                  </a>
                </li>
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
              <input
                type="submit"
                className={
                  'header__button-account-nav ' +
                  (active ? 'header__button-account-nav_active' : 'header__button-account-nav')
                }
                value="Аккаунт"
                onClick={() => handleClickRedirect('/profile')}
              />
            </nav>
          )}
          {linkText ? accountBtn : nonAuthBtn}
        </header>
      )}
    </>
  );
}

export default Header;
