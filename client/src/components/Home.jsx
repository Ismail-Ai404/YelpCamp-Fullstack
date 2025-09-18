import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid
} from './ui/MaterialUI';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: { xs: '2rem 1rem', sm: '3rem 2rem' },
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Main Title */}
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
              fontWeight: 'bold',
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              animation: 'slideUp 0.8s ease-out'
            }}
          >
            <i className="fas fa-campground" style={{ marginRight: '1rem', color: '#4caf50' }}></i>
            YelpCamp
          </Typography>

          {/* Description */}
          <Typography 
            variant="h5" 
            component="p" 
            sx={{
              marginBottom: '3rem',
              lineHeight: 1.8,
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              opacity: 0.95,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
          >
            Welcome to YelpCamp! Jump right in and explore our many campgrounds.
            <br style={{ display: { xs: 'none', sm: 'block' } }} />
            Feel free to share some of your own and comment on others!
          </Typography>

          {/* Action Buttons */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '4rem'
            }}
          >
            {user ? (
              <Button
                component={Link}
                to="/campgrounds"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  padding: '12px 32px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-mountain" style={{ marginRight: '8px' }}></i>
                View Campgrounds
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/campgrounds"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: '#1976d2',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-mountain" style={{ marginRight: '8px' }}></i>
                  View Campgrounds
                </Button>
                
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i>
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Feature Icons */}
          <Grid container spacing={4} sx={{ justifyContent: 'center', marginTop: '2rem' }}>
            <Grid item xs={4} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <i 
                  className="fas fa-map-marked-alt" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#4caf50', 
                    opacity: 0.8,
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}
                ></i>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Explore
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={4} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <i 
                  className="fas fa-camera" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#4caf50', 
                    opacity: 0.8,
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}
                ></i>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Share
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={4} sm={3} md={2}>
              <Box sx={{ textAlign: 'center' }}>
                <i 
                  className="fas fa-star" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#4caf50', 
                    opacity: 0.8,
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}
                ></i>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Review
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
