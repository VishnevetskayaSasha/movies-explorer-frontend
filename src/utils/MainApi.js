import { BASE_URL } from '../constants/constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
// отдельно выносим проверку
_handleResponse = (res) => {
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// регистрация
register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        }),
    })
    .then(this._handleResponse);
}

// вход
login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        }),
    })
    .then(this._handleResponse);
}

// выход
signOut = () => {
    return fetch(`${BASE_URL}/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }, 
    })
    .then(this._handleResponse);

}

// редактирование профиля
setProfile = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
            })
    })
    .then(this._handleResponse);
}

// проверка профиля
getUser = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(this._handleResponse);
}

// проверка токена
checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(this._handleResponse);
}


// сохранение фильма
saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(
        {
            country: movie.country || "не указано",
            director: movie.director || "",
            duration: movie.duration || "",
            year: movie.year || "",
            description: movie.description || "",
            image: movie.image,
            trailerLink: movie.trailerLink || movie.image,
            thumbnail: movie.image,
            movieId: movie.id,
            nameRU: movie.nameRU || movie.nameEN || "",
            nameEN: movie.nameEN || movie.nameRU || "", 
        })})
    .then(this._handleResponse);  
}

// получение сохраненных фильмов
getMoviesSaved = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(this._handleResponse);
}

// удаление сохраненного фильма
deleteMovieSaved = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    .then(this._handleResponse);
  }
}

export const mainApi = new MainApi({
    baseUrl: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });