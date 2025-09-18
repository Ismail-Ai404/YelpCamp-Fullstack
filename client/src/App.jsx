import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/ui/MaterialUI';
import ErrorBoundary from './components/ErrorBoundary';
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
import './components/ui/MaterialUI.css';
import './App.css';

function App() {
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
            <Route path="*" element={<div className="container mt-5"><h2>Page Not Found</h2></div>} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
