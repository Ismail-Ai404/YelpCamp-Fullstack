import React from 'react';
import { Container, Card, CardContent, Button, Typography, Box } from './ui/MaterialUI';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingY: '3rem' }}>
          <Container maxWidth="md">
            <Card sx={{ borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ padding: '3rem', textAlign: 'center' }}>
                {/* Error Icon */}
                <Box sx={{ marginBottom: '2rem' }}>
                  <i 
                    className="fas fa-exclamation-triangle" 
                    style={{ 
                      fontSize: '4rem', 
                      color: 'var(--mui-error-main)',
                      marginBottom: '1rem',
                      display: 'block' 
                    }}
                  ></i>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem', color: 'var(--mui-error-main)' }}>
                    Oops! Something went wrong
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--mui-grey-600)', marginBottom: '2rem' }}>
                    We're sorry, but something unexpected happened. This error has been logged and we'll look into it.
                  </Typography>
                </Box>

                {/* Error Details (in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <Box 
                    sx={{
                      backgroundColor: 'var(--mui-grey-50)',
                      border: '1px solid var(--mui-grey-200)',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '2rem',
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant="h6" sx={{ marginBottom: '1rem', color: 'var(--mui-error-main)' }}>
                      Error Details:
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontFamily: 'monospace', 
                      fontSize: '0.875rem',
                      color: 'var(--mui-grey-800)',
                      whiteSpace: 'pre-wrap',
                      marginBottom: '1rem'
                    }}>
                      {this.state.error.toString()}
                    </Typography>
                    {this.state.errorInfo && (
                      <Typography variant="body2" sx={{ 
                        fontFamily: 'monospace', 
                        fontSize: '0.875rem',
                        color: 'var(--mui-grey-600)',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {this.state.errorInfo.componentStack}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReload}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '12px 24px',
                      borderRadius: '25px'
                    }}
                  >
                    <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
                    Reload Page
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={this.handleGoHome}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      padding: '12px 24px',
                      borderRadius: '25px'
                    }}
                  >
                    <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
                    Go Home
                  </Button>
                </Box>

                {/* Additional Help */}
                <Box sx={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--mui-info-light)', borderRadius: '8px' }}>
                  <Typography variant="body2" sx={{ color: 'var(--mui-info-dark)' }}>
                    <i className="fas fa-lightbulb" style={{ marginRight: '8px' }}></i>
                    <strong>Tip:</strong> If this problem persists, try clearing your browser cache or contact support.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;