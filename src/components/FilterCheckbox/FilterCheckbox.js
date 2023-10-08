import React from 'react';

function FilterCheckbox({ text, isShortActive, setFilerShort }) {
  return (
    <div className="search-form__switch-wrapper">
      <input
        type="checkbox"
        className={'search-form__switch'}
        id="switch"
        checked={String(isShortActive) === 'true'}
        onChange={(e) => setFilerShort(e.target.checked)}
      />
      <label className="search-form__label-switch" htmlFor="switch">
        Переключатель
      </label>
      <label className="search-form__text-switch" htmlFor="switch">
        {text}
      </label>
    </div>
  );
}

export default FilterCheckbox;
