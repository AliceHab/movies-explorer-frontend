// Фильтрация по запросу
function filterByText(movies, query) {
  const lowerCaseQuery = query.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(lowerCaseQuery) ||
      movie.nameEN.toLowerCase().includes(lowerCaseQuery)
  );
}

// Фильтрация по длительности фильма (короткометражки)
function filterByDuration(movies) {
  return movies.filter((movie) => movie.duration <= 40);
}

// Общая функция фильтрации
export default function filterMovies(movies, query, isShort) {
  console.log('Вызвана фильтрация', movies, query, isShort);
  if (Array.isArray(movies)) {
    let filteredMovies = filterByText(movies, query);
    if (String(isShort) === 'true') {
      // проверка true или false, поскольку localStorage сохраняется только строки
      filteredMovies = filterByDuration(filteredMovies);
    }
    console.log(console.log('Возврат отфильтрованных фильмов'));
    return filteredMovies;
  }
}
