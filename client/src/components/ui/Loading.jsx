import React from 'react';
import { Box, Typography } from './MaterialUI';

const Loading = ({ 
  variant = 'default', // 'default', 'fullscreen', 'inline', 'button'
  size = 'medium', // 'small', 'medium', 'large'
  message = 'Loading...',
  color = 'primary' // 'primary', 'secondary', 'success', 'error'
}) => {
  const sizes = {
    small: { width: '24px', height: '24px', fontSize: '0.875rem' },
    medium: { width: '40px', height: '40px', fontSize: '1rem' },
    large: { width: '60px', height: '60px', fontSize: '1.125rem' }
  };

  const colors = {
    primary: { main: 'var(--mui-primary-main)', light: 'var(--mui-primary-light)' },
    secondary: { main: 'var(--mui-secondary-main)', light: 'var(--mui-secondary-light)' },
    success: { main: 'var(--mui-success-main)', light: 'var(--mui-success-light)' },
    error: { main: 'var(--mui-error-main)', light: 'var(--mui-error-light)' }
  };

  const spinnerStyle = {
    width: sizes[size].width,
    height: sizes[size].height,
    border: `4px solid ${colors[color].light}`,
    borderTop: `4px solid ${colors[color].main}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  // Inline spinner (for buttons, small spaces)
  if (variant === 'inline') {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <Box sx={spinnerStyle} />
        {message && (
          <Typography variant="body2" sx={{ fontSize: sizes[size].fontSize }}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Button spinner (small, no text by default)
  if (variant === 'button') {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{
          ...spinnerStyle,
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          opacity: 0.8
        }} />
      </Box>
    );
  }

  // Fullscreen loading overlay
  if (variant === 'fullscreen') {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ ...spinnerStyle, margin: '0 auto 1rem' }} />
          <Typography variant="h6" sx={{ color: 'var(--mui-grey-600)' }}>
            {message}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Default centered loading
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: variant === 'default' ? '200px' : 'auto'
    }}>
      <Box sx={{ ...spinnerStyle, margin: '0 auto 1rem' }} />
      <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)', fontSize: sizes[size].fontSize }}>
        {message}
      </Typography>
    </Box>
  );
};

// Skeleton loading component for content placeholders
export const SkeletonLoader = ({ 
  variant = 'rectangular', // 'text', 'rectangular', 'circular'
  width = '100%',
  height = '1rem',
  count = 1
}) => {
  const getSkeletonStyle = () => {
    const baseStyle = {
      backgroundColor: 'var(--mui-grey-200)',
      backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
      backgroundSize: '200px 100%',
      backgroundPosition: '-200px 0',
      animation: 'shimmer 1.5s ease-in-out infinite',
      width,
      height,
      marginBottom: count > 1 ? '8px' : 0
    };

    if (variant === 'circular') {
      return { ...baseStyle, borderRadius: '50%' };
    } else if (variant === 'text') {
      return { ...baseStyle, borderRadius: '4px', height: height || '1rem' };
    } else {
      return { ...baseStyle, borderRadius: '8px' };
    }
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box key={index} sx={getSkeletonStyle()} />
  ));

  return count === 1 ? skeletons[0] : <Box>{skeletons}</Box>;
};

// Card skeleton loader
export const CardSkeleton = () => (
  <Box sx={{ 
    padding: '1rem', 
    border: '1px solid var(--mui-grey-200)', 
    borderRadius: '8px',
    backgroundColor: 'white'
  }}>
    <SkeletonLoader variant="rectangular" height="200px" />
    <Box sx={{ marginTop: '1rem' }}>
      <SkeletonLoader variant="text" height="1.5rem" width="80%" />
      <SkeletonLoader variant="text" height="1rem" width="60%" />
      <Box sx={{ marginTop: '0.5rem' }}>
        <SkeletonLoader variant="text" height="1rem" count={2} />
      </Box>
    </Box>
  </Box>
);

export default Loading;