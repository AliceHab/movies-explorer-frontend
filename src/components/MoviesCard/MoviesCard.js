import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import api from '../../utils/MainApi';
import convertToHoursAndMinutes from '../../utils/convertToHoursAndMinutes';

function MoviesCard({
  card,
  savedMovies,
  refreshList,
  getSavedMovies,
  filteredMovies,
  setSavedMovies,
}) {
  const location = useLocation();
  const { pathname } = location;
  const [isSaved, setIsSaved] = React.useState(false);
  const [cardId, setCardId] = React.useState('');

  function checkIsSaved() {
    if (savedMovies && savedMovies.some((i) => i.nameRU === card.nameRU)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  React.useEffect(() => {
    checkIsSaved();
  }, [savedMovies]);

  const isSavedMovie = pathname === '/saved-movies';

  const cardLike = <button className="movies-card__like" type="button" onClick={saveMovie} />;
  const cardDislike = (
    <button className="movies-card__dislike" type="button" onClick={deleteMovie} />
  );
  const cardDelete = <button className="movies-card__delete" type="button" onClick={deleteMovie} />;

  const cardLikeButtonClassName = isSaved ? cardDislike : cardLike;

  function saveMovie() {
    api
      .saveMovie(card)
      .then((res) => {
        if (res) {
          setIsSaved(true);
          getSavedMovies(card);
          setCardId(res.data._id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteMovie() {
    const movieToDelete = savedMovies?.find((i) => i.nameRU === card.nameRU) || card;

    if (movieToDelete._id || cardId) {
      const idToDelete = movieToDelete._id || cardId;
      api
        .deleteMovie(idToDelete)
        .then((res) => {
          if (res) {
            setIsSaved(false);
            refreshList && refreshList(filteredMovies.filter((item) => item._id !== idToDelete));
            setSavedMovies &&
              setSavedMovies(filteredMovies.filter((item) => item._id !== idToDelete));
            // обновляем массив карточек, исключая удаленную
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <li className="movies-card">
      <Link to={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={
            card.image.url
              ? `https://api.nomoreparties.co/${card.image.url}` // формат данных movieBeats
              : `https://api.nomoreparties.co/${card.image}` // формат нашего API
          }
          alt={card.nameRU}
        />
      </Link>
      <div className="movies-card__bottom">
        <div className="movies-card__description-wrapper">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          <p className="movies-card__duration">{convertToHoursAndMinutes(card.duration)}</p>
        </div>
        {isSavedMovie ? cardDelete : cardLikeButtonClassName}
      </div>
    </li>
  );
}

export default MoviesCard;
