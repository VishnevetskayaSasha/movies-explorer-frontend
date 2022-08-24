import { URL_FILM } from '../constants/constants';

export class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

   // отдельно выносим проверку
   _checkLineOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res}`);
  }

  // Получение начальных карточек
  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(this._checkLineOk)
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: URL_FILM,
  headers: {
    'Content-Type': 'application/json',
  },
});

