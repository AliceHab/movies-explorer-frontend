import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <div className="movies-card-list__divider"></div>
    </>
  );
}

export default SavedMovies;
