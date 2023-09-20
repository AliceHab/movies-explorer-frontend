import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// текущая дата
const date = new Date();

function Footer() {
  const location = useLocation();
  const { pathname } = location;
  const isMovieOrMain = pathname === '/movie' || pathname === '/';

  return (
    <>
      {isMovieOrMain && (
        <footer className="footer">
          <p className="footer__copyrigth">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__line"></div>
          <div className="footer__bottom">
            <p className="footer__text">© {date.getFullYear()}</p>
            <div className="footer__links">
              <a className="footer__text" href="https://practicum.yandex.ru/" target="_blank">
                Яндекс.Практикум
              </a>
              <a className="footer__text">Github</a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
