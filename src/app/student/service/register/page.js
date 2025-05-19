"use client";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const departmentYears = {
  'Software Engineering': ['1st', '2nd'],
  'Water Resource Engineering': ['1st', '2nd'],
  'Mechanical Engineering': ['1st', '2nd'],
  'Architecture': ['1st', '2nd', '3rd', '4th', '5th'],
  'Information Technology': ['1st', '2nd', '3rd', '4th'],
  'Electronics and Communication Engineering': ['1st', '2nd', '3rd', '4th'],
  'Instrument and Control Engineering': ['1st', '2nd', '3rd', '4th'],
  'Civil Engineering': ['1st', '2nd', '3rd', '4th'],
  'Engineering Geology': ['1st', '2nd', '3rd', '4th'],
  'Electrical Engineering': ['1st', '2nd', '3rd', '4th'],
};

export default function Register() {
  const [formData, setFormData] = useState({ name: '', department: '', year: '', service: '' });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/serviceregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(true);
        setFormData({ name: '', department: '', year: '', service: '' });
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting form.');
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
        }}
      >
        <div className="container">
          <h1 className="text-white text-center">Register for Services</h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="col-md-8 mx-auto bg-white p-4 rounded shadow">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value, year: '' })}
            >
              <option value="">-- Select Department --</option>
              {Object.keys(departmentYears).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              disabled={!formData.department}
            >
              <option value="">-- Select Year --</option>
              {(departmentYears[formData.department] || []).map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Service Required</label>
            <textarea
              className="form-control"
              rows="3"
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ✅ Thank you for registering! We appreciate your interest in our services.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
