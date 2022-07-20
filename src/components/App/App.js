import React from "react";
import { Route, Routes, useNavigate}  from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Main } from "../Main/Main";
import { Login } from '../Login/Login'
import { Register } from "../Register/Register"
import { Movies } from "../Movies/Movies"
import { Profile } from "../Profile/Profile";
import { NotFound } from "../NotFound/NotFound"
import { SavedMovies } from "../SavedMovies/SavedMovies"
import './App.css';

function App() {
  const [islogOn, setlogOn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  function handleSignIn() {
    setlogOn(true);
    navigate("/movies");
  }

  function handleSignOut() {
    setlogOn(false);
    navigate("/");

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route exact path="/" element={ <Main />}></Route>
            <Route exact path="/signin" element={<Login onSubmit={handleSignIn}/>}></Route>
            <Route exact path="/signup" element={<Register onSubmit={handleSignIn}/>}></Route>
            <Route exact path="/profile" element={ <Profile onSignOut={handleSignOut}/>}></Route>
            <Route exact path="/movies" element={ <Movies />}></Route>
            <Route exact path="/saved-movies" element={ <SavedMovies />}></Route>
            <Route exact path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;