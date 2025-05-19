'use client';

import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Navbar 
        bg="dark" 
        variant="dark" 
        sticky="top" 
        style={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          zIndex: 1030
        }}
      >
        <Container>
          <Navbar.Brand>Loading...</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar 
      expand="md" 
      sticky="top" 
      variant="dark"
      style={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        zIndex: 1030
      }}
    >
      <Container>
        <Navbar.Brand as={Link} href="/" className="fw-bold" style={{ fontSize: '1.4rem', letterSpacing: '0.5px' }}>
          CST ACM
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} href="/student">Home</Nav.Link>
            <Nav.Link as={Link} href="/student/article">Article</Nav.Link>
            <Nav.Link as={Link} href="/student/event">Event</Nav.Link>
            <Nav.Link as={Link} href="/student/service">Services</Nav.Link>
            <Nav.Link as={Link} href="/student/officebarrier">Office Barrier</Nav.Link>
            <Nav.Link as={Link} href="/student/membershipregistration">Membership Registration</Nav.Link>
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} href="/">Logout</Nav.Link>
                {user.role === 'admin' && (
                  <Nav.Link as={Link} href="/admin/dashboard">Admin Dashboard</Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/login">Login</Nav.Link>
                <Nav.Link as={Link} href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;