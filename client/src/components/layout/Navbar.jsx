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

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar px-0">
      <Container fluid className="px-3 px-md-5">
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <i className="fas fa-campground me-2"></i>
          YelpCamp
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/campgrounds" className="px-3">
              <i className="fas fa-mountain me-2"></i>
              Campgrounds
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/campgrounds/new" className="px-3">
                <i className="fas fa-plus me-2"></i>
                New Campground
              </Nav.Link>
            )}
          </Nav>
          
          <Nav className="ms-auto align-items-lg-center">
            {user ? (
              <>
                <Navbar.Text className="text-light me-3 d-none d-lg-block">
                  Welcome, <strong>{user.username}</strong>
                </Navbar.Text>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="btn"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="success" 
                  className="ms-2 btn"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
