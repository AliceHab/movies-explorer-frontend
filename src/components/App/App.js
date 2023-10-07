import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="App">
      <div className="root">
        <div className="page">
          <Header active={menuActive} setActive={setMenuActive} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movie" element={<Movies />} />
            <Route path="/saved-movies" element={<SavedMovies />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Navigation isOpen={menuActive} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default App;
