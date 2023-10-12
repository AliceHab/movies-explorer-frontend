import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  DESKTOP_CARD_NUMBER,
  TABLET_CARD_NUMBER,
  MOBILE_CARD_NUMBER,
  DESKTOP_ADD_MORE_CARD,
  TABLED_AND_MOBILE_ADD_MORE_CARD,
} from '../../utils/constants';

function MoviesCardList({ savedMovies, refreshList, filteredMovies, getSavedMovies }) {
  let resizeTimeout;

  const location = useLocation();
  const { pathname } = location;
  const isMovie = pathname === '/movies';
  const [pageWidth, setPageWidth] = React.useState(document.documentElement.scrollWidth);
  const [itemsToShow, setItemsToShow] = React.useState(0);
  const [itemsToAddMore, setItemsToAddMore] = React.useState(0);

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
      setPageWidth(document.documentElement.scrollWidth);
    }, 300);
  });

  React.useEffect(() => {
    function updateCards() {
      if (pageWidth >= DESKTOP_SCREEN_WIDTH) {
        setItemsToShow(DESKTOP_CARD_NUMBER);
      } else if (pageWidth >= TABLET_SCREEN_WIDTH) {
        setItemsToShow(TABLET_CARD_NUMBER);
      } else {
        setItemsToShow(MOBILE_CARD_NUMBER);
      }
    }

    updateCards();
  }, []);

  React.useEffect(() => {
    function updateCards() {
      let newItemsToAddMore;
      if (pageWidth >= DESKTOP_SCREEN_WIDTH) {
        newItemsToAddMore = DESKTOP_ADD_MORE_CARD;
      } else if (pageWidth >= TABLET_SCREEN_WIDTH) {
        newItemsToAddMore = TABLED_AND_MOBILE_ADD_MORE_CARD;
      } else {
        newItemsToAddMore = TABLED_AND_MOBILE_ADD_MORE_CARD;
      }
      setItemsToAddMore(newItemsToAddMore);

      // Заполняем пустоту в ряду, если появляется разрыв
      const remainder = itemsToShow % newItemsToAddMore;
      if (remainder > 0) {
        setItemsToShow(itemsToShow + newItemsToAddMore - remainder);
      }
    }

    updateCards();
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
