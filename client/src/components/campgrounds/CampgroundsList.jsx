import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CampgroundsList = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get('/api/campgrounds');
        if (response.data.success) {
          setCampgrounds(response.data.campgrounds);
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

  if (loading) {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="success" className="spinner-border mb-3" />
          <p className="text-muted fs-5">Loading campgrounds...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>
                <i className="fas fa-exclamation-triangle me-2"></i>
                Error
              </Alert.Heading>
              <p>{error}</p>
              <Button as={Link} to="/" variant="outline-danger">
                <i className="fas fa-home me-2"></i>
                Go Home
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container fluid className="py-5 px-3 px-md-5">
        <Row className="justify-content-center">
          <Col xs={12} xl={11} xxl={10}>
            {/* Header */}
            <div className="mb-5">
              <Row className="align-items-center">
                <Col xs={12} md={8}>
                  <h1 className="display-4 fw-bold mb-3 mb-md-0">
                    <i className="fas fa-mountain text-success me-3"></i>
                    All Campgrounds
                  </h1>
                  <p className="text-muted fs-5 d-none d-md-block">
                    Discover amazing campgrounds around the world
                  </p>
                </Col>
                <Col xs={12} md={4} className="text-md-end">
                  <Button
                    as={Link}
                    to="/campgrounds/new"
                    variant="success"
                    size="lg"
                    className="w-100 w-md-auto"
                  >
                    <i className="fas fa-plus me-2"></i>
                    Add New Campground
                  </Button>
                </Col>
              </Row>
            </div>

            {/* Content */}
            {campgrounds.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-campground text-muted display-1 mb-4"></i>
                <h3 className="display-6 mb-3">No campgrounds yet!</h3>
                <p className="text-muted fs-5 mb-4">
                  Be the first to add a campground and start sharing your outdoor adventures.
                </p>
                <Button as={Link} to="/campgrounds/new" variant="success" size="lg">
                  <i className="fas fa-plus me-2"></i>
                  Add New Campground
                </Button>
              </div>
            ) : (
              <Row className="campground-grid">
                {campgrounds.map((campground) => (
                  <Col xs={12} sm={6} lg={4} xl={3} key={campground._id} className="mb-4">
                    <Card className="h-100 card">
                      {campground.images && campground.images.length > 0 ? (
                        <Card.Img
                          variant="top"
                          src={campground.images[0].url}
                          style={{ height: '250px', objectFit: 'cover' }}
                          alt={campground.title}
                        />
                      ) : (
                        <div 
                          className="bg-light d-flex align-items-center justify-content-center" 
                          style={{ height: '250px' }}
                        >
                          <i className="fas fa-image text-muted display-4"></i>
                        </div>
                      )}
                      
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="h5 fw-bold">{campground.title}</Card.Title>
                        
                        <Card.Text className="text-muted mb-2">
                          <i className="fas fa-map-marker-alt text-success me-1"></i>
                          {campground.location}
                        </Card.Text>
                        
                        <Card.Text className="flex-grow-1 mb-3">
                          {campground.description.length > 100
                            ? `${campground.description.substring(0, 100)}...`
                            : campground.description}
                        </Card.Text>
                        
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <strong className="text-success fs-5">
                            ${campground.price}
                            <small className="text-muted">/night</small>
                          </strong>
                          <Button 
                            as={Link} 
                            to={`/campgrounds/${campground._id}`} 
                            variant="primary"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                        
                        {campground.author && (
                          <small className="text-muted">
                            <i className="fas fa-user me-1"></i>
                            By {campground.author.username}
                          </small>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CampgroundsList;
