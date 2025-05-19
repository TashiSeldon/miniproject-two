'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const eventsData = [
  {
    id: "eventOne",
    title: "Tech Talk: Future of AI",
    type: "workshop",
    date: "April 25, 2025",
    time: "10:00 AM",
    venue: "CST Team Hall",
    description: "A talk on the real-world application and challenges of Artificial Intelligence in the modern tech ecosystem.",
  },
  {
    id: "eventTwo",
    title: "Coding Challenge 2025",
    type: "competition",
    date: "May 10, 2025",
    time: "1:30 PM",
    venue: "Lecture Theater 3",
    description: "Compete with peers to solve algorithmic problems within a 2-hour challenge. Certificates and prizes await the top scorers.",
  },
  {
    id: "eventThree",
    title: "Workshop: Web Development Bootcamp",
    type: "workshop",
    date: "June 5, 2025",
    time: "9:00 AM",
    venue: "CST Lab 3",
    description: "A hands-on workshop for beginners to learn the basics of web development using HTML, CSS, and JavaScript.",
  },
  {
    id: "eventFour",
    title: "Hackathon: Code for Good",
    type: "competition",
    date: "April 27, 2025",
    time: "11:00 AM",
    venue: "CST Conference Hall",
    description: "A 3-hour hackathon where teams compete to build innovative solutions for real-world problems.",
  }
];

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

export default function RegisterPage() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [registrationType, setRegistrationType] = useState('individual');
  const [formData, setFormData] = useState({
    name: '',
    collegeEmail: '',
    department: '',
    year: '',
    teamName: '',
    teamMembers: [{ name: '', collegeEmail: '', department: '', year: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  const selectedEventData = eventsData.find(event => event.id === selectedEvent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [field]: value
    };
    
    // If department changes, reset year
    if (field === 'department') {
      updatedTeamMembers[index].year = '';
    }
    
    setFormData(prev => ({
      ...prev,
      teamMembers: updatedTeamMembers
    }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 4) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { 
          name: '', 
          collegeEmail: '', 
          department: '', 
          year: '' 
        }]
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if event is selected
    if (!selectedEvent) {
      setError('Please select an event');
      setLoading(false);
      return;
    }

    // Validate individual registration
    if (registrationType === 'individual') {
      if (!formData.name) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      if (!formData.collegeEmail) {
        setError('Please enter your college email');
        setLoading(false);
        return;
      }
      if (!formData.department) {
        setError('Please select your department');
        setLoading(false);
        return;
      }
      if (!formData.year) {
        setError('Please select your year');
        setLoading(false);
        return;
      }
    }

    // Validate team registration
    if (registrationType === 'team') {
      if (!formData.teamName) {
        setError('Please enter a team name');
        setLoading(false);
        return;
      }

      const invalidMember = formData.teamMembers.findIndex(member => 
        !member.name || !member.collegeEmail || !member.department || !member.year
      );

      if (invalidMember !== -1) {
        setError(`Please fill in all fields for team member ${invalidMember + 1}`);
        setLoading(false);
        return;
      }
    }

    try {
      const registrationData = {
        eventId: selectedEvent,
        registrationType,
        ...formData
      };

      console.log('Submitting registration data:', registrationData);

      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setRegistrationDetails({
        ...data,
        event: selectedEventData
      });
      setSuccess(true);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.push('/student/event');
  };

  useEffect(() => {
    console.log('Modal state:', showSuccessModal);
  }, [showSuccessModal]);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', color: '#212529' }}>
      {/* Header */}
      <header className="py-5 mb-4" style={{
        backgroundColor: '#0d3b66',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="container text-center">
          <h1 className="fw-bold display-5 text-white">
            Event Registration
          </h1>
          <p className="lead text-white-50">
            Secure your spot in the event of your choice
          </p>
        </div>
      </header>

      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Event Selection */}
                  <div className="mb-4">
                    <label className="form-label">Select Event</label>
                    <select
                      className="form-select"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                      required
                    >
                      <option value="">Choose an event...</option>
                      {eventsData.map(event => (
                        <option key={event.id} value={event.id}>
                          {event.title} - {event.date}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Registration Type */}
                  {selectedEventData && selectedEventData.type === 'competition' && (
                    <div className="mb-4">
                      <label className="form-label">Registration Type</label>
                      <div className="d-flex gap-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="registrationType"
                            id="individual"
                            value="individual"
                            checked={registrationType === 'individual'}
                            onChange={(e) => setRegistrationType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="individual">
                            Individual
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="registrationType"
                            id="team"
                            value="team"
                            checked={registrationType === 'team'}
                            onChange={(e) => setRegistrationType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="team">
                            Team
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Team Name (if team registration) */}
                  {registrationType === 'team' && (
                    <div className="mb-4">
                      <label className="form-label">Team Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  {/* Individual Registration Form */}
                  {registrationType === 'individual' ? (
                    <div className="mb-4">
                      <h5 className="mb-3">Personal Information</h5>
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">College Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="collegeEmail"
                          value={formData.collegeEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Department</label>
                        <select
                          className="form-select"
                          name="department"
                          value={formData.department}
                          onChange={(e) => {
                            handleInputChange(e);
                            setFormData(prev => ({ ...prev, year: '' }));
                          }}
                          required
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
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          disabled={!formData.department}
                          required
                        >
                          <option value="">-- Select Year --</option>
                          {(departmentYears[formData.department] || []).map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <h5 className="mb-3">Team Members</h5>
                      {formData.teamMembers.map((member, index) => (
                        <div key={index} className="mb-4 p-3 border rounded">
                          <h6 className="mb-3">Member {index + 1}</h6>
                          <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={member.name}
                              onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">College Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={member.collegeEmail}
                              onChange={(e) => handleTeamMemberChange(index, 'collegeEmail', e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                              className="form-select"
                              value={member.department}
                              onChange={(e) => handleTeamMemberChange(index, 'department', e.target.value)}
                              required
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
                              value={member.year}
                              onChange={(e) => handleTeamMemberChange(index, 'year', e.target.value)}
                              disabled={!member.department}
                              required
                            >
                              <option value="">-- Select Year --</option>
                              {member.department && departmentYears[member.department]?.map((yr) => (
                                <option key={yr} value={yr}>
                                  {yr}
                                </option>
                              ))}
                            </select>
                          </div>

                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeTeamMember(index)}
                            >
                              Remove Member
                            </button>
                          )}
                        </div>
                      ))}

                      {formData.teamMembers.length < 4 && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={addTeamMember}
                        >
                          Add Team Member
                        </button>
                      )}
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Registering...' : 'Register Now'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => router.push('/student/event')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Modal 
        show={showSuccessModal} 
        onHide={handleCloseSuccessModal} 
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            Registration Successful!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registrationDetails && (
            <div>
              <div className="text-center mb-4">
                <div className="display-1 text-success mb-3">✓</div>
                <h4 className="mb-3">
                  {registrationType === 'team' 
                    ? `Thank you for registering your team "${registrationDetails.teamName}"`
                    : `Thank you for registering, ${registrationDetails.name}!`}
                </h4>
                <p className="lead">
                  Please be at {registrationDetails.event.venue} at {registrationDetails.event.time} on {registrationDetails.event.date}.
                </p>
              </div>
              
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title mb-3">Registration Details</h5>
                  <p><strong>Event:</strong> {registrationDetails.event.title}</p>
                  <p><strong>Date:</strong> {registrationDetails.event.date}</p>
                  <p><strong>Time:</strong> {registrationDetails.event.time}</p>
                  <p><strong>Venue:</strong> {registrationDetails.event.venue}</p>
                  <p><strong>Registration ID:</strong> {registrationDetails._id}</p>
                  <p><strong>Status:</strong> <span className="badge bg-warning">Pending</span></p>
                  
                  {registrationType === 'team' && (
                    <div className="mt-3">
                      <p><strong>Team Members:</strong></p>
                      <ul className="list-unstyled">
                        {registrationDetails.teamMembers.map((member, index) => (
                          <li key={index} className="mb-2">
                            {member.name} - {member.department} (Year {member.year})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="alert alert-info mt-3">
                <p className="mb-0">
                  <strong>Note:</strong> Please arrive at the venue 15 minutes before the event starts.
                  Bring your student ID for verification.
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Return to Events
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
