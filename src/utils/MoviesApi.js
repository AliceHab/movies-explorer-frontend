import { URL_BEATFILM } from '../utils/constants';

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getBeatfilmMovies() {
    this._headers['Cache-Control'] = 'no-cache';
    return this._request(`${this._baseUrl}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: URL_BEATFILM,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
