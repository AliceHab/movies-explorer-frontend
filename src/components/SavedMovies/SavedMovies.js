import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import api from '../../utils/MainApi';
import useForm from '../../hooks/useForm';
import { filterMovies, filterByDuration } from '../../utils/filter';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = React.useState({});
  const [unfilteredMovies, setUnfilteredMovies] = React.useState([]);
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
    setFilteredMovies(filterMovies(savedMovies, values.query));
    setUnfilteredMovies(filterMovies(savedMovies, values.query));
  }

  React.useEffect(() => {
    if (String(isShort) === 'true') {
      setFilteredMovies(filterByDuration(filteredMovies, isShort));
    } else {
      setFilteredMovies(unfilteredMovies);
    }
  }, [isShort]);

  React.useEffect(() => {
    searchSavedMovies();
  }, [savedMovies]);

  React.useEffect(() => {
    getSavedMovies();
  }, []);

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
        <MoviesCardList refreshList={setFilteredMovies} filteredMovies={filteredMovies} />
      )}
      <div className="movies-card-list__divider"></div>
    </>
  );
}

export default SavedMovies;
