"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import { useAuth } from '../../context/AuthContext'; // adjust path if needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const ADMIN_EMAIL = 'admin@2524.com';
const ADMIN_PASSWORD = 'admin123';

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if user is admin by hardcoded credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // You can set admin info in your auth context or localStorage/session here
    // For now, just redirect to admin dashboard
    router.push('/admin');
    return;
  }

  // Otherwise, regular login
  const result = await login({ email, password });
  if (result.success) {
    router.push('/student');
  } else {
    alert('Login failed. Please try again.');
  }
};


  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Login to CST ACM Chapter</h1>
        <p className={styles.description}>
          Welcome back! Please enter your credentials to continue.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              className={`${styles.button} ${styles.loginButton}`}
            >
              Login
            </button>
            <button 
              type="button" 
              className={`${styles.button} ${styles.backButton}`}
              onClick={handleBack}
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
