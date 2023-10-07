import React from 'react';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__line"></div>
      <div className="techs__description">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <div className="techs__stack">
        <div className="techs__tech">
          <h4 className="techs__tech-title">HTML</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">CSS</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">JS</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">React</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">Git</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">Express.js</h4>
        </div>
        <div className="techs__tech">
          <h4 className="techs__tech-title">mongoDB</h4>
        </div>
      </div>
    </section>
  );
}

export default Techs;
