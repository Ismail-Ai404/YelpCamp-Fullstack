import React, { useState, useRef, useEffect } from 'react';
import { Box } from './MaterialUI';

const LazyImage = ({ 
  src, 
  alt, 
  placeholder, 
  className = '',
  style = {},
  onLoad,
  onError,
  threshold = 0.1,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc === placeholder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !loading && !loaded) {
                setLoading(true);
                setImageSrc(src);
              }
            });
          },
          {
            threshold,
            rootMargin: '50px'
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for browsers without IntersectionObserver
        setImageSrc(src);
      }
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src, threshold, loading, loaded]);

  const handleLoad = () => {
    setLoaded(true);
    setLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    if (onError) onError();
  };

  const imageStyle = {
    ...style,
    transition: 'opacity 0.3s ease',
    opacity: loaded ? 1 : loading ? 0.7 : 0.5,
  };

  return (
    <Box 
      ref={setImageRef}
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--mui-grey-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...props}
    >
      {error ? (
        <Box sx={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--mui-grey-500)',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <i className="fas fa-image" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
          <span style={{ fontSize: '0.8rem' }}>Failed to load</span>
        </Box>
      ) : (
        <>
          <img
            src={imageSrc}
            alt={alt}
            className={className}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
          />
          
          {loading && !loaded && (
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}>
              <Box sx={{
                width: '24px',
                height: '24px',
                border: '2px solid var(--mui-grey-300)',
                borderTop: '2px solid var(--mui-primary-main)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default LazyImage;