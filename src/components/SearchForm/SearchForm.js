import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filter';

import { AppContext } from '../../contexts/AppContext';

function SearchForm({ query, setQuery, isShort, setFilerShort, searchHandler }) {
  const [isSearchButtonClicked, setIsSearchButtonClicked] = React.useState(false);

  const handleSearchClick = () => {
    setIsSearchButtonClicked(true);
  };

  React.useEffect(() => {
    if (isSearchButtonClicked) {
      searchHandler();
      setIsSearchButtonClicked(false);
    }
  }, [isSearchButtonClicked]);

  return (
    <section className="search-form">
      <form className="search-form__form" name="search">
        <input
          type="text"
          id="name"
          name="query"
          className="search-form__input"
          placeholder="Фильм"
          onChange={setQuery}
          value={query || ''}
        />
        <input
          className="search-form__search-btn"
          type="submit"
          value="ㅤ"
          onClick={(e) => {
            e.preventDefault();
            handleSearchClick();
          }}
        />
      </form>
      <FilterCheckbox text="Короткометражки" isShort={isShort} setFilerShort={setFilerShort} />
    </section>
  );
}

export default SearchForm;
