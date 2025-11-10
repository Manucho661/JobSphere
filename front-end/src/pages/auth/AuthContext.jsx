// src/auth/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from "../../api/apiClient"; // Ensure apiClient is set up to handle axios requests

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('auth_token') || '');

    // Fetch user data if token exists
    useEffect(() => {
        if (token) {
            apiClient
                .get(`${API_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('auth_token');
                    setToken('');
                });
        }
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const { token, user } = response.data; // { token, user }

            if (token && user) {
                setToken(token);
                localStorage.setItem('auth_token', token);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user)); // optional but useful
            } else {
                throw new Error('Invalid response from server');
            }

            // ✅ Return data so the caller can use it
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error(error.response ? error.response.data.message : 'Login failed');
        }
    };

    console.log("AuthProvider rendering, yoyo value:"); // Debug log

    // Logout function
    const logout = () => {
        return new Promise((resolve) => {
            setUser(null);
            setToken('');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');

            // wait for React state to update in the next event loop
            setTimeout(resolve, 0);
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
