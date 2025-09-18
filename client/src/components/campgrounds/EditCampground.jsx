import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
  Container,
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Grid
} from '../ui/MaterialUI';

const EditCampground = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const response = await api.get(`/campgrounds/${id}`);
        if (response.data.success) {
          const campground = response.data.campground;
          
          // Check if user is the author
          if (!user || campground.author._id !== user.id) {
            setError('You are not authorized to edit this campground');
            setLoading(false);
            return;
          }

          setFormData({
            title: campground.title || '',
            location: campground.location || '',
            price: campground.price || '',
            description: campground.description || ''
          });
          setExistingImages(campground.images || []);
        } else {
          setError('Campground not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch campground');
      } finally {
        setLoading(false);
      }
    };

    fetchCampground();
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleDeleteImage = (imageFilename) => {
    setImagesToDelete(prev => [...prev, imageFilename]);
    setExistingImages(prev => prev.filter(img => img.filename !== imageFilename));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);

      // Add new images
      images.forEach(image => {
        formDataToSend.append('image', image);
      });

      // Add images to delete
      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach(filename => {
          formDataToSend.append('deleteImages', filename);
        });
      }

      const response = await api.put(`/campgrounds/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess('Campground updated successfully!');
        setTimeout(() => {
          navigate(`/campgrounds/${id}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update campground');
    } finally {
      setSubmitting(false);
    }
  };

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
            Loading campground...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error && !formData.title) {
    return (
      <Container maxWidth="md" sx={{ paddingY: '3rem' }}>
        <Box 
          sx={{
            backgroundColor: 'var(--mui-error-light)',
            color: 'var(--mui-error-dark)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--mui-error-main)',
            marginBottom: '1rem'
          }}
        >
          <Typography variant="h6">{error}</Typography>
        </Box>
        <Button
          component={Link}
          to="/campgrounds"
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Back to Campgrounds
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingY: '2rem' }}>
      <Container maxWidth="md">
        {/* Back Button */}
        <Box sx={{ marginBottom: '2rem' }}>
          <Button
            component={Link}
            to={`/campgrounds/${id}`}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '25px'
            }}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
            Back to Campground
          </Button>
        </Box>

        <Card sx={{ borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ padding: '2rem' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
              Edit Campground
            </Typography>

            {/* Success Message */}
            {success && (
              <Box 
                sx={{
                  backgroundColor: 'var(--mui-success-light)',
                  color: 'var(--mui-success-dark)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--mui-success-main)',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
                {success}
              </Box>
            )}

            {/* Error Message */}
            {error && (
              <Box 
                sx={{
                  backgroundColor: 'var(--mui-error-light)',
                  color: 'var(--mui-error-dark)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--mui-error-main)',
                  marginBottom: '1.5rem'
                }}
              >
                <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
                {error}
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Campground Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder="Enter campground name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder="City, State or Country"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Price per Night"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <Typography variant="h6" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Description
                    </Typography>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your campground..."
                      required
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        border: '1px solid var(--mui-grey-300)',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </Box>
                </Grid>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                      Current Images
                    </Typography>
                    <Grid container spacing={2}>
                      {existingImages.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Box sx={{ position: 'relative' }}>
                            <img
                              src={image.url}
                              alt={`Campground ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                            />
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleDeleteImage(image.filename)}
                              sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                minWidth: '32px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                padding: 0
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}

                {/* New Images */}
                <Grid item xs={12}>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <Typography variant="h6" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Add New Images
                    </Typography>
                    <input
                      type="file"
                      name="images"
                      onChange={handleImageChange}
                      multiple
                      accept="image/*"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--mui-grey-300)',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <Typography variant="body2" sx={{ marginTop: '0.5rem', color: 'var(--mui-grey-600)' }}>
                      Select multiple images to add to your campground
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={submitting}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '12px 32px',
                        borderRadius: '25px',
                        minWidth: '200px'
                      }}
                    >
                      {submitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
                          Update Campground
                        </>
                      )}
                    </Button>

                    <Button
                      component={Link}
                      to={`/campgrounds/${id}`}
                      variant="outlined"
                      disabled={submitting}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '12px 32px',
                        borderRadius: '25px'
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EditCampground;