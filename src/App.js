 // src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import axios from 'axios';

// Importing Components
import Home from './components/Home';
import WebtoonDetail from './components/WebtoonDetail';
import Favorites from './components/Favourites';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);

  // Check if user is authenticated based on token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container>
            <Typography variant="h6" component={Link} to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Webtoon App
            </Typography>
            <div style={{ marginLeft: 'auto' }}>
              <Button component={Link} to="/" color="inherit">Home</Button>
              {user ? (
                <>
                  <Button component={Link} to="/favorites" color="inherit">Favorites</Button>
                  <Button onClick={handleLogout} color="inherit">Logout</Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" color="inherit">Login</Button>
                  <Button component={Link} to="/register" color="inherit">Register</Button>
                </>
              )}
            </div>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webtoons/:id" element={<WebtoonDetail />} />
        <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
