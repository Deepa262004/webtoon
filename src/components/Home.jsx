 // src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Home = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/webtoons'); // Adjust your API endpoint as necessary
        setWebtoons(response.data);
      } catch (error) {
        console.error("Error fetching webtoons:", error);
      }
    };

    fetchWebtoons();

    // Load favorites from localStorage if available
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteToggle = (webtoon) => {
    const isFavorited = favorites.some((fav) => fav._id === webtoon._id);
    let updatedFavorites;

    if (isFavorited) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav._id !== webtoon._id);
      setSnackbarMessage(`${webtoon.title} removed from favorites!`);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, webtoon];
      setSnackbarMessage(`${webtoon.title} added to favorites!`);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top 10 Popular Webtoons
      </Typography>
      <Grid container spacing={3}>
        {webtoons.map((webtoon) => (
          <Grid item xs={12} sm={6} md={4} key={webtoon._id}>
            <Card style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                alt={webtoon.title}
                height="140"
                image={webtoon.thumbnail}
              />
              <CardContent>
                <Link to={`/webtoons/${webtoon._id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="h6">{webtoon.title}</Typography>
                </Link>
                <Typography variant="body2" color="textSecondary">
                  {webtoon.description}
                </Typography>
              </CardContent>
              <IconButton
                onClick={() => handleFavoriteToggle(webtoon)}
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                {favorites.some((fav) => fav._id === webtoon._id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
