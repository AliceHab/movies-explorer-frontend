import React from 'react';
import { Link } from 'react-router-dom';
import { URL_HOW_TO_LEARN, URL_RUSSIAN_TRAVEL, URL_MESTO } from '../../utils/constants';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__block">
        <Link className="portfolio__link" to={URL_HOW_TO_LEARN} target="_blank" rel="noreferrer">
          Статичный сайт
        </Link>
      </div>
      <div className="portfolio__block">
        <Link className="portfolio__link" to={URL_RUSSIAN_TRAVEL} target="_blank" rel="noreferrer">
          Адаптивный сайт
        </Link>
      </div>
      <div className="portfolio__block">
        <Link className="portfolio__link" to={URL_MESTO} target="_blank" rel="noreferrer">
          Одностраничное приложение
        </Link>
      </div>
    </section>
  );
}

export default Portfolio;
