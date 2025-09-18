import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Grid,
  TextField
} from '../ui/MaterialUI';

const CampgroundsList = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [filteredCampgrounds, setFilteredCampgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'location'

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await api.get('/campgrounds');
        if (response.data.success) {
          setCampgrounds(response.data.campgrounds);
          setFilteredCampgrounds(response.data.campgrounds);
        }
      } catch (err) {
        setError('Failed to fetch campgrounds');
        console.error('Error fetching campgrounds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampgrounds();
  }, []);

  // Filter and sort campgrounds based on search criteria
  useEffect(() => {
    let filtered = [...campgrounds];

    // Filter by search term (title and location)
    if (searchTerm) {
      filtered = filtered.filter(campground => 
        campground.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campground.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campground.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (priceFilter.min) {
      filtered = filtered.filter(campground => campground.price >= parseFloat(priceFilter.min));
    }
    if (priceFilter.max) {
      filtered = filtered.filter(campground => campground.price <= parseFloat(priceFilter.max));
    }

    // Sort campgrounds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'location':
          return a.location.localeCompare(b.location);
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredCampgrounds(filtered);
  }, [campgrounds, searchTerm, priceFilter, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceFilterChange = (type, value) => {
    setPriceFilter(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter({ min: '', max: '' });
    setSortBy('name');
  };

  if (loading) {
    return (
      <Box 
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box 
            sx={{
              width: '60px',
              height: '60px',
              border: '4px solid var(--mui-success-light)',
              borderTop: '4px solid var(--mui-success-main)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}
          />
          <Typography variant="h6" sx={{ color: 'var(--mui-grey-600)' }}>
            Loading campgrounds...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ paddingY: '3rem' }}>
        <Box 
          sx={{
            textAlign: 'center',
            backgroundColor: 'var(--mui-error-light)',
            border: '1px solid var(--mui-error-main)',
            borderRadius: '8px',
            padding: '2rem',
            color: 'var(--mui-error-dark)'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
            Error
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
            {error}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="xl" sx={{ paddingY: '3rem' }}>
        {/* Header */}
        <Box sx={{ marginBottom: '3rem', textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            <i className="fas fa-mountain" style={{ color: 'var(--mui-success-main)', marginRight: '16px', fontSize: '0.9em' }}></i>
            All Campgrounds
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'var(--mui-grey-600)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}
          >
            Discover amazing campgrounds around the world
          </Typography>
          
          {/* Results count */}
          <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)' }}>
            {filteredCampgrounds.length} of {campgrounds.length} campgrounds
            {(searchTerm || priceFilter.min || priceFilter.max) && ' (filtered)'}
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Card sx={{ marginBottom: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ padding: '2rem' }}>
            <Grid container spacing={3} alignItems="center">
              {/* Search Bar */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Search campgrounds"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name, location, or description..."
                  fullWidth
                  sx={{
                    '& .mui-textfield-input': {
                      paddingLeft: '40px'
                    }
                  }}
                />
                <i 
                  className="fas fa-search" 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--mui-grey-500)',
                    marginTop: '12px'
                  }}
                ></i>
              </Grid>

              {/* Price Range */}
              <Grid item xs={12} sm={6} md={3}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      label="Min Price"
                      type="number"
                      value={priceFilter.min}
                      onChange={(e) => handlePriceFilterChange('min', e.target.value)}
                      placeholder="0"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Max Price"
                      type="number"
                      value={priceFilter.max}
                      onChange={(e) => handlePriceFilterChange('max', e.target.value)}
                      placeholder="999"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Sort By */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      backgroundColor: 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="name">Sort by Name (A-Z)</option>
                    <option value="location">Sort by Location</option>
                    <option value="price">Sort by Price (Low to High)</option>
                    <option value="price-desc">Sort by Price (High to Low)</option>
                  </select>
                  <Typography variant="body2" sx={{ 
                    position: 'absolute',
                    top: '-10px',
                    left: '12px',
                    backgroundColor: 'white',
                    padding: '0 4px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '0.75rem'
                  }}>
                    Sort By
                  </Typography>
                </Box>
              </Grid>

              {/* Clear Filters */}
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  onClick={clearFilters}
                  fullWidth
                  disabled={!searchTerm && !priceFilter.min && !priceFilter.max && sortBy === 'name'}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    height: '56px',
                    borderRadius: '8px'
                  }}
                >
                  <i className="fas fa-times" style={{ marginRight: '8px' }}></i>
                  Clear
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Content */}
        {filteredCampgrounds.length === 0 && campgrounds.length > 0 ? (
          <Box sx={{ textAlign: 'center', paddingY: '4rem' }}>
            <i 
              className="fas fa-search" 
              style={{ 
                fontSize: '4rem', 
                color: 'var(--mui-grey-400)',
                marginBottom: '1rem',
                display: 'block'
              }}
            ></i>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              No campgrounds found
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'var(--mui-grey-600)', 
                marginBottom: '2rem',
                maxWidth: '400px',
                margin: '0 auto 2rem'
              }}
            >
              Try adjusting your search or filter criteria to find more campgrounds.
            </Typography>
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{ textTransform: 'none' }}
            >
              <i className="fas fa-times" style={{ marginRight: '8px' }}></i>
              Clear Filters
            </Button>
          </Box>
        ) : campgrounds.length === 0 ? (
          <Box sx={{ textAlign: 'center', paddingY: '4rem' }}>
            <i 
              className="fas fa-campground" 
              style={{ 
                fontSize: '6rem', 
                color: 'var(--mui-grey-400)',
                marginBottom: '2rem',
                display: 'block'
              }}
            ></i>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              No campgrounds yet!
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'var(--mui-grey-600)', 
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}
            >
              Be the first to add a campground and start sharing your outdoor adventures.
            </Typography>
            <Button
              component={Link}
              to="/campgrounds/new"
              variant="contained"
              color="success"
              size="large"
              sx={{ textTransform: 'none', fontSize: '1.1rem' }}
            >
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
              Add New Campground
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {filteredCampgrounds.map((campground) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={campground._id}>
                <Card 
                  sx={{ 
                    height: '480px', 
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(46, 125, 50, 0.15)'
                    }
                  }}
                >
                  {campground.images && campground.images.length > 0 ? (
                    <CardMedia
                      image={campground.images[0].url}
                      title={campground.title}
                      height="220px"
                      sx={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  ) : (
                    <Box 
                      sx={{
                        height: '220px',
                        backgroundColor: 'var(--mui-grey-100)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid var(--mui-grey-200)'
                      }}
                    >
                      <i 
                        className="fas fa-image" 
                        style={{ fontSize: '3rem', color: 'var(--mui-grey-400)' }}
                      ></i>
                    </Box>
                  )}
                  
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    padding: '20px',
                    height: '260px'
                  }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        marginBottom: '8px',
                        fontSize: '1.1rem',
                        lineHeight: '1.3',
                        height: '44px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden'
                      }}
                    >
                      {campground.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'var(--mui-grey-600)', 
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '0.9rem'
                      }}
                    >
                      <i className="fas fa-map-marker-alt" style={{ color: 'var(--mui-success-main)', marginRight: '6px', fontSize: '0.8rem' }}></i>
                      {campground.location.length > 30 ? `${campground.location.substring(0, 30)}...` : campground.location}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        flexGrow: 1, 
                        marginBottom: '16px',
                        color: 'var(--mui-grey-700)',
                        fontSize: '0.875rem',
                        lineHeight: '1.4',
                        height: '84px',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                        overflow: 'hidden'
                      }}
                    >
                      {campground.description}
                    </Typography>
                    
                    <Box sx={{ marginTop: 'auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <Typography variant="h6" sx={{ color: 'var(--mui-success-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                          ${campground.price}
                          <Typography component="span" variant="body2" sx={{ color: 'var(--mui-grey-600)', fontWeight: 'normal', fontSize: '0.8rem' }}>
                            /night
                          </Typography>
                        </Typography>
                        <Button 
                          component={Link} 
                          to={`/campgrounds/${campground._id}`} 
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ 
                            textTransform: 'none',
                            borderRadius: '20px',
                            padding: '6px 16px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                      
                      {campground.author && (
                        <Typography variant="body2" sx={{ color: 'var(--mui-grey-500)', fontSize: '0.75rem' }}>
                          <i className="fas fa-user" style={{ marginRight: '4px', fontSize: '0.7rem' }}></i>
                          By {campground.author.username}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CampgroundsList;
