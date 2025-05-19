"use client";

const Footer = () => (
  <footer
    className="text-white py-5 mt-auto"
    style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
  >
    <div className="container text-center">
      <p className="mb-2">&copy; {new Date().getFullYear()} CST ACM Tech Hub. All rights reserved.</p>
      <p className="mb-0">
        Follow us on{' '}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover-white mx-2"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover-white mx-2"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover-white mx-2"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
