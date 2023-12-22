// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoggedIn(true);
        }
    }, []);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const userResponse = await response.json();
                localStorage.setItem('user', JSON.stringify(userResponse.payload));
                setUser(userResponse.payload);
                setLoggedIn(true);
            } else {
                throw new Error('Email or password incorrect');
            }
        } catch (error) {
            throw new Error('Error during login');
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/session/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                localStorage.removeItem('user');
                setUser(null);
                setLoggedIn(false);
            } else {
                throw new Error('Error during logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            throw new Error('Error during logout');
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};