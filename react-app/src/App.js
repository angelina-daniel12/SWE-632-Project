import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ApiProvider } from 'contexts/ApiContext.js';
import Navbar from 'components/nav/Navbar.jsx';
import Home from 'components/home/HomePage.js';
import MyRankings from 'components/rankings/MyRankingsPage.js';
import SingleRank from 'components/rankings-single/SingleRank.js';
import ExplorePage from 'components/explore/ExplorePage.js';
import DevPage from 'components/dev/DevPage.jsx';
import CreateTemplatePage from 'components/dev/CreateTemplatePage.jsx';
import CreateItemsPage from 'components/dev/CreateItemsPage.jsx';
import { AuthProvider } from 'contexts/AuthContext.jsx'
import AuthModal from 'components/home/Auth';
import { useAuth } from 'contexts/AuthContext';
import GlobalPage from 'components/global/GlobalPage.js';
import GlobalLandingPage from "./components/global/GlobalLandingPage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#f0f4f8',
    },
    background: {
      default: '#f0f4f8',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<ExplorePage />} />
        <Route path="/my-rankings" element={<MyRankings />} />
        <Route path="/my-rankings/:rankingId" element={<SingleRank />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/dev/new-template" element={<CreateTemplatePage />} />
        <Route path="/dev/new-items" element={<CreateItemsPage />} />
        <Route path="/global" element={<GlobalLandingPage />} />
        <Route path="/global/:templateId" element={<GlobalPage/>} />
      </Routes>
      {!isAuthenticated && <AuthModal open={!isAuthenticated} />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
