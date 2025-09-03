// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import { setAuthToken } from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  return (
    <Router>
      <Routes>
      <Route path="/search" element={token ? <Search token={token} /> : <Navigate to="/login" />} />

       <Route path="/favorites" element={token ? <Favorites token={token} /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
