// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const userResponse = await response.json();
                setUser(userResponse);
            } else {
                throw new Error('Email or password incorrect');
            }
        } catch (error) {
            throw new Error('Error during login');
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/session/logout')
            if(response.ok) {
                setUser(null);
            }
            
        } catch (error) {
            throw new Error('Error during logout');
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
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