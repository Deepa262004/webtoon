 // src/components/Favorites.js
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Favorite Webtoons
      </Typography>
      <Grid container spacing={3}>
        {favorites.length === 0 ? (
          <Typography variant="h6">No favorites added yet.</Typography>
        ) : (
          favorites.map((webtoon) => (
            <Grid item xs={12} sm={6} md={4} key={webtoon._id}>
              <Card>
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
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Favorites;
