"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

export default function StudentHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const ImageWithFallback = ({ src, alt, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
      <div className="position-relative" style={{ minHeight: props.style?.height || '250px' }}>
        {isLoading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error ? (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light">
            <i className="fas fa-image fa-2x text-muted"></i>
          </div>
        ) : (
          <Image
            {...props}
            src={src || '/placeholder.jpg'}
            alt={alt}
            width={600}
            height={400}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setError(true);
            }}
            style={{
              ...props.style,
              display: isLoading ? 'none' : 'block'
            }}
          />
        )}
      </div>
    );
  };

  const events = [
    { name: 'Hackathon', image: 'https://i.imgur.com/RCbVBEl.jpg', link: '/student/gallery/hackathon', description: 'Intra-Collegiate Programming Contests showcasing student coding skills' },
    { name: 'Tech Talk Series', image: 'https://i.imgur.com/pVe2IO3.jpg', link: '/student/gallery/techtalk', description: 'Industry experts shared insights on emerging technologies' },
    { name: 'Workshop', image: 'https://i.imgur.com/G615WvY.jpg', link: '/student/gallery/workshop', description: 'An interactive session exploring the fundamentals, technologies, and practical applications of cryptocurrency and blockchain.' },
    { name: 'Programming Class', image: 'https://i.imgur.com/ycJyaUp.jpg', link: '/student/gallery/programmingclass', description: 'Students competed in algorithmic problem-solving challenges' },
    { name: 'Seminar', image: 'https://i.imgur.com/EG0JacW.jpg', link: '/student/gallery/seminar', description: 'A seminar focused on enhancing developer productivity through the latest tools and streamlined processes.' },
  ];

  function EventGrid() {
    const router = useRouter();

    const handleEventClick = (link) => router.push(link);

    return (
      <div className="container py-5">
        <div className="row g-4">
          {events.map((event, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="card border-0 rounded-4 overflow-hidden"
                onClick={() => handleEventClick(event.link)}
                onKeyDown={(e) => e.key === 'Enter' && handleEventClick(event.link)}
                role="button"
                tabIndex={0}
                aria-label={`View ${event.name} details`}
                style={{
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
                <div className="position-relative">
                  <ImageWithFallback src={event.image} alt={event.name} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-4"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                      // Removed backdropFilter: 'blur(5px)'
                    }}
                  >
                    <h5 className="card-title mb-2 text-white fw-bold">{event.name}</h5>
                    <p className="card-text text-white-50 mb-0 small">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <div className="container py-4">
        <h2 className="mb-4 fw-bold">Welcome to the CST ACM Student Portal</h2>

        <h3>ACM Chapters Worldwide</h3>
        <p className="mb-4">
          The Association for Computing Machinery (ACM) is a global organization for computing professionals and researchers. It has ACM Chapters, which are localized groups promoting computing education, research, and networking. There are two types of chapters: Professional Chapters (for industry professionals and researchers) and Student Chapters (for university students to enhance learning and collaboration). These chapters organize workshops, seminars, hackathons, and research activities, providing networking opportunities with experts. ACM has over 500 chapters in 58+ countries, aiming to advance computing as a science and profession globally.
        </p>

        <hr />

        <h3>About CST ACM Chapter</h3>
        <h3>CST RUB ACM Chapter</h3>
        <p className="my-4">
          The CST RUB ACM Chapter is the official Association for Computing Machinery (ACM) Student Chapter at the College of Science and Technology (CST), Royal University of Bhutan (RUB). It aims to promote computing knowledge, research, and innovation among students. The chapter organizes workshops, hackathons, coding competitions, and guest lectures to enhance technical skills and networking. It provides a platform for students to collaborate, share knowledge, and engage with global ACM activities. Through ACM resources and mentorship, the chapter fosters a strong computing community at CST RUB.
        </p>
      </div>

      {/* Partition between CST RUB ACM Chapter and Event Gallery */}
      <hr className="my-5" />

      <h1 className="text-center mb-4">Event Gallery</h1>
      <h1 className="text-center mb-4">Exclusively curated in-person and virtual events</h1>

      <EventGrid />
    </div>
  );
}
