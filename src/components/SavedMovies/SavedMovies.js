import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import api from '../../utils/MainApi';
import useForm from '../../hooks/useForm';
import filterMovies from '../../utils/filter';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = React.useState({});
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isShort, setIsShort] = React.useState(false);
  const { values, handleChange, setValues } = useForm({
    query: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  function getSavedMovies() {
    setIsLoading(true);
    setError('');

    api
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }

  function searchSavedMovies() {
    setFilteredMovies(filterMovies(savedMovies, values.query, isShort));
  }

  function setLocalStorage() {
    localStorage.setItem('querySavedMovie', values.query);
    localStorage.setItem('isShortSavedMovie', isShort);
  }

  function getLocalStorage() {
    const localStorageQuery = localStorage.getItem('querySavedMovie');
    const localStorageIsShort = localStorage.getItem('isShortSavedMovie');

    localStorageQuery && setValues({ query: localStorageQuery });
    localStorageIsShort && setIsShort(localStorageIsShort);
  }

  React.useEffect(() => {
    searchSavedMovies();
  }, [savedMovies]);

  console.log(savedMovies, filteredMovies, 'eh');

  React.useEffect(() => {
    getSavedMovies();
    getLocalStorage();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    setTimeout(() => setLocalStorage(), 500);
  }, [values.query, isShort]);

  return (
    <>
      <SearchForm
        query={values.query}
        setQuery={handleChange}
        isShort={isShort}
        setFilerShort={setIsShort}
        searchHandler={searchSavedMovies}
      />
      {isLoading ? (
        <Preloader error={error} />
      ) : (
        <MoviesCardList refreshList={getSavedMovies} filteredMovies={filteredMovies} />
      )}
      <div className="movies-card-list__divider"></div>
    </>
  );
}

export default SavedMovies;
