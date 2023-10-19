import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { AppContext } from '../../contexts/AppContext';

import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { filterMovies, filterByDuration } from '../../utils/filter';

import useForm from '../../hooks/useForm';

function Movies() {
  const { beatfilmMovie, setBeatfilmMovie } = React.useContext(AppContext);
  const [unfilteredMovies, setUnfilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isShort, setIsShort] = React.useState(false);
  const { values, handleChange, setValues } = useForm({
    query: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  async function getBeatfilmMovies() {
    setIsLoading(true);
    setError('');

    try {
      const loadedBeatfilmMovies = await moviesApi.getBeatfilmMovies();
      setBeatfilmMovie(loadedBeatfilmMovies);
      localStorage.setItem('movies', JSON.stringify(loadedBeatfilmMovies));
      setUnfilteredMovies(filterMovies(loadedBeatfilmMovies, values.query));
      setFilteredMovies(filterMovies(loadedBeatfilmMovies, values.query));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      setIsLoading(false);
    }
  }

  async function loadOrGetBeatMovies() {
    const initialMovies = JSON.parse(localStorage.getItem('movies'));

    if (!initialMovies) {
      await getBeatfilmMovies();
    } else {
      setBeatfilmMovie(initialMovies);
      setFilteredMovies(filterMovies(initialMovies, values.query));
      setUnfilteredMovies(filterMovies(initialMovies, values.query));
    }
  }

  function getSavedMovies() {
    api
      .getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addLikedMovie(likedMovie) {
    setSavedMovies((prevSavedMovies) => [...prevSavedMovies, likedMovie]);
  }

  function setLocalStorage() {
    localStorage.setItem('query', values.query);
    localStorage.setItem('isShort', isShort);
  }

  function getLocalStorage() {
    const localStorageQuery = localStorage.getItem('query');
    const localStorageIsShort = localStorage.getItem('isShort');

    localStorageQuery && setValues({ query: localStorageQuery });
    localStorageIsShort && setIsShort(localStorageIsShort);
  }

  React.useEffect(() => {
    getSavedMovies();
    getLocalStorage();
  }, []);

  React.useEffect(() => {
    if (String(isShort) === 'true') {
      setFilteredMovies(filterByDuration(filteredMovies, isShort));
    } else {
      setFilteredMovies(unfilteredMovies);
    }
  }, [isShort, unfilteredMovies]);

  React.useEffect(() => {
    setTimeout(() => setLocalStorage(), 500); // не записываем пустые значения после монтирования
  }, [values.query, isShort]);

  React.useEffect(() => {
    if (values.query || isShort) {
      loadOrGetBeatMovies();
    }
  }, [savedMovies]);

  return (
    <main>
      <SearchForm
        query={values.query}
        setQuery={handleChange}
        isShort={isShort}
        setFilerShort={setIsShort}
        searchHandler={loadOrGetBeatMovies}
        filterByDuration={filterByDuration}
      />
      {isLoading ? (
        <Preloader error={error} />
      ) : (
        <MoviesCardList
          savedMovies={savedMovies}
          filteredMovies={filteredMovies}
          getSavedMovies={addLikedMovie}
        />
      )}
    </main>
  );
}
export default Movies;
