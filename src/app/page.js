//src/app/page.js

'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';



export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleStayLoggedOut = () => {
    window.location.href = '/student';
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Welcome to CST ACM Chapter Website</h1>
        <p className={styles.description}>
          Empowering students through technology, innovation, and collaboration in computer science.
        </p>
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.button} ${styles.loginButton}`}
            onClick={handleLogin}
          >
            Login
          </button>
          <button 
            className={`${styles.button} ${styles.registerButton}`}
            onClick={handleRegister}
          >
            Register
          </button>
          
        </div>
      </div>
    </div>
  );
}
