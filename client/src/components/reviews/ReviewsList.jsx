import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box
} from '../ui/MaterialUI';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const ReviewsList = ({ reviews, campgroundId, onReviewDeleted }) => {
  const { user } = useAuth();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setDeletingId(reviewId);
    try {
      const response = await api.delete(`/campgrounds/${campgroundId}/reviews/${reviewId}`);
      if (response.data.success && onReviewDeleted) {
        onReviewDeleted(reviewId);
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{
          color: index < rating ? '#ffc107' : 'var(--mui-grey-300)',
          fontSize: '1.2rem',
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
      month: 'long',
      day: 'numeric'
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: '3rem', color: 'var(--mui-grey-600)' }}>
        <i className="fas fa-comment-dots" style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block', color: 'var(--mui-grey-400)' }}></i>
        <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
          No reviews yet
        </Typography>
        <Typography variant="body2">
          Be the first to share your experience!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {reviews.map((review) => (
        <Card 
          key={review._id} 
          sx={{ 
            borderRadius: '12px', 
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid var(--mui-grey-200)'
          }}
        >
          <CardContent sx={{ padding: '1.5rem' }}>
            {/* Review Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {review.author?.username || 'Anonymous'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Box>{renderStars(review.rating)}</Box>
                    <Typography variant="body2" sx={{ color: 'var(--mui-grey-600)' }}>
                      {review.rating} star{review.rating !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              {/* Delete button for review author */}
              {user && review.author?._id === user.id && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  disabled={deletingId === review._id}
                  onClick={() => handleDeleteReview(review._id)}
                  sx={{
                    textTransform: 'none',
                    minWidth: 'auto',
                    padding: '6px 12px',
                    borderRadius: '20px'
                  }}
                >
                  {deletingId === review._id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-trash"></i>
                  )}
                </Button>
              )}
            </Box>

            {/* Review Body */}
            <Typography 
              variant="body1" 
              sx={{ 
                marginBottom: '1rem', 
                lineHeight: 1.6,
                color: 'var(--mui-grey-800)'
              }}
            >
              {review.body}
            </Typography>

            {/* Review Date */}
            <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)', fontSize: '0.875rem' }}>
              <i className="fas fa-calendar" style={{ marginRight: '6px' }}></i>
              {review.createdAt ? formatDate(review.createdAt) : 'Recently posted'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewsList;