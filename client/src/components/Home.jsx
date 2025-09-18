import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="hero-section" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80)',
    }}>
      <Container fluid className="h-100 d-flex align-items-center justify-content-center px-3 px-md-5">
        <Row className="w-100 justify-content-center text-center text-white">
          <Col xs={12} lg={10} xl={8}>
            <div className="animate-fade-in">
              <h1 className="display-1 fw-bold mb-4 animate-slide-up">
                <i className="fas fa-campground me-3 text-success"></i>
                YelpCamp
              </h1>
              
              <p className="lead mb-5 fs-4 lh-lg">
                Welcome to YelpCamp! Jump right in and explore our many campgrounds.
                <br className="d-none d-sm-block" />
                Feel free to share some of your own and comment on others!
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
                {user ? (
                  <Button
                    as={Link}
                    to="/campgrounds"
                    variant="light"
                    size="lg"
                    className="btn-lg px-5 py-3 fw-bold"
                  >
                    <i className="fas fa-mountain me-2"></i>
                    View Campgrounds
                  </Button>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/campgrounds"
                      variant="light"
                      size="lg"
                      className="btn-lg px-5 py-3 fw-bold"
                    >
                      <i className="fas fa-mountain me-2"></i>
                      View Campgrounds
                    </Button>
                    <Button
                      as={Link}
                      to="/register"
                      variant="outline-light"
                      size="lg"
                      className="btn-lg px-5 py-3 fw-bold"
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
              
              <Row className="justify-content-center mt-5 pt-5">
                <Col xs={4} sm={3} md={2} className="text-center">
                  <i className="fas fa-map-marked-alt fs-1 mb-2 text-success opacity-75"></i>
                  <p className="small mb-0">Explore</p>
                </Col>
                <Col xs={4} sm={3} md={2} className="text-center">
                  <i className="fas fa-camera fs-1 mb-2 text-success opacity-75"></i>
                  <p className="small mb-0">Share</p>
                </Col>
                <Col xs={4} sm={3} md={2} className="text-center">
                  <i className="fas fa-star fs-1 mb-2 text-success opacity-75"></i>
                  <p className="small mb-0">Review</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
