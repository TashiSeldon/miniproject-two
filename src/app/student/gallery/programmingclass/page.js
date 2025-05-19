"use client";

import Link from 'next/link';

export default function ProgrammingClassGallery() {
  return (
    <div className="bg-light min-vh-100">
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
        }}
      >
        <div className="container">
          <h1 className="text-white text-center mb-0">Programming Class</h1>
        </div>
      </div>

      <div className="container py-4">
        {/* Programming Class Content */}
        <div className="news-content">
          <h2>Introduction to Programming for First-Year Students</h2>
          <p>
            On 19/08/2024, the RUB ACM Student Chapter commenced programming sessions for first-year students. The session introduced the fundamentals of programming and provided a basic introduction to the Python programming language. It was designed to assist new members in acquiring programming skills and gaining valuable learning experience as they begin their journey in the field of technology.
          </p>
          <div className="row">
            <div className="col-md-6">
              <img src="https://imgur.com/ycJyaUp.jpg" className="img-fluid rounded shadow" alt="Programming Class 1" />
            </div>
            <div className="col-md-6">
              <img src="https://imgur.com/z9er7wO.jpg" className="img-fluid rounded shadow" alt="Programming Class 2" />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="content mt-4">
          <p>
            The usual weekly programming class for a semester has commenced since last Monday i.e. on 6th March, 2023 with introduction of Object Oriented Programming languages.
          </p>
          <p>
            The programming class will be mentored by a group of final year IT students whereby on Monday, first years will be learning JAVA language and on Tuesday, second years will be learning Python language along with its implementation in AI field.
          </p>
          <div className="row gallery mt-3">
            <div className="col-md-6">
              <img src="https://imgur.com/w2Rqhd4.jpg" className="img-fluid rounded shadow" alt="Hackathon Poster" />
            </div>
            <div className="col-md-6">
              <img src="https://imgur.com/SKzfPTQ.jpg" className="img-fluid rounded shadow" alt="Hackathon Banner" />
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
              transition: 'all 0.3s ease',
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