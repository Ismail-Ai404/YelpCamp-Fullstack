import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from '../ui/MaterialUI';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/campgrounds');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: { xs: '1rem', sm: '2rem' }
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
          <CardContent sx={{ padding: { xs: '2rem', sm: '3rem' } }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'var(--mui-primary-main)', 
                  marginBottom: '0.5rem' 
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                Sign in to your YelpCamp account
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Box 
                sx={{
                  backgroundColor: 'var(--mui-error-light)',
                  color: 'var(--mui-error-dark)',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginBottom: '1.5rem',
                  border: '1px solid var(--mui-error-main)'
                }}
              >
                <Typography variant="body2">{error}</Typography>
              </Box>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '1.5rem' }}>
                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoFocus
                  fullWidth
                  variant="outlined"
                />
              </Box>

              <Box sx={{ marginBottom: '2rem' }}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={loading}
                sx={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: '8px'
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>

            {/* Register Link */}
            <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Typography 
                  component={Link} 
                  to="/register" 
                  sx={{ 
                    color: 'var(--mui-primary-main)', 
                    textDecoration: 'none',
                    fontWeight: 'medium',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Register here
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;