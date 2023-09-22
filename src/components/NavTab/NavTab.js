import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

function NavTab() {
  return (
    <section className="nav-tab">
      <nav>
        <ul className="nav-tab__list">
          <li>
            <ScrollLink
              to="about-project"
              smooth={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="nav-tab__link"
            >
              О проекте
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="techs"
              smooth={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="nav-tab__link"
            >
              Технологии
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about-me"
              smooth={true}
              smooth={true}
              hashSpy={true}
              offset={50}
              duration={500}
              className="nav-tab__link"
            >
              Студент
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
