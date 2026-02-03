import { createContext, useContext } from 'react';

// A React Context for API configuration
// Making SERVER_URL available throughout the app

const ApiContext = createContext();

export function ApiProvider({ children }) {
    // Swap between production and local server URLs as needed
<<<<<<< HEAD
    // const SERVER_URL_PROXY = 'https://interadditive-benny-matrilineal.ngrok-free.dev';
    // const SERVER_URL_PROD = 'http://139.144.222.250:8000';
=======
    // const SERVER_URL_PROD = 'https://interadditive-benny-matrilineal.ngrok-free.dev';
    const SERVER_URL = 'https://metatier.turkmenkaan.xyz:8000'
>>>>>>> 7d6f248 (update endpoint with https)
    // const SERVER_URL_LOCAL = 'http://localhost:8000';
    const SERVER_URL_PROD = "https://metatier.turkmenkaan.xyz:8000"
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