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
export function filterByDuration(movies, isShort) {
  return movies.filter((movie) => movie.duration <= 40);
}

// Общая функция фильтрации
export function filterMovies(movies, query, isShort) {
  if (Array.isArray(movies)) {
    let filteredMovies = filterByText(movies, query);
    if (String(isShort) === 'true') {
      // проверка true или false, поскольку localStorage сохраняет только строки
      filteredMovies = filterByDuration(filteredMovies);
    }
    return filteredMovies;
  }
}
