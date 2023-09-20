import React from 'react';
import photo from '../../images/aboutme__photo.png';

function AboutMe() {
  return (
    <section className="aboutme" id="about-me">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__line"></div>
      <div className="aboutme__wrapper">
        <div className="aboutme__description">
          <h3 className="aboutme__name">Максим</h3>
          <h3 className="aboutme__status">Фронтенд-разработчик, 23 года</h3>
          <p className="aboutme__text">
            Родился в городе Кирове. C 2023 года живу в Санкт-Петербурге. До программирования
            работал 2 года SEO-специалистом, продвигая сайты в поисковых системах.
          </p>
          <a className="aboutme__link" href="https://github.com/AliceHab" target="_blank">
            Github
          </a>
        </div>
        <img src={photo} className="aboutme__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
