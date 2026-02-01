import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ApiProvider } from 'contexts/ApiContext.js';
import Navbar from 'components/nav/Navbar.js';
import Home from 'components/home/HomePage.js';
import MyRankings from 'components/rankings/MyRankingsPage.js';
import ExplorePage from 'components/explore/ExplorePage.js';
import TemplatePage from 'components/explore/TemplatePage.js';
import DevPage from 'components/dev/DevPage.jsx';
import CreateTemplatePage from 'components/dev/CreateTemplatePage.jsx';
import CreateItemsPage from 'components/dev/CreateItemsPage.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f0f4f8',
    },
    background: {
      default: '#f0f4f8',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<ExplorePage />} />
            <Route path="/templates/:templateId" element={<TemplatePage />} />
            <Route path="/my-rankings" element={<MyRankings />} />
            <Route path="/dev" element={<DevPage />} />
            <Route path="/dev/new-template" element={<CreateTemplatePage />} />
            <Route path="/dev/new-items" element={<CreateItemsPage />} />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
