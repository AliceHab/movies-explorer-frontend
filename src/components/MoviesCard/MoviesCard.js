import React from 'react';

const isSaved = true;
const cardLikeButtonClassName = isSaved ? `movies-card__like` : `movies-card__delete`;

function MoviesCard() {
  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        src="https://img1.wsimg.com/isteam/ip/7f8780db-d5fb-4685-a2a6-8214d54ce075/cuteness.jpg/:/rs=h:1000,cg:true,m"
        alt="kitty"
      />
      <div className="movies-card__bottom">
        <div className="movies-card__description-wrapper">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч42м</p>
        </div>
        <button className={cardLikeButtonClassName} type="button" />
      </div>
    </li>
  );
}

export default MoviesCard;
