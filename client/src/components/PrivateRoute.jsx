import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container, Box, Typography } from './ui/MaterialUI';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box 
        sx={{
          minHeight: '60vh',
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
            Authenticating...
          </Typography>
        </Box>
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;