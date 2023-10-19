import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardsToRender, cardsToAddMore } from '../../utils/resizeCardsList';

function MoviesCardList({
  savedMovies,
  refreshList,
  filteredMovies,
  getSavedMovies,
  setSavedMovies,
}) {
  let resizeTimeout;
  const location = useLocation();
  const { pathname } = location;
  const isMovie = pathname === '/movies';
  const [pageWidth, setPageWidth] = React.useState(document.documentElement.clientWidth);
  const [itemsToShow, setItemsToShow] = React.useState(0);
  const [itemsToAddMore, setItemsToAddMore] = React.useState(0);

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      setPageWidth(document.documentElement.scrollWidth);
    }, 300);
  });

  console.log(pageWidth);

  React.useEffect(() => {
    cardsToRender(pageWidth, setItemsToShow);
  }, [filteredMovies]);

  React.useEffect(() => {
    cardsToAddMore(pageWidth, setItemsToAddMore, itemsToShow, setItemsToShow);
  }, [pageWidth]);

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
                getSavedMovies={getSavedMovies}
                filteredMovies={filteredMovies}
                setSavedMovies={setSavedMovies}
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
