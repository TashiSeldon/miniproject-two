//src/app/register/page.js

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // safer parsing to avoid JSON parse errors on empty body
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (res.ok) {
        setMessageType('success');
        setMessage('Registration successful! Redirecting to student page...');

        // Clear form
        setForm({ name: '', email: '', password: '' });

        // Redirect after short delay
        setTimeout(() => {
          router.push('/student');
        }, 1000);
      } else {
        setMessageType('error');
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Network error. Please try again later.');
      console.error('Register error:', error);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>Register for CST ACM Chapter</h1>
        <p className={styles.description}>
          Join our community of tech enthusiasts and innovators.
        </p>

        {message && (
          <div className={styles.messageContainer}>
            <div className={`${styles.message} ${messageType === 'error' ? styles.errorMessage : styles.successMessage}`}>
              {message}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.backButton}`}
            onClick={handleBack}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
