//src/app/student/gallery/hackathon/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const HackathonPage = () => {
  // Initialize Bootstrap
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        padding: '3rem 0',
        marginBottom: '2rem'
      }}>
        <div className="container">
          <h1 className="text-white text-center mb-0">Hackathon</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="card-body p-4">
            {/* Hackathon Content */}
            <div className="tab-pane fade show active" id="hackathon" role="tabpanel">
              <div className="news-content">
                <h2 className="fw-bold mb-4" style={{ color: '#1e3c72' }}>3rd Intra-Collegiate Programming Contest</h2>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  The 3rd Intra-Collegiate Programming Contest was successfully organized on November 1st in commemoration of the Coronation Day of His Majesty the Fifth King. The event was graced by the college president and IT department faculty, whose support was instrumental in making this event possible.
                </p>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  This year's contest featured 13 teams, primarily from the IT department, with a few participants from other departments, who received special recognition for their participation. The event provided an exciting platform for students to showcase their coding skills in a competitive and collaborative environment, emphasizing the development of critical thinking and effective communication—skills essential for success in the tech industry.
                </p>
                
                <div className="card border-0 rounded-4 bg-light p-4 mb-4">
                  <h5 className="fw-bold mb-3" style={{ color: '#1e3c72' }}>Winners:</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="fas fa-trophy text-warning me-2"></i>
                      1st Place: Team Empty (4IT)
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-medal text-secondary me-2"></i>
                      2nd Place: Team ToBy (4IT)
                    </li>
                    <li>
                      <i className="fas fa-award text-bronze me-2"></i>
                      3rd Place: Team Ctrl+Alt+DeluX (4IT)
                    </li>
                  </ul>
                </div>

                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card border-0 rounded-4 overflow-hidden shadow">
                      <img src="https://imgur.com/RCbVBEl.jpg" className="img-fluid" alt="Coding Contest" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 rounded-4 overflow-hidden shadow">
                      <img src="https://imgur.com/c3XmaeB.jpg" className="img-fluid" alt="Award Ceremony" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card border-0 rounded-4 overflow-hidden shadow">
                      <img src="https://imgur.com/yIGcX6H.jpg" className="img-fluid" alt="Group Photo" />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" style={{ opacity: '0.1' }} />

              <div className="content mt-4">
                <h2 className="fw-bold mb-4" style={{ color: '#1e3c72' }}>2nd Intra-Collegiate Programming Contest</h2>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  The most awaiting Intra Collegiate Programming Contest was held yesterday, on 22nd April, and it was a grand success! We had a total of 16 teams with each team showcasing their coding skills equally well. The event was graced by the presence of our IT HOD sir.
                </p>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  We also had an exciting ACM lucky draw during the event, which added to the overall fun and excitement of the contest. The program started at 8am and continued until 1pm, with all the participants displaying their coding prowess and competing with each other.
                </p>
                <p className="text-muted" style={{ lineHeight: '1.8' }}>
                  In the end, all the participants and organizers were felicitated with certifications, the winning team were awarded with cash prizes and finally we had a memorable photo session to capture the essence of the occasion.
                </p>
                <div className="row g-4 mt-3">
                  <div className="col-md-6">
                    <div className="card border-0 rounded-4 overflow-hidden shadow">
                      <img src="https://imgur.com/pHl1znH.jpg" className="img-fluid" alt="Hackathon Poster" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 rounded-4 overflow-hidden shadow">
                      <img src="https://imgur.com/1NZwX4r.jpg" className="img-fluid" alt="Hackathon Banner" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-4">
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

      <style jsx>{`
        .text-bronze {
          color: #cd7f32;
        }
      `}</style>
    </div>
  );
};

export default HackathonPage;

