"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function SeminarPage() {
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
          <h1 className="text-white text-center mb-0">Seminar</h1>
        </div>
      </div>

      <div className="container py-4">
        {/* Seminar Content */}
        <div className="news-content">
          <h2>Seminar on Emerging Technologies</h2>
          <p>
            On 10/09/2024, the RUB ACM Student Chapter organized a seminar on emerging technologies. The seminar featured guest speakers from the tech industry who shared insights on the latest trends and innovations in technology. Students had the opportunity to learn about advancements in AI, cloud computing, and cybersecurity, and to engage in interactive discussions with the experts.
          </p>
          <div className="row">
            <div className="col-md-6">
              <Image src="https://i.imgur.com/6AUTVdn.jpg" alt="Seminar 1" width={600} height={400} className="img-fluid rounded shadow" style={{objectFit:'cover'}} />
            </div>
            <div className="col-md-6">
              <Image src="https://i.imgur.com/OCPhpZn.jpg" alt="Seminar 2" width={600} height={400} className="img-fluid rounded shadow" style={{objectFit:'cover'}} />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="content mt-4">
          <p>
            The seminar also included student research presentations and panel discussions on the impact of technology on society. The event fostered collaboration and knowledge sharing among students and professionals, and inspired participants to pursue further learning and innovation in the tech field.
          </p>
          <div className="row gallery mt-3">
            <div className="col-md-6">
              <Image src="https://i.imgur.com/muLiw0v.jpg" alt="Seminar 3" width={600} height={400} className="img-fluid rounded shadow" style={{objectFit:'cover'}} />
            </div>
            <div className="col-md-6">
              <Image src="https://i.imgur.com/GdVDxDC.jpg" alt="Seminar 4" width={600} height={400} className="img-fluid rounded shadow" style={{objectFit:'cover'}} />
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