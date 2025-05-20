"use client";

import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import Link from 'next/link';

export default function TechTalkGallery() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-light">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <h1 className="text-white text-center mb-0">Tech Talk Events</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        {/* Section 1: Online Competitive Programming Platform */}
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg mb-5">
          <div className="card-body p-4">
            <h2 className="card-title mb-4" style={{ color: '#1e3c72' }}>
              Introduction to Online Competitive Programming Platform
            </h2>
            <div className="card-text text-muted">
              <p className="lead">
                The RUB ACM Student Chapter organized an informative session for first-year members titled 'Introduction to Online Competitive Programming Platform.'
              </p>
              <p>
                The session aimed to provide participants with essential tools and strategies...
              </p>
              <div className="my-4">
                <h5 className="mb-3" style={{ color: '#1e3c72' }}>Key Highlights:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Account creation on Kattis
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Introduction to problem-solving strategies
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Step-by-step guide on problem submission
                  </li>
                </ul>
              </div>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                    style={{ 
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage({
                      title: 'Tech Talk Session',
                      image: 'https://imgur.com/qZa9k5Q.jpg',
                      description: 'Tech Talk Session on Competitive Programming'
                    })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                  >
                    <img
                      src="https://imgur.com/qZa9k5Q.jpg"
                      className="img-fluid"
                      alt="Tech Talk Session"
                      style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                    style={{ 
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage({
                      title: 'Guidance on Kattis',
                      image: 'https://imgur.com/shM1qqt.jpg',
                      description: 'Session on Kattis platform usage'
                    })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                  >
                    <img
                      src="https://imgur.com/shM1qqt.jpg"
                      className="img-fluid"
                      alt="Guidance on Kattis"
                      style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="text-center my-5">
          <div style={{ height: '2px', background: 'linear-gradient(to right, transparent, #1e3c72, transparent)' }}></div>
        </div>

        {/* Section 2: Tech Talk Contest */}
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg mb-4">
          <div className="card-body p-4">
            <h2 className="card-title mb-4" style={{ color: '#1e3c72' }}>
              Tech Talk Contest: "Let's Talk about Technology"
            </h2>
            <div className="card-text text-muted mb-4">
              <p className="lead">
                The most awaiting Tech-Talk Contest "Let's Talk about Technology" was finally held today (9/10/2022).
              </p>
              <div className="my-4">
                <h5 className="mb-3" style={{ color: '#1e3c72' }}>Presentations:</h5>
                <ol className="list-group list-group-numbered">
                  <li className="list-group-item border-0 bg-transparent">The state of AI by Kamal Acharya of 4IT</li>
                  <li className="list-group-item border-0 bg-transparent">Augmented Reality by Sonam Choden of 2IT</li>
                  <li className="list-group-item border-0 bg-transparent">Quantum Computer by Karsel Dawa of 3IT</li>
                  <li className="list-group-item border-0 bg-transparent">Starlink by Ratnay Rana of 4IT</li>
                  <li className="list-group-item border-0 bg-transparent">How Alexa uses AI by Tshering Yangdon of 2IT</li>
                </ol>
              </div>
              <p>The event was successfully ended by photo session</p>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                    style={{ 
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage({
                      title: 'Tech Talk Contest',
                      image: 'https://imgur.com/pVe2IO3.jpg',
                      date: '9/10/2022'
                    })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                  >
                    <img
                      src="https://imgur.com/pVe2IO3.jpg"
                      className="img-fluid"
                      alt="Tech Talk Contest 1"
                      style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                    style={{ 
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage({
                      title: 'Tech Talk Contest',
                      image: 'https://imgur.com/xtUOmGa.jpg',
                      date: '9/10/2022'
                    })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                  >
                    <img
                      src="https://imgur.com/xtUOmGa.jpg"
                      className="img-fluid"
                      alt="Tech Talk Contest 2"
                      style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-5">
          <Link 
            href="/student" 
            className="btn btn-outline-primary rounded-pill px-4 py-2"
            style={{ 
              borderColor: '#1e3c72',
              color: '#1e3c72',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1e3c72';
              e.currentTarget.style.borderColor = '#1e3c72';
            }}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="modal fade show d-block"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header border-0"
                style={{ 
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                }}>
                <h5 className="modal-title text-white">{selectedImage.title}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setSelectedImage(null)}
                ></button>
              </div>
              <div className="modal-body p-0">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-100"
                  style={{ maxHeight: '70vh', objectFit: 'contain' }}
                />
              </div>
              <div className="modal-footer border-0 bg-light">
                <p className="mb-0 text-muted">
                  {selectedImage.date || selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
