'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';

export default function MembershipRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
    year: '',
    phoneNumber: '',
    address: '',
    interests: [],
    skills: '',
    goals: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Departments with only 1st and 2nd year
  const twoYearDepartments = ['Software Engineering', 'Water Resource Engineering', 'Mechanical Engineering'];

  // Departments with 1st to 5th year
  const fiveYearDepartments = ['Architecture'];

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'department') {
      setFormData((prev) => {
        let newYear = prev.year;

        // Adjust year if current selection is invalid for new department
        if (fiveYearDepartments.includes(value)) {
          // Architecture allows 1st to 5th year, so keep current year or reset if invalid
          if (!['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'].includes(newYear)) {
            newYear = '';
          }
        } else if (twoYearDepartments.includes(value)) {
          // Only 1st and 2nd year allowed
          if (!['1st Year', '2nd Year'].includes(newYear)) {
            newYear = '';
          }
        } else {
          // Other departments allow 1st to 4th year
          if (!['1st Year', '2nd Year', '3rd Year', '4th Year'].includes(newYear)) {
            newYear = '';
          }
        }

        return { ...prev, department: value, year: newYear };
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const getYearOptions = () => {
    if (fiveYearDepartments.includes(formData.department)) {
      return ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
    }
    if (twoYearDepartments.includes(formData.department)) {
      return ['1st Year', '2nd Year'];
    }
    if (formData.department) {
      return ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/register-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Successfully registered! Your membership request is pending approval.');
        setFormData({
          fullName: '',
          email: '',
          studentId: '',
          department: '',
          year: '',
          phoneNumber: '',
          address: '',
          interests: [],
          skills: '',
          goals: ''
        });
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/student');
        }, 3000);
      } else {
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <h1 className="text-center mb-4">ACM Membership Registration</h1>

        {message && (
          <div className={`alert ${message.includes('Successfully') ? 'alert-success' : 'alert-danger'} text-center fw-semibold rounded-pill`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-4">
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm rounded-3"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label fw-semibold">College Email</label>
            <input
              type="email"
              className="form-control shadow-sm rounded-3"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="department" className="form-label fw-semibold">Department</label>
            <select
              className="form-select shadow-sm rounded-3"
              id="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option>Information Technology</option>
              <option>Software Engineering</option>
              <option>Electronics and Communication Engineering</option>
              <option>Instrument and Control Engineering</option>
              <option>Water Resource Engineering</option>
              <option>Civil Engineering</option>
              <option>Architecture</option>
              <option>Mechanical Engineering</option>
              <option>Engineering Geology</option>
              <option>Electrical Engineering</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="year" className="form-label fw-semibold">Year</label>
            <select
              className="form-select shadow-sm rounded-3"
              id="year"
              value={formData.year}
              onChange={handleChange}
              required
              disabled={!formData.department}
            >
              <option value="">Select your year</option>
              {getYearOptions().map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <button 
              type="submit" 
              className="btn btn-success w-100 py-2 fs-5 rounded-pill shadow"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Become a Member'}
            </button>
          </div>
        </form>

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
    </div>
  );
}
