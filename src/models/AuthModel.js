// src/services/authService.js

import {jwtDecode} from 'jwt-decode';

export async function LoginApi(username, password) {
    return fetch('https://www.main-bvxea6i-gxdg35vk6cfgm.fr-4.platformsh.site/auth/login', {
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
            if (data.token) {
                const decodedToken = jwtDecode(data.token);
                console.log(decodedToken.role_user + "coucuuuuu");
                sessionStorage.setItem('id_user', decodedToken.id_user);
                switch (decodedToken.role_user) {
                    case 0:
                        window.location.href = '/HubAtelier';
                        break;
                    case 1:
                        window.location.href = '/HubAtelier';
                        break;
                    case 2:
                        window.location.href = '/HubCommerciale';
                        break;
                    default:
                        window.location.href = '/';
                        break;
                }
            }
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
    sessionStorage.removeItem('id_user');
    window.location.href = '/login';
}

export function removeToken() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id_user');
}
