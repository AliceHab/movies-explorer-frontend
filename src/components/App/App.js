import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import api from '../../utils/MainApi';

import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// Перед деплоем
// 1. Поменять на бэке контроллер user и updateUser. Должен быть email вместо about
// 1.1. Обновить валидацию в routes, добавив email
// 2.2 Обновить схему фильма и валидацию в роуте. Убрать для картинки и тумбнейл ссылку

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [beatfilmMovie, setBeatfilmMovie] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

  // Проверяем авторизацию
  const checkTocken = () => {
    api
      .getContent()
      .then((res) => {
        if (!res) {
          return;
        }
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        setLoggedIn(false);
        localStorage.clear();
        console.error(err);
      });
  };

  React.useEffect(() => {
    checkTocken();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="root">
        <div className="page">
          <Header active={menuActive} setActive={setMenuActive} isLoggedIn={isLoggedIn} />
          <AppContext.Provider value={{ beatfilmMovie, setBeatfilmMovie }}>
            <CurrentUserContext.Provider value={currentUser}>
              <Routes>
                <Route
                  path="/movies"
                  element={<ProtectedRoute element={<Movies />} isLoggedIn={isLoggedIn} />}
                  exact
                />
                <Route
                  path="/saved-movies"
                  element={<ProtectedRoute element={<SavedMovies />} isLoggedIn={isLoggedIn} />}
                  exact
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={<Profile updateUserDate={checkTocken} />}
                      isLoggedIn={isLoggedIn}
                      setLoggedIn={setLoggedIn}
                    />
                  }
                  exact
                />

                <Route path="/" element={<Main />} />
                <Route
                  path="/signup"
                  element={<Register setIsLogged={setLoggedIn} isLoggedIn={isLoggedIn} />}
                />
                <Route
                  path="/signin"
                  element={<Login setIsLogged={setLoggedIn} isLoggedIn={isLoggedIn} />}
                />
                <Route path="/*" element={<NotFound />} />
              </Routes>
              <Navigation isOpen={menuActive} />
            </CurrentUserContext.Provider>
          </AppContext.Provider>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default App;
