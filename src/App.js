import React, { useState, useEffect } from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import './assets/styles/style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Login from './views/Login/Login';
import Blog from './views/Blog/Blog';
import Admin from './views/Admin/AdminUsers'
import HubAtelier from './views/Atelier/AtelierHub'
import Gammes from './views/DataLoader'
import Stock from './views/Atelier/Stock'
import Realisation from './views/Atelier/Realisation'
import Operation from './views/DataLoader'
import Postes from './views/DataLoader'
import Machines from './views/DataLoader'
import HubCommercial from './views/Commerce/CommercialHub'
import theme from './assets/themes/theme';
import HomePage from './views/Home/HomePage';
import useAuth from './hooks/useAuth';

function App({ location }) {

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

  useAuth();

  return (
      <>
        <GlobalStyles />
        <div className="App" >
          {location.pathname !== '/login' && (
              <Header />
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
            <Route path="/Operations" element={<Operation tokenManager={tokenManager} token={token} />} />
            <Route path="/Postes" element={<Postes tokenManager={tokenManager} token={token} />} />
            <Route path="/Machines" element={<Machines tokenManager={tokenManager} token={token} />} />
          </Routes>
        </div>
      </>
  );
}

export default App;
