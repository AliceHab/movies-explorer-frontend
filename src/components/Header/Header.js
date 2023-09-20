import logo from '../../images/logo.svg';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Header({ active, setActive }) {
  // Выводим компонент на определнных страницах
  const location = useLocation();
  const { pathname } = location;
  const isMovieOrMain =
    pathname === '/movie' ||
    pathname === '/saved-movies' ||
    pathname === '/' ||
    pathname === '/profile';

  // Определяем цвет шапки
  const isLigthTheme = pathname === '/movie' || pathname === '/profile';

  // Запрещает прокручивание, когда открыто меню
  React.useEffect(() => {
    if (active) {
      document.body.classList.add('body_no-scroll');
    } else {
      document.body.classList.remove('body_no-scroll');
    }
  }, [active]);

  const [isActiveBurger, setIsActiveBurger] = React.useState(false);

  const toggleActive = () => {
    setIsActiveBurger(!isActiveBurger);
  };

  // Кнопки и бургер
  const accountBtn = (
    <>
      <a href="/profile">
        <input
          type="submit"
          className={active ? 'header__button_type_account_active' : 'header__button_type_account'}
          value="Аккаунт"
        />
      </a>
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
    <a href="/signin">
      <input
        type="submit"
        className={active ? 'header__button_type_account_active' : 'header__button_type_login'}
        value="Войти"
      />
    </a>
  );
  const registerBtn = (
    <a href="/signup">
      <input type="submit" className="header__button_type_register" value="Регистрация" />
    </a>
  );
  const nonAuthBtn = (
    <div className="header__btn">
      {registerBtn}
      {loginBtn}
    </div>
  );

  // Временна переменная, заменяющая проверку авторизации
  let linkText = '';

  return (
    <>
      {isMovieOrMain && (
        <header className={'header ' + (isLigthTheme ? 'header_theme_ligth' : '')}>
          <a href="/">
            <img src={logo} alt="Лого" className="header__logo" />
          </a>
          {linkText && (
            <nav className={'header__nav ' + (active ? 'header__nav_active' : '')}>
              <ul className="header__list">
                <li>
                  <a href="/" className="header__link-to-main">
                    Главная
                  </a>
                </li>
                <li>
                  <a href="/movie" className="header__links">
                    Фильмы
                  </a>
                </li>
                <li>
                  <a href="/saved-movies" className="header__links">
                    Сохраненные фильмы
                  </a>
                </li>
              </ul>
            </nav>
          )}
          {linkText ? accountBtn : nonAuthBtn}
        </header>
      )}
    </>
  );
}

export default Header;
