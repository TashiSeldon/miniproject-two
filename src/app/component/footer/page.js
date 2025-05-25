"use client";

const Footer = () => (
  <footer
    className="text-white py-5 mt-auto"
    style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
  >
    <div className="container text-center">
      <p className="mb-2">&copy; {new Date().getFullYear()} CST ACM Tech Hub. All rights reserved.</p>
      <div className="social-links">
        <a
          href="https://www.facebook.com/rubacmchapter"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-3"
          style={{ 
            fontSize: '1.5rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="mailto:acmstudentchapter.cst@rub.edu.bt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-3"
          style={{ 
            fontSize: '1.5rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
