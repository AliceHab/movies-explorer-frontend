import React from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" name="search">
        <input
          type="text"
          id="name"
          name="name"
          className="search-form__input"
          placeholder="Фильм"
        />
        <input className="search-form__search-btn" type="submit" value="ㅤ" />
      </form>
      <FilterCheckbox text="Короткометражки" />
      {/* <div className='search-form__bottom-line'></div> */}
    </section>
  );
}

export default SearchForm;
