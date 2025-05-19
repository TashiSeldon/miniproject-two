'use client';

import { useState } from 'react';

export default function MembershipRegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', year: '', department: '' });
  const [message, setMessage] = useState('');

  // Departments with only 1st and 2nd year
  const twoYearDepartments = ['Software Engineering', 'Water Resource Engineering', 'Mechanical Engineering'];

  // Departments with 1st to 5th year
  const fiveYearDepartments = ['Architecture'];

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'department') {
      setForm((prev) => {
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
      setForm({ ...form, [id]: value });
    }
  };

  const getYearOptions = () => {
    if (fiveYearDepartments.includes(form.department)) {
      return ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
    }
    if (twoYearDepartments.includes(form.department)) {
      return ['1st Year', '2nd Year'];
    }
    if (form.department) {
      return ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/register-member', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Successfully registered!');
        setForm({ name: '', email: '', year: '', department: '' });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container my-5 px-4 py-5 rounded-4 shadow-lg bg-light" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4 text-primary fw-bold">CST ACM Chapter Membership Registration</h2>

      {message && (
        <div className="alert alert-info text-center fw-semibold rounded-pill">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control shadow-sm rounded-3"
            id="name"
            value={form.name}
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
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="department" className="form-label fw-semibold">Department</label>
          <select
            className="form-select shadow-sm rounded-3"
            id="department"
            value={form.department}
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
            value={form.year}
            onChange={handleChange}
            required
            disabled={!form.department}
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
          <button type="submit" className="btn btn-success w-100 py-2 fs-5 rounded-pill shadow">
            Become a Member
          </button>
        </div>
      </form>
    </div>
  );
}
