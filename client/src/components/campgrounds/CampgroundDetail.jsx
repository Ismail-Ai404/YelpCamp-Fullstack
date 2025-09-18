import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Carousel, Badge } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CampgroundDetail = () => {
  const [campground, setCampground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const response = await axios.get(`/api/campgrounds/${id}`);
        if (response.data.success) {
          setCampground(response.data.campground);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch campground');
      } finally {
        setLoading(false);
      }
    };

    fetchCampground();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campground?')) {
      setDeleting(true);
      try {
        await axios.delete(`/api/campgrounds/${id}`);
        navigate('/campgrounds');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete campground');
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/campgrounds" variant="secondary">
          Back to Campgrounds
        </Button>
      </Container>
    );
  }

  if (!campground) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Campground not found</Alert>
        <Button as={Link} to="/campgrounds" variant="secondary">
          Back to Campgrounds
        </Button>
      </Container>
    );
  }

  const isOwner = user && campground.author && user.id === campground.author._id;

  return (
    <Container fluid className="mt-5 px-4">
      <Row className="justify-content-center">
        <Col xs={12} xl={10}>
          <Button 
            as={Link} 
            to="/campgrounds" 
            variant="outline-secondary" 
            className="mb-4 px-3"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Campgrounds
          </Button>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col xs={12} xl={10}>
          <Row>
            <Col lg={6} className="mb-4">
              {campground.images && campground.images.length > 0 ? (
                <Carousel className="mb-4 rounded overflow-hidden shadow">
                  {campground.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={`${campground.title} ${index + 1}`}
                        style={{ height: '450px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <div 
                  className="bg-light d-flex align-items-center justify-content-center mb-4 rounded shadow"
                  style={{ height: '450px' }}
                >
                  <span className="text-muted fs-4">No images available</span>
                </div>
              )}
          
              {/* Map placeholder - we'll implement this later */}
              <Card className="shadow">
                <Card.Body className="p-4">
                  <Card.Title className="fs-4 mb-3">
                    <i className="fas fa-map-marked-alt me-2"></i>
                    Location
                  </Card.Title>
                  <p className="text-muted fs-6 mb-3">Interactive map coming soon...</p>
                  <Badge bg="primary" className="fs-6 px-3 py-2">
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {campground.location}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} className="mb-4">
              <Card className="shadow">
                <Card.Body className="p-4">
                  <Card.Title className="display-5 fw-bold mb-3">{campground.title}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted fs-5">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    {campground.location}
                  </Card.Subtitle>
                  
                  <Card.Text className="fs-6 mb-4 lh-lg">
                    {campground.description}
                  </Card.Text>
                  
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                    <h3 className="text-success mb-2 mb-md-0">
                      ${campground.price} 
                      <small className="text-muted fs-6"> / night</small>
                    </h3>
                    {campground.author && (
                      <div className="text-muted">
                        <i className="fas fa-user me-1"></i>
                        <small>By <strong>{campground.author.username}</strong></small>
                      </div>
                    )}
                  </div>
              
                  {isOwner && (
                    <div className="d-flex flex-column flex-sm-row gap-3">
                      <Button 
                        as={Link} 
                        to={`/campgrounds/${campground._id}/edit`} 
                        variant="primary"
                        className="px-4 py-2"
                      >
                        <i className="fas fa-edit me-2"></i>
                        Edit Campground
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-4 py-2"
                      >
                        <i className="fas fa-trash me-2"></i>
                        {deleting ? 'Deleting...' : 'Delete Campground'}
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
              
              {/* Reviews section placeholder */}
              <Card className="mt-4 shadow">
                <Card.Body className="p-4">
                  <Card.Title className="fs-4 mb-3">
                    <i className="fas fa-star me-2"></i>
                    Reviews
                  </Card.Title>
                  <p className="text-muted fs-6 mb-3">Review system coming soon...</p>
                  {user && !isOwner && (
                    <Button variant="outline-primary" disabled className="px-4">
                      <i className="fas fa-plus me-2"></i>
                      Leave a Review
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CampgroundDetail;