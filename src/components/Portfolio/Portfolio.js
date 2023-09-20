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
        >
          Статичный сайт
        </a>
        <div className="portfolio__arrow">↗</div>
      </div>
      <div className="portfolio__block">
        <a
          className="portfolio__link"
          href="https://github.com/AliceHab/russian-travel"
          target="_blank"
        >
          Адаптивный сайт
        </a>
        <div className="portfolio__arrow">↗</div>
      </div>
      <div className="portfolio__block">
        <a
          className="portfolio__link"
          href="https://github.com/AliceHab/react-mesto-auth"
          target="_blank"
        >
          Одностраничное приложение
        </a>
        <div className="portfolio__arrow">↗</div>
      </div>
    </section>
  );
}

export default Portfolio;
