"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function SeminarGallery() {
  return (
    <div className="bg-light">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <h1 className="text-white text-center mb-0">Seminar Gallery</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="card border-0 rounded-4 overflow-hidden shadow-lg mb-4">
          <div className="card-body p-4">
            <h2 className="card-title mb-4" style={{ color: '#1e3c72' }}>
              Empowering Developers: Tools and Process
            </h2>
            <div className="card-text text-muted mb-4">
              <p>
                The RUB ACM Student Chapter successfully conducted an insightful seminar titled &quot;Empowering Developers: Tools and Process&quot; on 07/09/2024. The seminar was delivered by our guest speaker, Khusant Chhetri, currently serving as the Head of Engineering Excellence at SELISE Bhutan.
              </p>
              <p>
                Attended by IT students, ACM members, and faculty members from the IT department, the seminar explored the evolving and fast-paced nature of software and web development. It emphasized the importance of using the right tools and designing software in a scalable manner. The demo-oriented session discussed tools and technologies commonly employed in planning, developing, tracking, testing, deploying, and maintaining web applications, highlighting best practices throughout the process.
              </p>
              <p>
                We would like to sincerely thank Mr. Khusant Chhetri for delivering such an informative seminar. His insights on software development tools and processes were invaluable, providing attendees with a deeper understanding of best practices. We appreciate his time and expertise.
              </p>
            </div>

            {/* Seminar Images */}
            <div className="row g-4">
              {[
                "https://i.imgur.com/BlLIKpe.jpg",
                "https://i.imgur.com/NyLK6Kj.jpg"
              ].map((src, index) => (
                <div key={index} className="col-md-6">
                  <div
                    className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                    style={{
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                  >
                    <Image
                      src={src}
                      className="img-fluid"
                      alt="Seminar Talk"
                      width={600}
                      height={400}
                      style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              ))}
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
