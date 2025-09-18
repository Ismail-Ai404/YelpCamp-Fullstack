import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Grid
} from '../ui/MaterialUI';

const CampgroundsList = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get('/api/campgrounds');
        if (response.data.success) {
          setCampgrounds(response.data.campgrounds);
        }
      } catch (err) {
        setError('Failed to fetch campgrounds');
        console.error('Error fetching campgrounds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampgrounds();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box 
            sx={{
              width: '60px',
              height: '60px',
              border: '4px solid var(--mui-success-light)',
              borderTop: '4px solid var(--mui-success-main)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}
          />
          <Typography variant="h6" sx={{ color: 'var(--mui-grey-600)' }}>
            Loading campgrounds...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ paddingY: '3rem' }}>
        <Box 
          sx={{
            textAlign: 'center',
            backgroundColor: 'var(--mui-error-light)',
            border: '1px solid var(--mui-error-main)',
            borderRadius: '8px',
            padding: '2rem',
            color: 'var(--mui-error-dark)'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
            Error
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            {error}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="xl" sx={{ paddingY: '3rem' }}>
        {/* Header */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  marginBottom: { xs: '0.5rem', md: '0' },
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <i className="fas fa-mountain" style={{ color: 'var(--mui-success-main)', marginRight: '16px' }}></i>
                All Campgrounds
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'var(--mui-grey-600)',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                Discover amazing campgrounds around the world
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Button
                component={Link}
                to="/campgrounds/new"
                variant="contained"
                color="success"
                size="large"
                sx={{
                  width: { xs: '100%', md: 'auto' },
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                Add New Campground
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        {campgrounds.length === 0 ? (
          <Box sx={{ textAlign: 'center', paddingY: '4rem' }}>
            <i 
              className="fas fa-campground" 
              style={{ 
                fontSize: '6rem', 
                color: 'var(--mui-grey-400)',
                marginBottom: '2rem',
                display: 'block'
              }}
            ></i>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              No campgrounds yet!
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'var(--mui-grey-600)', 
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}
            >
              Be the first to add a campground and start sharing your outdoor adventures.
            </Typography>
            <Button
              component={Link}
              to="/campgrounds/new"
              variant="contained"
              color="success"
              size="large"
              sx={{ textTransform: 'none', fontSize: '1.1rem' }}
            >
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
              Add New Campground
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {campgrounds.map((campground) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={campground._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 'var(--mui-shadow-6)'
                    }
                  }}
                >
                  {campground.images && campground.images.length > 0 ? (
                    <CardMedia
                      image={campground.images[0].url}
                      title={campground.title}
                      height="250px"
                    />
                  ) : (
                    <Box 
                      sx={{
                        height: '250px',
                        backgroundColor: 'var(--mui-grey-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i 
                        className="fas fa-image" 
                        style={{ fontSize: '4rem', color: 'var(--mui-grey-400)' }}
                      ></i>
                    </Box>
                  )}
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {campground.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'var(--mui-grey-600)', 
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <i className="fas fa-map-marker-alt" style={{ color: 'var(--mui-success-main)', marginRight: '4px' }}></i>
                      {campground.location}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        flexGrow: 1, 
                        marginBottom: '1rem',
                        color: 'var(--mui-grey-700)'
                      }}
                    >
                      {campground.description.length > 100
                        ? `${campground.description.substring(0, 100)}...`
                        : campground.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <Typography variant="h6" sx={{ color: 'var(--mui-success-main)', fontWeight: 'bold' }}>
                        ${campground.price}
                        <Typography component="span" variant="body2" sx={{ color: 'var(--mui-grey-600)', fontWeight: 'normal' }}>
                          /night
                        </Typography>
                      </Typography>
                      <Button 
                        component={Link} 
                        to={`/campgrounds/${campground._id}`} 
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        View Details
                      </Button>
                    </Box>
                    
                    {campground.author && (
                      <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)', fontSize: '0.875rem' }}>
                        <i className="fas fa-user" style={{ marginRight: '4px' }}></i>
                        By {campground.author.username}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CampgroundsList;
