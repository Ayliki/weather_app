import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Favorites from './pages/Favorites/Favorites';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import CityDetail from './pages/CityDetail/CityDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/city/:cityId" element={<CityDetail />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
