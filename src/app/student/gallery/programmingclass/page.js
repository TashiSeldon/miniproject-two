"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/app/component/header/page';
import Footer from '@/app/component/footer/page';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function ProgrammingClassGallery() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <Header />
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
            <h1 className="text-white text-center mb-0">Programming Class Gallery</h1>
          </div>
        </div>

        <section className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/6AUTVdn.jpg"
                  alt="Programming Class 1"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Introduction to Programming</h5>
                  <p className="card-text">
                    Students learning the basics of programming in a hands-on environment.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/OCPhpZn.jpg"
                  alt="Programming Class 2"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Advanced Concepts</h5>
                  <p className="card-text">
                    Exploring advanced programming concepts and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/muLiw0v.jpg"
                  alt="Programming Class 3"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Group Projects</h5>
                  <p className="card-text">
                    Students collaborating on programming projects and assignments.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/GdVDxDC.jpg"
                  alt="Programming Class 4"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Code Reviews</h5>
                  <p className="card-text">
                    Students participating in code review sessions and discussions.
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
      <Footer />
    </>
  );
}