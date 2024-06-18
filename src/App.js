// src/App.js

import React, { useState, useEffect } from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import './assets/styles/style.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Login from './views/Login/Login';
import Blog from './views/Blog/Blog';
import theme from './assets/themes/theme';
import HomePage from './views/Home/HomePage';
import useAuth from './hooks/useAuth';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tradMode, setTradMode] = useState("fr");
  const location = useLocation(); // Utiliser useLocation pour obtenir le chemin d'accès actuel

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleTradMode = () => {
    setTradMode(tradMode === "fr" ? "en" : "fr");
  };

  const [token, setToken] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const tokenManager = (jwtToken) => {
    setToken(jwtToken);
    sessionStorage.setItem("token", jwtToken);
  };

  const themeColor = {
    background: darkMode ? theme.dark.background : theme.light.background,
    color: darkMode ? theme.dark.text : theme.light.text
  };

  useAuth();

  return (
      <>
        <GlobalStyles />
          <div className="App" style={themeColor}>
            {location.pathname !== '/login' && (
                <Header darkMode={darkMode} toggleTheme={toggleTheme} tradMode={tradMode} toggleTrad={toggleTradMode} />
            )}
            <Routes>
              <Route path="/" element={<HomePage tradMode={tradMode} toggleTrad={toggleTradMode} />} />
              <Route path="/login" element={<Login tokenManager={tokenManager} token={token} />} />
              <Route path="/blog" element={<Blog tokenManager={tokenManager} token={token} />} />
            </Routes>
          </div>
      </>
  );
}

export default App;
