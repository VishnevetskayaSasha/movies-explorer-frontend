import React from "react";
import { Route, Routes, useLocation, useNavigate, Navigate}  from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Main } from "../Main/Main";
import { Login } from '../Login/Login'
import { Register } from "../Register/Register"
import { Movies } from "../Movies/Movies"
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound"
import { SavedMovies } from "../SavedMovies/SavedMovies"
import './App.css';
import { SERVER_ERR, NOT_FOUND,  DURATION_LENGTH } from '../../constants/constants';
import { moviesApi } from '../../utils/MoviesApi'
import { mainApi } from '../../utils/MainApi';
import { PrivateRoute } from '../../utils/PrivateRoute'

function App() {
  const [islogOn, setlogOn] = React.useState(false); 
  const [isLoading, setIsLoading] = React.useState(false); 
  const [isAuth, setIsAuth] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({}); 
  const [storedMovies, setStoredMovies] = React.useState([]); 
  const [searchStoredMovies, setSearchStoredMovies] = React.useState([]); 
  const [searchSavedMovies, setSearchSavedMovies] = React.useState(""); 
  const [searchShortSavedMovies, setSearchShortSavedMovies] = React.useState(""); 
  const [isFormDisabled, setFormDisabled] = React.useState(true); 
  const [isPreloader, setIsPreloader] = React.useState(false); 
  const [messageSearchResult, setMessageSearchResult] = React.useState(""); 
 // const [messageSearchSavedResult, setMessageSearchSavedResult] = React.useState(""); 
  const [isChecked, setChecked] = React.useState(false); // чекбокс короткометражек на главной странице
  const [isCheckedSaved, setCheckedSaved] = React.useState(false); // чекбокс короткометражек на странице сохраненных фильмов
  const [isLiked, setLiked] = React.useState(false); 
  const [isMessageProfile , setMessageProfile] = React.useState("");
  const [isMessageErr , setMessageErr] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLocationMovies = location.pathname === '/movies';
  const jwt = localStorage.getItem("jwt");
  const [isEditError, setIsEditError] = React.useState(false);
  const [isEditDone, setIsEditDone] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [resultMovies, setResultMovies] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState(""); 

  React.useEffect(() => {
   /* moviesApi.getAllMovies()
    .then((movies) => {
      setMovieList(movies)
    })
    .catch((err) => {
      console.log(err);
      setMessageSearchResult(SERVER_ERR);
    }) */

    mainApi.getMoviesSaved()
    .then((event) => {
      setStoredMovies(event);
    })
    .catch((err) => {
      console.log(err);
      setMessageSearchResult(SERVER_ERR);
    })
  }, [])

  React.useEffect(() => {
    if (jwt) {
      handleIsToken();
    } 
  }, 
  [jwt, navigate, location.pathname]);  
  
  React.useEffect(() => {
    if (isLoading === true) {
      mainApi.getUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        }) 
    }
  }, [isLoading]);

  React.useEffect(() => {
    changeChecked(JSON.parse(localStorage.getItem("isChecked")) ?? false)
    setResultMovies(localStorage.getItem("resultMovies") ?? []);
    setSearchWord(localStorage.getItem("searchedMovieWord") ?? "");
  }, []);
  
  function handleIsToken() { 
    const jwt = localStorage.getItem("jwt"); 
    mainApi.checkToken(jwt)
      .then((user) => {
        setCurrentUser(user);
        localStorage.setItem('userId', user._id);
        setIsLoading(true);
      })
      .catch((err) => {
          console.error(err);
          handleSignOut() //тест выхода из аккаунта после протухания токена
      })
      .finally(()=> setlogOn(false));
  }

  function handleIsLogin(data) { 
    mainApi.login(data)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setFormDisabled(false); 
          handleIsToken();
          navigate("/movies")  
        }
      })
      .catch((err) => {
        setIsEditError(true);
        if (err === "Ошибка: 401") setMessageErr("Ошибка! Возможно, вы ввели неверные данные или еще не зарегистрированны на сайте");
        setTimeout(() => setIsEditError(false), 3000);
      })
      .finally(()=> {
         setFormDisabled(true)
      });
  }

  function handleIsRegister(data) {
    mainApi.register(data)
      .then((user) => {
        setCurrentUser(user);
        setFormDisabled(false);
        handleIsLogin(data);
      })
      .catch((err) => {
        setIsEditError(true);
        if (err === "Ошибка: 400") setMessageErr("Переданы некорректные данные");
        if (err === "Ошибка: 409") setMessageErr("Пользователь с таким E-mail уже существует");
        if (err === "Ошибка: 500") setMessageErr("Ошибка сервера");
        setTimeout(() => setIsEditError(false), 3000);
      })
      .finally(()=> {
        setFormDisabled(true)
      });
  }

  function handleSignOut() {
    mainApi.signOut();  
    setIsLoading(false);  
    navigate("/");
    localStorage.clear();
    setlogOn(false);
    setCurrentUser({});
    setResultMovies([]);
    setSearchWord("")
  }

  function handleUpdateProfile(name, email) {
    mainApi.setProfile(name, email)
      .then((user) => {
        console.log(user)
        setCurrentUser(user.user);
        setFormDisabled(true);
        setMessageProfile("Редактирование данных прошло успешно")
        setIsEditDone(true);
        setIsEditError(false);
      })
      .catch((err) => {
        setIsEditError(true);
        if (err === "Ошибка: 400") setMessageProfile("Переданы некорректные данные");
        if (err === "Ошибка: 409") setMessageProfile("Пользователь с таким E-mail уже существует");
        if (err === "Ошибка: 500") setMessageProfile("Запрос не может быть выполнен, возможно ошибка сервера.");
      })
      .finally(()=> {
        setFormDisabled(false);
        setIsEditError(false);
        setTimeout(() =>  setMessageProfile(), 1300);
      });
  }

  function handleWordKeyFilter(movies, wordKey) {
    return movies.filter((movie) => (
      movie.nameRU || movie.nameEN).toLowerCase().includes(wordKey.toLowerCase()
    ));
  }

  // поиск фильмов 
  const getMoviesFilter = () => {
    if (isLocationMovies) {
      const filteredMovies = handleWordKeyFilter(movieList, searchWord);

      if (filteredMovies.length !== 0) {
          setResultMovies(filteredMovies);
          
          localStorage.setItem("resultMovies", JSON.stringify(filteredMovies));
          localStorage.setItem("searchedMovieWord", searchWord);
        } else {
          //setMessageSearchResult(NOT_FOUND);
        }
    } else { // поиск фильмов в saved-movies
      const newMovies = storedMovies;
      const filteredMovies = handleWordKeyFilter(newMovies, searchSavedMovies);

      if (filteredMovies.length !== 0) {
          setSearchStoredMovies(filteredMovies);
        } else {
        //  setMessageSearchSavedResult(NOT_FOUND);
        }
      }
  }

  // фильтрация коротких фильмов на главной странице
  function filterShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= DURATION_LENGTH)
  }
 
  function changeChecked(nextIsChecked) {
    localStorage.setItem("isChecked", nextIsChecked);
    setChecked(nextIsChecked)

    if(nextIsChecked){
      const nextShortMovies = filterShortMovies(resultMovies);

      setResultMovies(nextShortMovies);
      localStorage.setItem("resultMovies", JSON.stringify(nextShortMovies));
    }
  }

  function changeCheckedSaved(nextIsChecked) {
    setCheckedSaved(nextIsChecked) ;

    if(nextIsChecked){
      const nextSearchShortMovies = filterShortMovies(storedMovies);

      setSearchShortSavedMovies(nextSearchShortMovies);
    }
  }

  // Для записи в локальное хранилище сохраненных фильмов
  React.useEffect(() => {
    localStorage.setItem("storedMovies", JSON.stringify(storedMovies));
    
    const newMovies = JSON.parse(localStorage.getItem("movies"));

    if (newMovies !== null) {
      for (const movie of newMovies) {
        for (const storedMovie of storedMovies){
          if ( movie.id === storedMovie.movieId) {
            movie.likes = true;
          }
        }
      }
      localStorage.setItem("movies", JSON.stringify(newMovies));
    }
  }, 
  [storedMovies]); // movies
   
  // обработчик нажатия на кнопку like
  function handleMovieLike(){
    setLiked(()=> isLiked === false ? true : false)
  }

  // сохранение и удаление карточек на основной странице
  function handleMoviesSaved(likedMovie) {
    if(!likedMovie.likes){
      mainApi.saveMovie(likedMovie)
        .then((newlikedMovie) => {
          setStoredMovies([newlikedMovie, ...storedMovies]);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      const findedMovie = storedMovies.find((movie) => {
        return movie.movieId === likedMovie.id
      });

      mainApi.deleteMovieSaved(findedMovie._id)
        .then(() => {
          setStoredMovies(storedMovies.filter((movie) => movie.movieId !== likedMovie.id));
          likedMovie.likes = false;
        })
        .catch((err) => {
          console.log(err);
        })    
        
    }
  }

  // удаление карточек на странице сохраненных фильмов
  function handleDeleteMoviesSaved(dislikedMovie) {

    let moviesArrow = [];

    if ( resultMovies.length === 0) {
      moviesArrow = storedMovies;
      moviesArrow.find((movie) =>movie.movieId === dislikedMovie.movieId).likes = false;
    } else {
      moviesArrow = resultMovies;
        if ( moviesArrow.find((movie) =>movie.id === dislikedMovie.movieId) === undefined) {
          moviesArrow = storedMovies;
          moviesArrow.find((movie) =>movie.movieId === dislikedMovie.movieId).likes = false;
        } else {
          moviesArrow.find((movie) =>movie.id === dislikedMovie.movieId).likes = false;
        }
    }

    const findedMovie = storedMovies.find((movie) => {
      return movie.movieId === dislikedMovie.movieId
    });

    mainApi.deleteMovieSaved(findedMovie._id)
    .then(() => {
      setStoredMovies(storedMovies.filter((movie) => movie.movieId !== dislikedMovie.movieId));
      localStorage.removeItem("storedMovies");
      setSearchStoredMovies(searchStoredMovies.filter((movie) => movie.movieId !== dislikedMovie.movieId));

    })
    .catch((err) => {
     console.log(err);
    })   
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route exact path="/" element={ <Main />}></Route>
            <Route exact path="/signin" element={ jwt ? <Navigate to="/" /> : <Login handleIsLogin={handleIsLogin} islogOn={islogOn} isAuth={isAuth} setIsAuth={setIsAuth}
            setFormDisabled={isFormDisabled} isEditError={isEditError} setMessageErr={isMessageErr}
              />}/>
            <Route exact path="/signup" element={ jwt ? <Navigate to="/" /> : <Register handleIsRegister={handleIsRegister} isEditError={isEditError} setMessageErr={isMessageErr} 
            setFormDisabled={isFormDisabled} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
            <Route 
              exact 
              path="/profile" 
              element={
                <PrivateRoute allowed={jwt}>
                  <Profile onUpdateProfile={handleUpdateProfile} setFormDisabled={isFormDisabled} setMessageProfile={isMessageProfile} onSignOut={handleSignOut} isEditDone={isEditDone} isEditError={isEditError} 
                  />
                </PrivateRoute>
              }
            />
            <Route 
              exact 
              path="/movies" 
              element={
                <PrivateRoute allowed={jwt}>
                  <Movies 
                    islogOn={isLoading}
                    isLiked={isLiked}
                    movies={resultMovies}
                    storedMovies={storedMovies}
                    isPreloader={isPreloader}
                    searchMovies={searchWord}
                    messageSearchResult={messageSearchResult}
                    setIsPreloader={setIsPreloader}
                    setSearchMovies={setSearchWord}
                    setMessageSearchResult={setMessageSearchResult}
                    onGetMovies={getMoviesFilter}
                    onMoviesSaved={handleMoviesSaved}
                    handleMovieLike={handleMovieLike}
                    isChecked={isChecked}
                    changeChecked={changeChecked}
                  />
                </PrivateRoute>
              }
            />
            <Route 
              exact 
              path="/saved-movies" 
              element={
                <PrivateRoute allowed={jwt}>
                  <SavedMovies
                    islogOn={isLoading}
                    isLiked={isLiked}
                    movies={resultMovies}
                    storedMovies={storedMovies}
                    searchStoredMovies={searchStoredMovies}
                    isPreloader={isPreloader}
                    searchSavedMovies={searchSavedMovies}
                    searchShortMovies={searchShortSavedMovies}
                    setIsPreloader={setIsPreloader}
                    setSearchSavedMovies={setSearchSavedMovies}
                    setSearchShortMovies={setSearchShortSavedMovies}
                    onGetMovies={getMoviesFilter}
                    onMoviesSaved={handleMoviesSaved}
                    onDeleteMoviesSaved={handleDeleteMoviesSaved}
                    handleMovieLike={handleMovieLike}
                    setMessageSearchResult={setMessageSearchResult}
                    isChecked={isCheckedSaved}
                    changeChecked={changeCheckedSaved}/>
                </PrivateRoute>
              }>
            </Route>
            <Route exact path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;