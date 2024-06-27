import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-modal'; // Import react-modal

// Définir l'élément d'application pour react-modal
Modal.setAppElement('#root');

const AppWithRouter = () => {
    const location = useLocation();
    return <App location={location} />;
};

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AppWithRouter />
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
