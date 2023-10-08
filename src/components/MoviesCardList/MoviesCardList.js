import React from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

let pageWidth = document.documentElement.scrollWidth;
let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    pageWidth = document.documentElement.scrollWidth;
  }, 30000);
});

function MoviesCardList({ savedMovies, refreshList, filteredMovies }) {
  const location = useLocation();
  const { pathname } = location;
  const isMovie = pathname === '/movie';

  const [itemsToShow, setItemsToShow] = React.useState(0);
  const [itemsToAddMore, setItemsToAddMore] = React.useState(0);

  React.useEffect(() => {
    function updateCards() {
      if (pageWidth >= 1280) {
        setItemsToShow(16);
        setItemsToAddMore(4);
      } else if (pageWidth >= 768) {
        setItemsToShow(8);
        setItemsToAddMore(2);
      } else {
        setItemsToShow(5);
        setItemsToAddMore(2);
      }
    }

    updateCards();
  }, []);

  function showMore() {
    if (filteredMovies.length > itemsToShow) {
      setItemsToShow(itemsToShow + itemsToAddMore);
    }
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {filteredMovies &&
          filteredMovies.length > 0 &&
          filteredMovies.slice(0, itemsToShow).map((movie) => {
            return (
              <MoviesCard
                card={movie}
                key={movie.id || movie._id}
                savedMovies={savedMovies}
                refreshList={refreshList}
              />
            );
          })}
      </ul>
      {isMovie &&
        filteredMovies &&
        (filteredMovies.length > itemsToShow ? (
          <button className="movies-card-list__btn-more" type="button" onClick={showMore}>
            Ещё
          </button>
        ) : (
          <div className="movies-card-list__divider"></div> // пустой разделитель
        ))}
    </section>
  );
}

export default MoviesCardList;
