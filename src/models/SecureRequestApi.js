// src/services/api.js

import { getToken } from './AuthModel';

export async function fetchWithToken(url, options = {}) {
    const token = getToken();

    if (!options.headers) {
        options.headers = {};
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response.json();
}
