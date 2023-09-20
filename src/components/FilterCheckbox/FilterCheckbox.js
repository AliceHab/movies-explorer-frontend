import React from 'react';

function FilterCheckbox({ text }) {
  return (
    <div className="search-form__switch-wrapper">
      <input type="checkbox" className="search-form__switch" id="switch" />
      <label className="search-form__label-switch" for="switch">
        Переключатель
      </label>
      <p className="search-form__text-switch">{text}</p>
    </div>
  );
}

export default FilterCheckbox;
