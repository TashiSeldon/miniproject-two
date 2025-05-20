"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function SeminarGallery() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
        }}
      >
        <div className="container">
          <h1 className="text-white text-center mb-0">Seminar Gallery</h1>
        </div>
      </div>

      <section className="container py-4">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <Image
                src="https://imgur.com/6AUTVdn.jpg"
                alt="Seminar Event 1"
                width={600}
                height={400}
                className="card-img-top"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Tech Innovation Seminar</h5>
                <p className="card-text">
                  &ldquo;Exploring the future of technology and its impact on society&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <Image
                src="https://imgur.com/OCPhpZn.jpg"
                alt="Seminar Event 2"
                width={600}
                height={400}
                className="card-img-top"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Industry Expert Talk</h5>
                <p className="card-text">
                  Guest speakers sharing insights from the tech industry.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <Image
                src="https://imgur.com/muLiw0v.jpg"
                alt="Seminar Event 3"
                width={600}
                height={400}
                className="card-img-top"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Research Presentations</h5>
                <p className="card-text">
                  Students presenting their research findings and innovations.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <Image
                src="https://imgur.com/GdVDxDC.jpg"
                alt="Seminar Event 4"
                width={600}
                height={400}
                className="card-img-top"
                style={{ objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Panel Discussions</h5>
                <p className="card-text">
                  Interactive discussions on emerging technologies and trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add back button at the bottom */}
      <div className="container py-4">
        <div className="text-center">
          <Link href="/">
            <Button variant="primary" className="px-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
