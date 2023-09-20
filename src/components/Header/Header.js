import logo from '../../images/logo.svg';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ active, setActive }) {
  // Выводим компонент на определнных страницах
  const location = useLocation();
  const { pathname } = location;
  const isMovieOrMain = pathname === '/movie' || pathname === '/' || pathname === '/profile';

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
      <input
        type="submit"
        className={active ? 'header__button_type_account_active' : 'header__button_type_account'}
        value="Аккаунт"
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
      className={active ? 'header__button_type_account_active' : 'header__button_type_login'}
      value="Войти"
    />
  );
  const registerBtn = (
    <input type="submit" className="header__button_type_register" value="Регистрация" />
  );
  const nonAuthBtn = (
    <div className="header__btn">
      {registerBtn}
      {loginBtn}
    </div>
  );

  // Временна переменная, заменяющая проверку авторизации
  let linkText = 'sdf';

  return (
    <>
      {isMovieOrMain && (
        <header className={'header ' + (isLigthTheme ? 'header_theme_ligth' : '')}>
          <img src={logo} alt="Лого" className="header__logo" />
          {linkText && (
            <nav className={'header__nav ' + (active ? 'header__nav_active' : '')}>
              <ul className="header__list">
                <li>
                  <p className="header__link-to-main">Главная</p>
                </li>
                <li>
                  <p className="header__links">Фильмы</p>
                </li>
                <li>
                  <p className="header__links">Сохраненные фильмы</p>
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
