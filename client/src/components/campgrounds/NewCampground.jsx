import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from '../ui/MaterialUI';

const NewCampground = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append image files
      images.forEach(image => {
        formDataToSend.append('image', image);
      });

      const response = await axios.post('/api/campgrounds', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate(`/campgrounds/${response.data.campground._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campground');
    } finally {
      setLoading(false);
    }
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
      <Container maxWidth="md">
        <Card sx={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
          <CardContent sx={{ padding: { xs: '2rem', sm: '3rem' } }}>
            <Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'var(--mui-primary-main)', 
                  marginBottom: '0.5rem' 
                }}
              >
                Create New Campground
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                Feature coming soon! This form will allow you to add new campgrounds.
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Button
                onClick={() => navigate('/campgrounds')}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
                Back to Campgrounds
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default NewCampground;