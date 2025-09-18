import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Rating
} from '../ui/MaterialUI';
import api from '../../utils/api';

const ReviewForm = ({ campgroundId, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    body: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating || !formData.body.trim()) {
      setError('Please provide both a rating and review text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post(`/campgrounds/${campgroundId}/reviews`, {
        body: formData.body,
        rating: formData.rating
      });

      if (response.data.success) {
        setFormData({ body: '', rating: 0 });
        if (onReviewAdded) {
          onReviewAdded(response.data.review);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <i className="fas fa-plus-circle" style={{ marginRight: '12px', color: 'var(--mui-primary-main)' }}></i>
          Leave a Review
        </Typography>

        {error && (
          <Box
            sx={{
              backgroundColor: 'var(--mui-error-light)',
              color: 'var(--mui-error-dark)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid var(--mui-error-main)'
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: '1.5rem' }}>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem', fontWeight: 'medium' }}>
              Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Box sx={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Box
                    key={star}
                    component="button"
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    sx={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: '2rem',
                      color: star <= formData.rating ? '#ffc107' : 'var(--mui-grey-300)',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: star <= formData.rating ? '#ffb300' : 'var(--mui-grey-400)',
                      }
                    }}
                  >
                    ★
                  </Box>
                ))}
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--mui-grey-600)' }}>
                {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Click to rate'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginBottom: '2rem' }}>
            <TextField
              label="Your Review"
              name="body"
              multiline
              rows={4}
              value={formData.body}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              placeholder="Share your experience at this campground..."
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              padding: '12px 32px',
              borderRadius: '25px',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Posting Review...' : 'Post Review'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;