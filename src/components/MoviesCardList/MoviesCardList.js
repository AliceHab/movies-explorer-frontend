import React from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const location = useLocation();
  const { pathname } = location;

  const isMovie = pathname === '/movie';

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      {isMovie && (
        <button className="movies-card-list__btn-more" type="button">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
