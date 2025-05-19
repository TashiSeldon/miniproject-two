'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegisterPage() {
  const departments = [
    'Information Technology',
    'Software Engineering',
    'Electronics and Communication Engineering',
    'Instrument and Control Engineering',
    'Water Resource Engineering',
    'Civil Engineering',
    'Architecture',
    'Mechanical Engineering',
    'Engineering Geology',
    'Electrical Engineering'
  ];

  const yearOptions = {
    'Architecture': ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
    'Software Engineering': ['1st Year', '2nd Year'],
    'Water Resource Engineering': ['1st Year', '2nd Year'],
    'Mechanical Engineering': ['1st Year', '2nd Year'],
    'default': ['1st Year', '2nd Year', '3rd Year', '4th Year']
  };

  const [individualData, setIndividualData] = useState({
    name: '',
    email: '',
    studentNumber: '',
    department: '',
    year: '',
    comment: '',
    eventId: ''
  });

  const [teamData, setTeamData] = useState({
    eventId: '',
    teamName: '',
    memberCount: '',
    teamMembers: ''
  });

  const [isTeam, setIsTeam] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { name: '', email: '', studentNumber: '', department: '', year: '', comment: '' }
  ]);

  const formData = isTeam ? teamData : individualData;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isTeam) {
      setTeamData({ ...teamData, [name]: value });
    } else {
      setIndividualData({ ...individualData, [name]: value });
    }

    // Reset isTeam if event changes to a non-team event
    if (name === 'eventId') {
      const teamEvents = ['eventTwo', 'eventFour'];
      if (!teamEvents.includes(value)) {
        setIsTeam(false);
        setTeamMembers([{ name: '', email: '', studentNumber: '', department: '', year: '', comment: '' }]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isTeam) {
      // Validate teamData
      if (!teamData.teamName || !teamData.eventId || !teamData.teamMembers) {
        alert('Please fill in all required team fields');
        return;
      }

      const payload = {
        eventId: teamData.eventId,
        teamName: teamData.teamName,
        members: teamData.teamMembers
      };

      const res = await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Team registered successfully!');
        router.push('/');
      } else {
        alert('Something went wrong.');
      }
    } else {
      const res = await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify(individualData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Registered successfully!');
        router.push('/');
      } else {
        alert('Something went wrong.');
      }
    }
  };

  const getYearOptions = (dept) => {
    if (yearOptions[dept]) return yearOptions[dept];
    return yearOptions['default'];
  };

  const teamEvents = ['eventTwo', 'eventFour'];
  const isTeamEventSelected = teamEvents.includes(formData.eventId);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', color: '#212529' }}>
      <header
        className="py-5 mb-4"
        style={{
          backgroundColor: '#0d3b66',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold display-5">Event Registration</h1>
          <p className="lead text-light">Secure your spot in the event of your choice</p>
        </div>
      </header>

      <section className="container">
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <div className="p-4 rounded-4 bg-white shadow-sm" style={{ border: '1px solid #dee2e6' }}>
            <form onSubmit={handleSubmit}>

              {/* Event Select */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Event</label>
                <select
                  name="eventId"
                  onChange={handleChange}
                  className="form-select"
                  required
                  value={formData.eventId}
                >
                  <option value="">-- Choose an Event --</option>
                  <option value="eventOne">Tech Talk: Future of AI</option>
                  <option value="eventTwo">Coding Challenge 2025</option>
                  <option value="eventThree">Web Development Bootcamp</option>
                  <option value="eventFour">Hackathon: Code for Good</option>
                </select>
              </div>

              {isTeamEventSelected && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Register as</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="individualRadio"
                        className="form-check-input"
                        checked={!isTeam}
                        onChange={() => setIsTeam(false)}
                      />
                      <label className="form-check-label" htmlFor="individualRadio">Individual</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        id="teamRadio"
                        className="form-check-input"
                        checked={isTeam}
                        onChange={() => setIsTeam(true)}
                      />
                      <label className="form-check-label" htmlFor="teamRadio">Team</label>
                    </div>
                  </div>
                </div>
              )}

              {!isTeam ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      name="name"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your full name"
                      required
                      value={individualData.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. john@example.com"
                      required
                      value={individualData.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Student Number</label>
                    <input
                      name="studentNumber"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. ETS123456"
                      required
                      value={individualData.studentNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Department</label>
                    <select
                      name="department"
                      onChange={handleChange}
                      className="form-select"
                      required
                      value={individualData.department}
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((dept, idx) => (
                        <option key={idx} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Year</label>
                    <select
                      name="year"
                      onChange={handleChange}
                      className="form-select"
                      required
                      value={individualData.year}
                    >
                      <option value="">-- Select Year --</option>
                      {getYearOptions(individualData.department).map((yr, idx) => (
                        <option key={idx} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Comments (Optional)</label>
                    <textarea
                      name="comment"
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                      placeholder="Any questions or notes?"
                      value={individualData.comment}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Team Name</label>
                    <input
                      name="teamName"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your team name"
                      required
                      value={teamData.teamName}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Number of Team Members</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      name="memberCount"
                      value={teamData.memberCount}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter number of members"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Team Members</label>
                    <textarea
                      name="teamMembers"
                      value={teamData.teamMembers}
                      onChange={handleChange}
                      className="form-control"
                      rows={4}
                      placeholder="Enter full names of all team members, separated by commas or new lines"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                style={{ backgroundColor: '#0d3b66', borderColor: '#0d3b66' }}
              >
                Submit Registration
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
