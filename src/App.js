import React, { useState, useEffect } from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import './assets/styles/style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Login from './views/Login/Login';
import Blog from './views/Blog/Blog';
import Admin from './views/Admin/AdminUsers'
import HubAtelier from './views/Atelier/AtelierHub'
import Gammes from './views/Atelier/Gammes'
import Stock from './views/Atelier/Stock'
import Realisation from './views/Atelier/Realisation'
import HubCommercial from './views/Commerce/CommercialHub'
import theme from './assets/themes/theme';
import HomePage from './views/Home/HomePage';
import useAuth from './hooks/useAuth';

function App({ location }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const [token, setToken] = useState("");
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
              <Header darkMode={darkMode} toggleTheme={toggleTheme} />
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login tokenManager={tokenManager} token={token} />} />
            <Route path="/blog" element={<Blog tokenManager={tokenManager} token={token} />} />
            <Route path="/admin" element={<Admin tokenManager={tokenManager} token={token} />} />
            <Route path="/HubAtelier" element={<HubAtelier tokenManager={tokenManager} token={token} />} />
            <Route path="/Gammes" element={<Gammes tokenManager={tokenManager} token={token} />} />
            <Route path="/Stock" element={<Stock tokenManager={tokenManager} token={token} />} />
            <Route path="/Realisations" element={<Realisation tokenManager={tokenManager} token={token} />} />
            <Route path="/HubCommercial" element={<HubCommercial tokenManager={tokenManager} token={token} />} />
          </Routes>
        </div>
      </>
  );
}

export default App;
