import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Container,
  Box
} from '../ui/MaterialUI';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navLinks = [
    { to: '/campgrounds', text: 'Campgrounds', icon: 'fas fa-mountain' }
  ];

  const renderNavLinks = (mobile = false) => (
    <Box sx={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? '16px' : '24px' }}>
      {navLinks.map(link => (
        <Button
          key={link.to}
          component={Link}
          to={link.to}
          variant="text"
          onClick={mobile ? handleDrawerClose : undefined}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            justifyContent: mobile ? 'flex-start' : 'center',
            padding: mobile ? '12px 16px' : '8px 16px'
          }}
        >
          <i className={`${link.icon} ${mobile ? 'me-3' : 'me-2'}`} style={{ fontSize: '1rem' }}></i>
          {link.text}
        </Button>
      ))}
    </Box>
  );

  const renderAuthSection = (mobile = false) => (
    <Box sx={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? '12px' : '16px', alignItems: mobile ? 'stretch' : 'center' }}>
      {user ? (
        <>
          {!mobile && (
            <Typography variant="body1" sx={{ color: 'white', marginRight: '16px' }}>
              Welcome, <strong>{user.username}</strong>
            </Typography>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{
              color: 'white',
              borderColor: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'white'
              }
            }}
          >
            <i className="fas fa-sign-out-alt me-2"></i>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            to="/login"
            variant="text"
            onClick={mobile ? handleDrawerClose : undefined}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="success"
            onClick={mobile ? handleDrawerClose : undefined}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: { xs: '0 8px', sm: '0 16px' } }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                fontWeight: 800,
                fontSize: { xs: '1.4rem', sm: '1.7rem', md: '1.8rem' },
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                marginRight: { md: '48px' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'rgba(255,255,255,0.9)',
                  transform: 'scale(1.02)'
                }
              }}
            >
              <i className="fas fa-campground" style={{ fontSize: '1.6rem', marginRight: '12px', color: '#81c784' }}></i>
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>YelpCamp</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Yelp-Camp</Box>
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
              {renderNavLinks()}
            </Box>

            {/* Add New Campground Button (Desktop - Logged in users only) */}
            {user && (
              <Box sx={{ display: { xs: 'none', md: 'block' }, marginRight: '24px' }}>
                <Button
                  component={Link}
                  to="/campgrounds/new"
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '25px',
                    padding: '10px 20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-plus" style={{ marginRight: '8px', fontSize: '0.9rem' }}></i>
                  Add Campground
                </Button>
              </Box>
            )}

            {/* Desktop Auth Section */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {renderAuthSection()}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <i className="fas fa-bars"></i>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{
            width: 280,
            padding: '24px 16px',
            height: '100%',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '24px', fontWeight: 600 }}>
            Menu
          </Typography>
          
          {renderNavLinks(true)}
          
          {/* Add New Campground Button (Mobile - Logged in users only) */}
          {user && (
            <Box sx={{ marginTop: '24px' }}>
              <Button
                component={Link}
                to="/campgrounds/new"
                variant="contained"
                color="success"
                onClick={handleDrawerClose}
                sx={{
                  width: '100%',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '12px 16px',
                  borderRadius: '8px'
                }}
              >
                <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
                Add New Campground
              </Button>
            </Box>
          )}
          
          <Box sx={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
            {renderAuthSection(true)}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
