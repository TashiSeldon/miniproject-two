"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';

export default function WorkshopGallery() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
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
            <h1 className="text-white text-center mb-0">Workshop Gallery</h1>
          </div>
        </div>

        <section className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/6AUTVdn.jpg"
                  alt="Workshop 1"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Web Development Workshop</h5>
                  <p className="card-text">
                    Hands-on session on modern web development technologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/OCPhpZn.jpg"
                  alt="Workshop 2"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Mobile App Development</h5>
                  <p className="card-text">
                    Learning to build cross-platform mobile applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/muLiw0v.jpg"
                  alt="Workshop 3"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">UI/UX Design</h5>
                  <p className="card-text">
                    Creating beautiful and user-friendly interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src="https://imgur.com/GdVDxDC.jpg"
                  alt="Workshop 4"
                  width={600}
                  height={400}
                  className="card-img-top"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Database Management</h5>
                  <p className="card-text">
                    Understanding modern database systems and practices.
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
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
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
    </>
  );
}
