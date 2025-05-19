//src/app/student/gallery/hackathon/page.js
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/app/component/header/page';
import Footer from '@/app/component/footer/page';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function HackathonGallery() {
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
            <h1 className="text-white text-center mb-0">Hackathon Gallery</h1>
          </div>
        </div>

        <section className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/6AUTVdn.jpg"
                  alt="Hackathon Event 1"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Annual Coding Challenge</h5>
                  <p className="card-text">
                    Students showcasing their innovative solutions during the annual coding challenge.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/OCPhpZn.jpg"
                  alt="Hackathon Event 2"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Team Collaboration</h5>
                  <p className="card-text">
                    Teams working together to solve complex programming challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/muLiw0v.jpg"
                  alt="Hackathon Event 3"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Project Presentations</h5>
                  <p className="card-text">
                    Students presenting their innovative solutions to the judges.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/GdVDxDC.jpg"
                  alt="Hackathon Event 4"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Award Ceremony</h5>
                  <p className="card-text">
                    Winners receiving recognition for their outstanding achievements.
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

