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
  Box
} from '../ui/MaterialUI';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
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

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await register(formData.email, formData.username, formData.password);
    
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
        padding: { xs: '1.5rem', sm: '2rem', md: '3rem' }
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
          <CardContent sx={{ padding: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
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
                Join YelpCamp
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                Create your account to start exploring
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

            {/* Register Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '1.5rem' }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                  fullWidth
                  variant="outlined"
                />
              </Box>

              <Box sx={{ marginBottom: '1.5rem' }}>
                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
              </Box>

              <Box sx={{ marginBottom: '1.5rem' }}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  helperText="Password must be at least 6 characters long."
                />
              </Box>

              <Box sx={{ marginBottom: '2rem' }}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  error={formData.confirmPassword && formData.password !== formData.confirmPassword}
                  helperText={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
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
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </Box>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <Typography 
                  component={Link} 
                  to="/login" 
                  sx={{ 
                    color: 'var(--mui-primary-main)', 
                    textDecoration: 'none',
                    fontWeight: 'medium',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Login here
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;