import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__block">
        <a
          className="portfolio__link"
          href="https://github.com/AliceHab/how-to-learn"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
      </div>
      <div className="portfolio__block">
        <a
          className="portfolio__link"
          href="https://github.com/AliceHab/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
      </div>
      <div className="portfolio__block">
        <a
          className="portfolio__link"
          href="https://github.com/AliceHab/react-mesto-auth"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
