import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (id) => {
        localStorage.setItem('userId', id);
        setUserId(id);
        setIsAuthenticated(true);
        console.log("userID set")
    };

    const logout = () => {
        localStorage.removeItem('userId');
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ userId, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
