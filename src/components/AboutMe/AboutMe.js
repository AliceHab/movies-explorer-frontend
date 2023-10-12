import React from 'react';
import photo from '../../images/aboutme__photo.png';
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__wrapper">
        <div className="about-me__description">
          <h3 className="about-me__name">Максим</h3>
          <h4 className="about-me__status">Фронтенд-разработчик, 23 года</h4>
          <p className="about-me__text">
            Родился в городе Кирове. C 2023 года живу в Санкт-Петербурге. До программирования
            работал 2 года SEO-специалистом, продвигая сайты в поисковых системах.
          </p>
          <Link
            className="about-me__link"
            to="https://github.com/AliceHab"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </Link>
        </div>
        <img src={photo} className="about-me__photo" alt="Максим Ефремов" />
      </div>
    </section>
  );
}

export default AboutMe;
