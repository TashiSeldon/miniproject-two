//src/app/student/service/page.js

"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/component/header/page';
import Footer from '@/app/component/footer/page';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Service() {
  const router = useRouter();

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
            <h1 className="text-white text-center mb-0">Our Services</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <p className="fs-5">
                <strong>CST ACM Student Chapter</strong> offers ITS services...
              </p>

              {/* Details */}
              <ul className="list-unstyled fs-5">
                <li><strong>📍 Location:</strong> IT Building, Ground Floor</li>
                <li><strong>⏰ Service Time:</strong> 8:00 PM – 9:30 PM</li>
                <li><strong>📅 Working Days:</strong> Monday to Saturday</li>
                <li><strong>📞 Contact:</strong>
                  <ul className="mt-1">
                    <li>Chairman – 77748908</li>
                    <li>Vice-Chairman – 17526060</li>
                    <li>Treasurer – 77731758</li>
                  </ul>
                </li>
              </ul>

              {/* Image */}
              <div className="mt-5 text-center">
                <h4 className="fw-bold mb-3">Services Offered</h4>
                <img
                  src="https://imgur.com/LBwRSWF.jpg"
                  alt="Services Offered"
                  className="img-fluid rounded shadow"
                />
              </div>

              {/* Register Button */}
              <div className="text-center mt-4">
                <button className="btn btn-primary px-4 py-2" onClick={() => router.push('/student/service/register')}>
                  Register for Services
                </button>
              </div>
            </div>
          </div>
        </div>

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
