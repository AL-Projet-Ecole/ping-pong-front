// src/hooks/useAuth.js

import { useEffect } from 'react';
import { getToken } from '../models/AuthModel';

const useAuth = () => {
    useEffect(() => {
        const token = getToken();

        if (window.location.pathname === '/login') {
            return;
        }

        if (!token) {
            window.location.href = '/login';
        }
    }, []);
};

export default useAuth;
