import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewCampground = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append image files
      images.forEach(image => {
        formDataToSend.append('image', image);
      });

      const response = await axios.post('/api/campgrounds', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate(`/campgrounds/${response.data.campground._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campground');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Create New Campground</h2>
                <p className="text-muted">Share your favorite camping spot with the community</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-campground me-2"></i>
                    Campground Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    autoFocus
                    size="lg"
                    className="py-3"
                    placeholder="Enter campground name"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Location
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    size="lg"
                    className="py-3"
                    placeholder="City, State, Country"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-dollar-sign me-2"></i>
                    Price per Night
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    size="lg"
                    className="py-3"
                    placeholder="0.00"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-align-left me-2"></i>
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    size="lg"
                    placeholder="Describe your campground..."
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-camera me-2"></i>
                    Images
                  </Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    size="lg"
                  />
                  <Form.Text className="text-muted">
                    Select multiple images to showcase your campground (optional)
                  </Form.Text>
                </Form.Group>

                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Button 
                    type="submit" 
                    variant="success" 
                    size="lg"
                    disabled={loading}
                    className="flex-grow-1 py-3 fw-bold"
                  >
                    <i className="fas fa-plus me-2"></i>
                    {loading ? 'Creating...' : 'Create Campground'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="lg"
                    onClick={() => navigate('/campgrounds')}
                    className="py-3 px-4"
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCampground;