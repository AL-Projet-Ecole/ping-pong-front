import React, { useState, useEffect } from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';
import './assets/styles/style.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Login from './views/Login/Login';
import Admin from './views/Admin/AdminUsers'
import HubAtelier from './views/Atelier/AtelierHub'
import Gammes from './views/DataLoader'
import Pieces from './views/Atelier/Stock'
import Realisation from './views/DataLoader'
import Operation from './views/DataLoader'
import Postes from './views/DataLoader'
import Machines from './views/DataLoader'
import HubCommercial from './views/Commerce/CommercialHub'
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
            <Route path="/" element={<Login tokenManager={tokenManager} token={token} />} />
            <Route path="/login" element={<Login tokenManager={tokenManager} token={token} />} />
            <Route path="/admin" element={<Admin tokenManager={tokenManager} token={token} />} />
            <Route path="/HubAtelier" element={<HubAtelier tokenManager={tokenManager} token={token} />} />
            <Route path="/HubCommercial" element={<HubCommercial tokenManager={tokenManager} token={token} />} />
            <Route path="/Gammes" element={<Gammes tokenManager={tokenManager} token={token} />} />
            <Route path="/Pieces" element={<Pieces tokenManager={tokenManager} token={token} />} />
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
