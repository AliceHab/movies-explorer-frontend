import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { URL_YANDEX_PRACTICUM, URL_GITHUB, FOOTER_COPYRIGHT } from '../../utils/constants';

function Footer() {
  // текущая дата
  const date = new Date();

  const location = useLocation();
  const { pathname } = location;
  const isMovieOrMain = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';

  return (
    <>
      {isMovieOrMain && (
        <footer className="footer">
          <h2 className="footer__copyrigth">{FOOTER_COPYRIGHT}</h2>
          <div className="footer__line"></div>
          <div className="footer__bottom">
            <p className="footer__text">© {date.getFullYear()}</p>
            <div className="footer__links">
              <Link
                className="footer__text"
                to={URL_YANDEX_PRACTICUM}
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </Link>
              <Link className="footer__text" to={URL_GITHUB} target="_blank" rel="noreferrer">
                Github
              </Link>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
