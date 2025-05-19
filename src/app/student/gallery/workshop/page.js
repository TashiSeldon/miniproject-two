"use client";

import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import Link from 'next/link';

export default function WorkshopGallery() {
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
          <h1 className="text-white text-center mb-0">Workshop Events</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg mb-4">
          <div className="card-body p-4">
            <h2 className="card-title mb-4" style={{ color: '#1e3c72' }}>
              Monthly Program – September Session on Blockchain
            </h2>
            <div className="card-text text-muted mb-4">
              <p className="lead">
                The Monthly Program for the month of September was held today, in which the Head of Department of IT, Tandin Wangchuk Sir, shared his knowledge on Blockchain with third-year ACM members.
              </p>
              <p>
                It was a 3-hour session covering various important topics such as an overview of blockchain technology, popular cryptocurrencies, types of crypto wallets, the security of coins, and how blockchain transactions work. Furthermore, Sir introduced participants to the blockchain explorer website and demonstrated its use.
              </p>
              
              {/* Key Topics Section */}
              <div className="bg-light rounded-4 p-4 my-4" style={{ border: '1px solid rgba(30, 60, 114, 0.1)' }}>
                <h5 className="mb-3" style={{ color: '#1e3c72' }}>Topics Covered:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-cube text-primary me-2"></i>
                    Overview of Blockchain Technology
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-coins text-primary me-2"></i>
                    Popular Cryptocurrencies
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-wallet text-primary me-2"></i>
                    Types of Crypto Wallets
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-shield-alt text-primary me-2"></i>
                    Security of Coins
                  </li>
                  <li className="list-group-item border-0 bg-transparent">
                    <i className="fas fa-exchange-alt text-primary me-2"></i>
                    Blockchain Transaction Mechanics
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
                      title: 'Blockchain Workshop Session',
                      image: 'https://imgur.com/4XOYYYe.jpg',
                      description: 'Session on Blockchain Technology'
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
                      src="https://imgur.com/4XOYYYe.jpg"
                      className="img-fluid"
                      alt="Blockchain Session Image 1"
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
                      title: 'Blockchain Workshop Session',
                      image: 'https://imgur.com/R8S6mNW.jpg',
                      description: 'Interactive Blockchain Learning Session'
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
                      src="https://imgur.com/R8S6mNW.jpg"
                      className="img-fluid"
                      alt="Blockchain Session Image 2"
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
                <p className="mb-0 text-muted">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
