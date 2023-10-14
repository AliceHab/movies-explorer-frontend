import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { AppContext } from '../../contexts/AppContext';

import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filter';

import useForm from '../../hooks/useForm';

function Movies() {
  const { beatfilmMovie, setBeatfilmMovie } = React.useContext(AppContext);
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
      setFilteredMovies(filterMovies(loadedBeatfilmMovies, values.query, isShort));
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
      console.log('Current state:', initialMovies, beatfilmMovie);
      setFilteredMovies(filterMovies(beatfilmMovie, values.query, isShort));
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
      />
      {isLoading ? (
        <Preloader error={error} />
      ) : (
        <MoviesCardList
          savedMovies={savedMovies}
          filteredMovies={filteredMovies}
          getSavedMovies={getSavedMovies}
        />
      )}
    </main>
  );
}
export default Movies;
