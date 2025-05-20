"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function ProgrammingClassGallery() {
  return (
    <div className="bg-light">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <h1 className="text-white text-center mb-0">Programming Class Gallery</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg mb-4">
          <div className="card-body p-4">
            <h2 className="card-title mb-4" style={{ color: '#1e3c72' }}>
              Programming Class Session
            </h2>
            <div className="card-text text-muted mb-4">
              <p>
                The RUB ACM Student Chapter organized a programming class session for its members. The session focused on fundamental programming concepts and problem-solving techniques, providing students with hands-on experience in coding.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Image 
                    src="https://i.imgur.com/ycJyaUp.jpg" 
                    className="img-fluid rounded shadow" 
                    alt="Programming Class 1"
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6">
                  <Image 
                    src="https://i.imgur.com/z9er7wO.jpg" 
                    className="img-fluid rounded shadow" 
                    alt="Programming Class 2"
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="content mt-4">
              <h2 className="fw-bold mb-4" style={{ color: '#1e3c72' }}>Class Materials</h2>
              <p className="text-muted" style={{ lineHeight: '1.8' }}>
                The programming class included comprehensive materials covering various programming topics, from basic syntax to advanced algorithms. Students were provided with practical examples and exercises to enhance their understanding.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Image 
                    src="https://i.imgur.com/w2Rqhd4.jpg" 
                    className="img-fluid rounded shadow" 
                    alt="Hackathon Poster"
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6">
                  <Image 
                    src="https://i.imgur.com/SKzfPTQ.jpg" 
                    className="img-fluid rounded shadow" 
                    alt="Hackathon Banner"
                    width={600}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
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
    </div>
  );
}