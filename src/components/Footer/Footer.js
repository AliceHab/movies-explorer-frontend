import React from 'react';
import { useLocation } from 'react-router-dom';

// текущая дата
const date = new Date();

function Footer() {
  const location = useLocation();
  const { pathname } = location;
  const isMovieOrMain = pathname === '/movie' || pathname === '/saved-movies' || pathname === '/';

  return (
    <>
      {isMovieOrMain && (
        <footer className="footer">
          <p className="footer__copyrigth">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__line"></div>
          <div className="footer__bottom">
            <p className="footer__text">© {date.getFullYear()}</p>
            <div className="footer__links">
              <a
                className="footer__text"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
              <a
                className="footer__text"
                href="https://github.com/AliceHab"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
