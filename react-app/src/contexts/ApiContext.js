import { createContext, useContext } from 'react';

// A React Context for API configuration
// Making SERVER_URL available throughout the app

const ApiContext = createContext();

export function ApiProvider({ children }) {
    // Swap between production and local server URLs as needed
    const SERVER_URL_PROD = 'https://interadditive-benny-matrilineal.ngrok-free.dev';
    // const SERVER_URL_LOCAL = 'http://localhost:8000';
    const SERVER_URL = SERVER_URL_PROD;
    
    return (
        <ApiContext.Provider value={{ SERVER_URL }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApi() {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
}