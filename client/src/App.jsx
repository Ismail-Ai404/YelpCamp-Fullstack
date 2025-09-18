import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/ui/MaterialUI';
import ErrorBoundary from './components/ErrorBoundary';
import useServiceWorker from './hooks/useServiceWorker';
import { Box, Button, Typography } from './components/ui/MaterialUI';
import Navigation from './components/layout/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/PrivateRoute';
// Campground components
import CampgroundsList from './components/campgrounds/CampgroundsList';
import CampgroundDetail from './components/campgrounds/CampgroundDetail';
import NewCampground from './components/campgrounds/NewCampground';
import EditCampground from './components/campgrounds/EditCampground';
import UserDashboard from './components/user/UserDashboard';
import './components/ui/MaterialUI.css';
import './App.css';

function App() {
  const { isOnline, updateAvailable, updateServiceWorker } = useServiceWorker();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      
      setInstallPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <div className="App">
            <Navigation />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Campground routes */}
            <Route path="/campgrounds" element={<CampgroundsList />} />
            <Route path="/campgrounds/:id" element={<CampgroundDetail />} />
            <Route 
              path="/campgrounds/new" 
              element={
                <PrivateRoute>
                  <NewCampground />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/campgrounds/:id/edit" 
              element={
                <PrivateRoute>
                  <EditCampground />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<div className="container mt-5"><h2>Page Not Found</h2></div>} />
            </Routes>
            
            {/* Offline Indicator */}
            {!isOnline && (
              <Box sx={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--mui-warning-main)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <i className="fas fa-wifi" style={{ opacity: 0.7 }}></i>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  You're currently offline
                </Typography>
              </Box>
            )}
            
            {/* Update Available Notification */}
            {updateAvailable && (
              <Box sx={{
                position: 'fixed',
                bottom: isOnline ? '20px' : '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--mui-primary-main)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Typography variant="body2">
                  New version available!
                </Typography>
                <Button
                  onClick={updateServiceWorker}
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    color: 'var(--mui-primary-main)',
                    textTransform: 'none',
                    minWidth: 'auto',
                    padding: '4px 12px',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  Update
                </Button>
              </Box>
            )}
            
            {/* PWA Install Prompt */}
            {showInstallPrompt && (
              <Box sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'var(--mui-success-main)',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                zIndex: 9999,
                maxWidth: '300px'
              }}>
                <Typography variant="body1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                  Install YelpCamp
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: '12px', opacity: 0.9 }}>
                  Install our app for a better experience!
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Button
                    onClick={handleInstallClick}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: 'white',
                      color: 'var(--mui-success-main)',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    Install
                  </Button>
                  <Button
                    onClick={() => setShowInstallPrompt(false)}
                    variant="text"
                    size="small"
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      minWidth: 'auto'
                    }}
                  >
                    Maybe later
                  </Button>
                </Box>
              </Box>
            )}
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
