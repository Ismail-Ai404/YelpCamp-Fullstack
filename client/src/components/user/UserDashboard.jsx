import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  Avatar
} from '../ui/MaterialUI';
import Loading from '../ui/Loading';

const UserDashboard = () => {
  const { user } = useAuth();
  const [userCampgrounds, setUserCampgrounds] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('campgrounds');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setError('Please log in to view your dashboard');
        setLoading(false);
        return;
      }

      try {
        // Fetch user's campgrounds
        const campgroundsResponse = await api.get('/campgrounds');
        if (campgroundsResponse.data.success) {
          const allCampgrounds = campgroundsResponse.data.campgrounds;
          const ownedCampgrounds = allCampgrounds.filter(
            campground => campground.author && campground.author._id === user.id
          );
          setUserCampgrounds(ownedCampgrounds);
        }

        // Fetch user's reviews (we'll need to get reviews from all campgrounds and filter)
        const reviewsResponse = await api.get('/campgrounds');
        if (reviewsResponse.data.success) {
          const allCampgrounds = reviewsResponse.data.campgrounds;
          const userReviewsData = [];
          
          for (const campground of allCampgrounds) {
            try {
              const campgroundReviews = await api.get(`/campgrounds/${campground._id}/reviews`);
              if (campgroundReviews.data.success) {
                const reviews = campgroundReviews.data.reviews.filter(
                  review => review.author && review.author._id === user.id
                );
                reviews.forEach(review => {
                  userReviewsData.push({
                    ...review,
                    campgroundTitle: campground.title,
                    campgroundId: campground._id
                  });
                });
              }
            } catch (reviewErr) {
              console.error(`Error fetching reviews for ${campground.title}:`, reviewErr);
            }
          }
          
          setUserReviews(userReviewsData);
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleDeleteCampground = async (campgroundId) => {
    if (!window.confirm('Are you sure you want to delete this campground?')) {
      return;
    }

    try {
      await api.delete(`/campgrounds/${campgroundId}`);
      setUserCampgrounds(prev => prev.filter(campground => campground._id !== campgroundId));
    } catch (err) {
      console.error('Error deleting campground:', err);
      alert('Failed to delete campground');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          color: index < rating ? '#ffc107' : 'var(--mui-grey-300)',
          fontSize: '1rem',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <Loading variant="fullscreen" message="Loading your dashboard..." />;
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ paddingY: '3rem' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
            Please Log In
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '2rem', color: 'var(--mui-grey-600)' }}>
            You need to be logged in to view your dashboard.
          </Typography>
          <Button component={Link} to="/login" variant="contained">
            Log In
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingY: '2rem' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent sx={{ padding: '2rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <Avatar
                  sx={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'var(--mui-primary-main)',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Welcome back, {user.username}!
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                    Manage your campgrounds and reviews from your personal dashboard
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/campgrounds/new"
                    variant="contained"
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '10px 20px',
                      borderRadius: '25px'
                    }}
                  >
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                    Add Campground
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ marginBottom: '3rem' }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: '12px', textAlign: 'center' }}>
              <CardContent sx={{ padding: '1.5rem' }}>
                <Box sx={{ marginBottom: '1rem' }}>
                  <i className="fas fa-mountain" style={{ fontSize: '2.5rem', color: 'var(--mui-primary-main)' }}></i>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'var(--mui-primary-main)' }}>
                  {userCampgrounds.length}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                  Your Campgrounds
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: '12px', textAlign: 'center' }}>
              <CardContent sx={{ padding: '1.5rem' }}>
                <Box sx={{ marginBottom: '1rem' }}>
                  <i className="fas fa-star" style={{ fontSize: '2.5rem', color: '#ffc107' }}></i>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffc107' }}>
                  {userReviews.length}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                  Reviews Written
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: '12px', textAlign: 'center' }}>
              <CardContent sx={{ padding: '1.5rem' }}>
                <Box sx={{ marginBottom: '1rem' }}>
                  <i className="fas fa-eye" style={{ fontSize: '2.5rem', color: 'var(--mui-success-main)' }}></i>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'var(--mui-success-main)' }}>
                  {userCampgrounds.reduce((total, camp) => total + (camp.reviews?.length || 0), 0)}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)' }}>
                  Total Views
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tab Navigation */}
        <Box sx={{ marginBottom: '2rem' }}>
          <Box sx={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--mui-grey-200)' }}>
            <Button
              onClick={() => setActiveTab('campgrounds')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: activeTab === 'campgrounds' ? 'var(--mui-primary-main)' : 'transparent',
                color: activeTab === 'campgrounds' ? 'white' : 'var(--mui-grey-600)',
                '&:hover': {
                  backgroundColor: activeTab === 'campgrounds' ? 'var(--mui-primary-main)' : 'var(--mui-grey-100)'
                }
              }}
            >
              <i className="fas fa-mountain" style={{ marginRight: '8px' }}></i>
              My Campgrounds ({userCampgrounds.length})
            </Button>
            <Button
              onClick={() => setActiveTab('reviews')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: activeTab === 'reviews' ? 'var(--mui-primary-main)' : 'transparent',
                color: activeTab === 'reviews' ? 'white' : 'var(--mui-grey-600)',
                '&:hover': {
                  backgroundColor: activeTab === 'reviews' ? 'var(--mui-primary-main)' : 'var(--mui-grey-100)'
                }
              }}
            >
              <i className="fas fa-star" style={{ marginRight: '8px' }}></i>
              My Reviews ({userReviews.length})
            </Button>
          </Box>
        </Box>

        {/* Tab Content */}
        {activeTab === 'campgrounds' && (
          <Box>
            {userCampgrounds.length === 0 ? (
              <Card sx={{ borderRadius: '16px', textAlign: 'center' }}>
                <CardContent sx={{ padding: '3rem' }}>
                  <i className="fas fa-mountain" style={{ fontSize: '4rem', color: 'var(--mui-grey-400)', marginBottom: '1rem', display: 'block' }}></i>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    No campgrounds yet
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)', marginBottom: '2rem' }}>
                    Start sharing your favorite camping spots with the community!
                  </Typography>
                  <Button
                    component={Link}
                    to="/campgrounds/new"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                  >
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                    Add Your First Campground
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {userCampgrounds.map((campground) => (
                  <Grid item xs={12} sm={6} lg={4} key={campground._id}>
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      }
                    }}>
                      {campground.images && campground.images.length > 0 ? (
                        <Box
                          component="img"
                          src={campground.images[0].url}
                          alt={campground.title}
                          sx={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Box 
                          sx={{
                            height: '200px',
                            backgroundColor: 'var(--mui-grey-200)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className="fas fa-image" style={{ fontSize: '3rem', color: 'var(--mui-grey-400)' }}></i>
                        </Box>
                      )}
                      
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                          {campground.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--mui-grey-600)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                          <i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: 'var(--mui-success-main)' }}></i>
                          {campground.location}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          flexGrow: 1, 
                          marginBottom: '1rem',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden'
                        }}>
                          {campground.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <Typography variant="h6" sx={{ color: 'var(--mui-success-main)', fontWeight: 'bold' }}>
                            ${campground.price}/night
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)' }}>
                            {campground.reviews ? campground.reviews.length : 0} reviews
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          <Button
                            component={Link}
                            to={`/campgrounds/${campground._id}`}
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: 'none', flex: 1 }}
                          >
                            View
                          </Button>
                          <Button
                            component={Link}
                            to={`/campgrounds/${campground._id}/edit`}
                            variant="contained"
                            size="small"
                            sx={{ textTransform: 'none', flex: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteCampground(campground._id)}
                            sx={{ textTransform: 'none', minWidth: 'auto' }}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {activeTab === 'reviews' && (
          <Box>
            {userReviews.length === 0 ? (
              <Card sx={{ borderRadius: '16px', textAlign: 'center' }}>
                <CardContent sx={{ padding: '3rem' }}>
                  <i className="fas fa-star" style={{ fontSize: '4rem', color: 'var(--mui-grey-400)', marginBottom: '1rem', display: 'block' }}></i>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                    No reviews yet
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)', marginBottom: '2rem' }}>
                    Start exploring campgrounds and share your experiences!
                  </Typography>
                  <Button
                    component={Link}
                    to="/campgrounds"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                  >
                    <i className="fas fa-search" style={{ marginRight: '8px' }}></i>
                    Browse Campgrounds
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {userReviews.map((review) => (
                  <Grid item xs={12} key={review._id}>
                    <Card sx={{ borderRadius: '12px' }}>
                      <CardContent sx={{ padding: '1.5rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <Box>
                            <Typography 
                              component={Link}
                              to={`/campgrounds/${review.campgroundId}`}
                              variant="h6" 
                              sx={{ 
                                fontWeight: 'bold', 
                                marginBottom: '0.5rem',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                  color: 'var(--mui-primary-main)'
                                }
                              }}
                            >
                              {review.campgroundTitle}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <Box>{renderStars(review.rating)}</Box>
                              <Typography variant="body2" sx={{ color: 'var(--mui-grey-600)' }}>
                                {review.rating} star{review.rating !== 1 ? 's' : ''}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)' }}>
                            {formatDate(review.createdAt)}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                          {review.body}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UserDashboard;