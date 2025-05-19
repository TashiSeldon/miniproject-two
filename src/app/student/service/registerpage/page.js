'use client';

import React, { useState } from 'react';

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

export default function ServiceRegisterPage() {
  const [formData, setFormData] = useState({ name: '', department: '', year: '', service: '' });

  // ...rest of your form logic (handleSubmit, etc.)...

  return (
    <form>
      {/* Department Dropdown */}
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
      {/* Year Dropdown */}
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
      {/* ...rest of your form fields and submit button... */}
    </form>
  );
} 