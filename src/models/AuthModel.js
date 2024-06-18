// src/services/authService.js

import {jwtDecode} from 'jwt-decode';

export async function LoginApi(username, password) {
    return fetch('http://127.0.0.1:3333/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login_user: username,
            mdp_user: password
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Redirection vers la page d'accueil après connexion réussie
            window.location.href = '/';
            return data;
        })
        .catch(error => {
            console.error('Login failed:', error);
            throw error;
        });
}


// Fonction pour vérifier si le token est valide
export function isTokenValid(token) {
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

// Fonction pour obtenir le token depuis le sessionStorage
export function getToken() {
    const token = sessionStorage.getItem('token');
    if (token && isTokenValid(token)) {
        return token;
    }
    sessionStorage.removeItem('token');
    return null;
}

// Fonction pour déconnecter l'utilisateur
export function logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
}

export function removeToken() {
    sessionStorage.removeItem('token');
}
