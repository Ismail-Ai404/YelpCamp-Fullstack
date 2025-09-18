import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from './MaterialUI';

const ImageGallery = ({ 
  images = [], 
  title = 'Gallery',
  maxPreview = 4 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLightboxOpen, currentIndex]);

  const navigateImage = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  };

  if (!images || images.length === 0) {
    return null;
  }

  const displayImages = images.slice(0, maxPreview);
  const remainingCount = images.length - maxPreview;

  return (
    <>
      {/* Gallery Preview */}
      <Box>
        {/* Main Image */}
        <Box 
          sx={{ 
            position: 'relative', 
            marginBottom: '1rem',
            cursor: 'pointer',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0].url}
            alt={`${title} - Main`}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          {/* Zoom indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-expand"></i>
            View Full Size
          </Box>
        </Box>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {displayImages.slice(1).map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => openLightbox(index + 1)}
              >
                <img
                  src={image.url}
                  alt={`${title} ${index + 2}`}
                  style={{
                    width: 'calc((100% - 16px) / 3)',
                    minWidth: '100px',
                    height: '120px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>
            ))}

            {/* Show more button */}
            {remainingCount > 0 && (
              <Box
                sx={{
                  width: 'calc((100% - 16px) / 3)',
                  minWidth: '100px',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.9)'
                  }
                }}
                onClick={() => openLightbox(maxPreview)}
              >
                <i className="fas fa-plus" style={{ fontSize: '1.5rem' }}></i>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  +{remainingCount} more
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <i className="fas fa-times" style={{ fontSize: '1.5rem' }}></i>
          </IconButton>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                sx={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  minWidth: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <i className="fas fa-chevron-left"></i>
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                sx={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  minWidth: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <i className="fas fa-chevron-right"></i>
              </Button>
            </>
          )}

          {/* Main Image */}
          <Box
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].url}
              alt={`${title} ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
            />

            {/* Image Counter */}
            <Box
              sx={{
                marginTop: '16px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(4px)'
              }}
            >
              <Typography variant="body2">
                {currentIndex + 1} of {images.length}
              </Typography>
            </Box>
          </Box>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '8px',
                borderRadius: '8px',
                maxWidth: '80vw',
                overflowX: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: currentIndex === index ? '2px solid white' : '2px solid transparent',
                    opacity: currentIndex === index ? 1 : 0.6,
                    transition: 'opacity 0.2s ease',
                    flexShrink: 0
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: '60px',
                      height: '40px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default ImageGallery;