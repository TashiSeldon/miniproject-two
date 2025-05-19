'use client';

import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

export default function OfficeBarrier() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
        }}
      >
        <div className="container">
          <h1 className="text-white text-center mb-0">ACM Office Bearers</h1>
        </div>
      </div>

      <section className="container py-4">
        {/* Program Coordinator */}
        <h3 className="text-success mb-4">Program Coordinator</h3>
        <div className="card shadow-sm mb-5 p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <Image
                src="https://imgur.com/CggMQjV.jpg"
                alt="Program Coordinator"
                width={300}
                height={300}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <h5><strong>Mr. Yeshi Jamtsho</strong></h5>
              <p><strong>Email:</strong> yeshiJamtsho.cst@rub.edu</p>
              <p><strong>Contact:</strong> +975-17778934</p>
              <p>
                Mr. Yeshi Jamtsho is an enthusiastic technology lover with over 10 years of academic and industry experience.
                He has mentored numerous tech communities and continuously supports student innovation at CST.
              </p>
            </div>
          </div>
        </div>

        {/* Office Bearers */}
        <h3 className="text-success mb-4">Office Bearers</h3>

        {/* Chairperson */}
        <div className="card shadow-sm mb-5 p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <Image
                src="https://imgur.com/xH95uMR.jpg"
                alt="Thukten Singye"
                width={300}
                height={300}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <h4>Chairman</h4>
              <h5><strong>Thukten Singye</strong></h5>
              <p><strong>Email:</strong> 02210232.cst@rub.edu.bt</p>
              <p><strong>Contact:</strong> +975-17345234</p>
              <p>
                Thukten is a passionate coder and student leader. He has led several tech events and hackathons at CST,
                and actively contributes to open-source projects. His enthusiasm for emerging technologies makes him an asset to the ACM Chapter.
              </p>
            </div>
          </div>
        </div>

        {/* Vice-Chairperson */}
        <div className="card shadow-sm mb-5 p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <Image
                src="https://imgur.com/iN7LBKb.jpg"
                alt="Tshering Yangdon"
                width={300}
                height={300}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <h4>Vice-Chairman</h4>
              <h5><strong>Tshering Yangdon</strong></h5>
              <p><strong>Email:</strong> 02210235.cst@rub.edu.bt</p>
              <p><strong>Contact:</strong> +975-77123590</p>
              <p>
                Tshering is driven by curiosity and innovation. She has participated in multiple international conferences on software engineering and
                supports diversity in tech. Her leadership inspires a collaborative spirit within the ACM community.
              </p>
            </div>
          </div>
        </div>

        {/* Treasurer */}
        <div className="card shadow-sm mb-5 p-4">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <Image
                src="https://imgur.com/GdVDxDC.jpg"
                alt="Tashi Wangchuk"
                width={300}
                height={300}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <h4>Treasurer</h4>
              <h5><strong>Tashi Wangchuk</strong></h5>
              <p><strong>Email:</strong> 02210081.cst@rub.edu.bt</p>
              <p><strong>Contact:</strong> +975-17345676</p>
              <p>
                Tashi combines his love for numbers and code. With a keen eye for financial management and a passion for programming,
                he ensures smooth budgeting and supports tech-based student startups at CST.
              </p>
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

