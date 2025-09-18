import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import Map from '../ui/Map';
import ReviewForm from '../reviews/ReviewForm';
import ReviewsList from '../reviews/ReviewsList';
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid
} from '../ui/MaterialUI';

const CampgroundDetail = () => {
  const [campground, setCampground] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const response = await api.get(`/campgrounds/${id}`);
        if (response.data.success) {
          setCampground(response.data.campground);
          
          // Fetch reviews for this campground
          try {
            const reviewsResponse = await api.get(`/campgrounds/${id}/reviews`);
            if (reviewsResponse.data.success) {
              setReviews(reviewsResponse.data.reviews || []);
            }
          } catch (reviewErr) {
            console.error('Failed to fetch reviews:', reviewErr);
            // Don't set error state for reviews, just continue
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch campground');
      } finally {
        setLoading(false);
      }
    };

    fetchCampground();
  }, [id]);

  // Handle review submission
  const handleReviewSubmitted = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  // Handle review deletion
  const handleReviewDeleted = (reviewId) => {
    setReviews(prev => prev.filter(review => review._id !== reviewId));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campground?')) {
      setDeleting(true);
      try {
        await api.delete(`/campgrounds/${id}`);
        navigate('/campgrounds');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete campground');
        setDeleting(false);
      }
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

  if (error) {
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

  if (!campground) {
    return (
      <Container maxWidth="md" sx={{ paddingY: '3rem' }}>
        <Box 
          sx={{
            backgroundColor: 'var(--mui-warning-light)',
            color: 'var(--mui-warning-dark)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--mui-warning-main)',
            marginBottom: '1rem'
          }}
        >
          <Typography variant="h6">Campground not found</Typography>
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

  const isOwner = user && campground.author && user.id === campground.author._id;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingY: '2rem' }}>
      <Container maxWidth="xl">
        {/* Back Button */}
        <Box sx={{ marginBottom: '2rem' }}>
          <Button
            component={Link}
            to="/campgrounds"
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '25px'
            }}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
            Back to Campgrounds
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Images and Map */}
          <Grid item xs={12} lg={6}>
            {/* Images */}
            {campground.images && campground.images.length > 0 ? (
              <Box sx={{ marginBottom: '2rem' }}>
                <Box
                  component="img"
                  src={campground.images[0].url}
                  alt={campground.title}
                  sx={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
                {campground.images.length > 1 && (
                  <Box sx={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {campground.images.slice(1, 4).map((image, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={image.url}
                        alt={`${campground.title} ${index + 2}`}
                        sx={{
                          width: 'calc(33.33% - 6px)',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  height: '400px',
                  backgroundColor: 'var(--mui-grey-200)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  marginBottom: '2rem'
                }}
              >
                <Typography variant="h6" sx={{ color: 'var(--mui-grey-500)' }}>
                  No images available
                </Typography>
              </Box>
            )}

            {/* Map Card */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-map-marked-alt" style={{ marginRight: '12px', color: 'var(--mui-primary-main)' }}></i>
                  Location
                </Typography>
                
                <Box
                  sx={{
                    backgroundColor: 'var(--mui-primary-main)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '1.5rem'
                  }}
                >
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                  {campground.location}
                </Box>

                {/* Interactive Map */}
                {campground.geometry && campground.geometry.coordinates && (
                  <Box sx={{ height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                    <Map 
                      campgrounds={[{
                        ...campground,
                        popupText: `<strong>${campground.title}</strong><br/>${campground.location}`
                      }]} 
                      center={[
                        campground.geometry.coordinates[1], 
                        campground.geometry.coordinates[0]
                      ]}
                      zoom={12}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Details */}
          <Grid item xs={12} lg={6}>
            {/* Main Details Card */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                  {campground.title}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'var(--mui-grey-600)', 
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '8px', color: 'var(--mui-success-main)' }}></i>
                  {campground.location}
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {campground.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <Typography variant="h4" sx={{ color: 'var(--mui-success-main)', fontWeight: 'bold' }}>
                    ${campground.price}
                    <Typography component="span" variant="h6" sx={{ color: 'var(--mui-grey-600)', fontWeight: 'normal' }}>
                      {' '}/ night
                    </Typography>
                  </Typography>
                  
                  {campground.author && (
                    <Typography variant="body2" sx={{ color: 'var(--mui-grey-600)', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
                      By <strong style={{ marginLeft: '4px' }}>{campground.author.username}</strong>
                    </Typography>
                  )}
                </Box>

                {/* Owner Actions */}
                {isOwner && (
                  <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      to={`/campgrounds/${campground._id}/edit`}
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '12px 24px',
                        borderRadius: '25px'
                      }}
                    >
                      <i className="fas fa-edit" style={{ marginRight: '8px' }}></i>
                      Edit Campground
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                      disabled={deleting}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '12px 24px',
                        borderRadius: '25px'
                      }}
                    >
                      <i className="fas fa-trash" style={{ marginRight: '8px' }}></i>
                      {deleting ? 'Deleting...' : 'Delete Campground'}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Reviews Card */}
            <Card sx={{ borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ padding: '2rem' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-star" style={{ marginRight: '12px', color: '#ffc107' }}></i>
                  Reviews
                  {reviews.length > 0 && (
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: 'var(--mui-primary-main)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        marginLeft: '12px'
                      }}
                    >
                      {reviews.length}
                    </Box>
                  )}
                </Typography>
                
                {/* Review Form - Only show for logged-in users who are not the owner */}
                {user && !isOwner && (
                  <Box sx={{ marginBottom: '2rem' }}>
                    <ReviewForm 
                      campgroundId={campground._id}
                      onReviewSubmitted={handleReviewSubmitted}
                    />
                  </Box>
                )}
                
                {/* Reviews List */}
                <ReviewsList 
                  reviews={reviews}
                  campgroundId={campground._id}
                  onReviewDeleted={handleReviewDeleted}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CampgroundDetail;