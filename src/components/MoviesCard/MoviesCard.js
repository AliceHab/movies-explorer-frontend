import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard() {
  const location = useLocation();
  const { pathname } = location;

  const isSavedMovie = pathname === '/saved-movies';
  const cardDelete = <button className="movies-card__delete" type="button" />;

  const isSaved = true;
  const cardLikeButtonClassName = isSaved ? `movies-card__like` : `movies-card__dislike`;
  const cardLike = <button className={cardLikeButtonClassName} type="button" />;

  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        src="https://img1.wsimg.com/isteam/ip/7f8780db-d5fb-4685-a2a6-8214d54ce075/cuteness.jpg/:/rs=h:1000,cg:true,m"
        alt="Китик"
      />
      <div className="movies-card__bottom">
        <div className="movies-card__description-wrapper">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч42м</p>
        </div>
        {isSavedMovie ? cardDelete : cardLike}
      </div>
    </li>
  );
}

export default MoviesCard;
