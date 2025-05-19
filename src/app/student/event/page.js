"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/component/header/page';
import Footer from '@/app/component/footer/page';
import Link from 'next/link';

const defaultEventsData = [
  {
    id: "eventOne",
    title: "Tech Talk: Future of AI",
    date: "April 25, 2025",
    time: "10:00 AM",
    venue: "CST Team Hall",
    description: "A talk on the real-world application and challenges of Artificial Intelligence in the modern tech ecosystem.",
    vision: "To inspire students and professionals to explore the potential of AI in transforming industries.",
    mission: "To provide insights into the challenges, ethics, and future of AI in various fields, encouraging future collaborations and innovations.",
    markingCriteria: [
      "Content Understanding – 30%",
      "Presentation Skills – 25%",
      "Relevance & Research – 25%",
      "Audience Interaction – 20%"
    ]
  },
  {
    id: "eventTwo",
    title: "Coding Challenge 2025",
    date: "May 10, 2025",
    time: "1:30 PM",
    venue: "Lecture Theater 3",
    description: "Compete with peers to solve algorithmic problems within a 2-hour challenge. Certificates and prizes await the top scorers.",
    vision: "To foster a competitive and collaborative environment for students to sharpen their coding and problem-solving skills.",
    mission: "To encourage critical thinking, problem-solving, and time management through coding challenges that mirror real-world tech scenarios.",
    markingCriteria: [
      "Number of Correct Submissions – 50%",
      "Time Efficiency – 30%",
      "Code Optimization – 20%"
    ]
  },
  {
    id: "eventThree",
    title: "Workshop: Web Development Bootcamp",
    date: "June 5, 2025",
    time: "9:00 AM",
    venue: "CST Lab 3",
    description: "A hands-on workshop for beginners to learn the basics of web development using HTML, CSS, and JavaScript.",
    vision: "To equip students with the foundational skills required for web development in a fast-paced tech environment.",
    mission: "To provide an immersive, practical learning experience that enables students to build functional websites from scratch.",
    markingCriteria: [
      "Project Completion – 50%",
      "Code Quality – 30%",
      "Creativity – 20%"
    ]
  },
  {
    id: "eventFour",
    title: "Hackathon: Code for Good",
    date: "April 27, 2025",
    time: "11:00 AM",
    venue: "CST Conference Hall",
    description: "A 3-hour hackathon where teams compete to build innovative solutions for real-world problems.",
    vision: "To encourage innovation and collaboration among students to develop impactful solutions that can change the world.",
    mission: "To empower students to apply their skills in a high-pressure environment while solving meaningful societal challenges.",
    markingCriteria: [
      "Innovation – 40%",
      "Technical Implementation – 30%",
      "Impact – 20%",
      "Presentation – 10%"
    ]
  }
];

export default function EventPage() {
  const { user } = useAuth();
  const [openEventId, setOpenEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    vision: '',
    mission: '',
    markingCriteria: ['']
  });
  const router = useRouter();
  const openEvent = events.find(event => event.id === openEventId);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/admin/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        // Add unique IDs to events from API if they don't have one
        const eventsWithIds = data.map((event, index) => ({
          ...event,
          id: event._id || `api-event-${index}` // Use _id from MongoDB
        }));
        // Combine new events with default events, putting new events first
        setEvents([...eventsWithIds, ...defaultEventsData]);
      } catch (err) {
        setError(err.message);
        // If API fails, use default events
        setEvents(defaultEventsData);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle adding new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add event');
      }
      
      const data = await response.json();
      // Add the new event to the beginning of the events array
      setEvents(prevEvents => [data.event, ...prevEvents]);
      setShowAddForm(false);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        venue: '',
        description: '',
        vision: '',
        mission: '',
        markingCriteria: ['']
      });
    } catch (err) {
      console.error('Error adding event:', err);
      setError(err.message);
    }
  };

  // Handle deleting event
  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete event');
      }
      
      // Remove the deleted event from the state
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center text-danger p-5">Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="min-vh-100 bg-light">
        <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', color: '#212529' }}>
          {/* Header */}
         <header className="py-5 mb-4" style={{
          backgroundColor: '#0d3b66',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="container text-center">
            <h1 className="fw-bold display-5 text-white">
              ACM Student Chapter Events
            </h1>
            <p className="lead text-white-50">
              Explore and register for upcoming tech-driven events
            </p>
          </div>
        </header>

          <section className="container">
            {/* Admin Controls */}
            {user?.role === 'admin' && (
              <div className="mb-4">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary mb-3"
                >
                  Add New Event
                </button>

                {/* Add Event Form Modal */}
                <Modal show={showAddForm} onHide={() => setShowAddForm(false)} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleAddEvent}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="text"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control
                          type="text"
                          value={newEvent.venue}
                          onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={newEvent.description}
                          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Vision</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={newEvent.vision}
                          onChange={(e) => setNewEvent({...newEvent, vision: e.target.value})}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Mission</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={newEvent.mission}
                          onChange={(e) => setNewEvent({...newEvent, mission: e.target.value})}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Marking Criteria</Form.Label>
                        {newEvent.markingCriteria.map((criteria, index) => (
                          <div key={`criteria-${index}`} className="mb-2">
                            <Form.Control
                              type="text"
                              value={criteria}
                              onChange={(e) => {
                                const newCriteria = [...newEvent.markingCriteria];
                                newCriteria[index] = e.target.value;
                                setNewEvent({...newEvent, markingCriteria: newCriteria});
                              }}
                              placeholder={`Criteria ${index + 1}`}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setNewEvent({
                            ...newEvent,
                            markingCriteria: [...newEvent.markingCriteria, '']
                          })}
                        >
                          Add Criteria
                        </Button>
                      </Form.Group>

                      <div className="text-end">
                        <Button variant="secondary" onClick={() => setShowAddForm(false)} className="me-2">
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                          Add Event
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="row g-4">
              {events.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                  <div 
                    className="card h-100 shadow-sm hover-shadow transition"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenEventId(event.id)}
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{event.title}</h5>
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-muted">Date: {new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-muted">Time: {event.time}</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <span className="text-muted">Venue: {event.venue}</span>
                      </div>
                      <p className="card-text text-muted">{event.description}</p>
                    </div>
                    <div className="card-footer bg-transparent border-top-0">
                      {user?.role === 'admin' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(event.id);
                          }}
                          className="btn btn-danger w-100 mb-2"
                        >
                          Delete Event
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/student/event/registerpage`);
                        }}
                        className="btn btn-primary w-100 py-2"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Details Modal */}
            <Modal show={!!openEventId} onHide={() => setOpenEventId(null)}>
              <Modal.Header closeButton>
                <Modal.Title>{openEvent?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <p><strong>Date:</strong> {openEvent && new Date(openEvent.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {openEvent?.time}</p>
                  <p><strong>Venue:</strong> {openEvent?.venue}</p>
                  <p><strong>Description:</strong> {openEvent?.description}</p>
                  <p><strong>Vision:</strong> {openEvent?.vision}</p>
                  <p><strong>Mission:</strong> {openEvent?.mission}</p>
                  {openEvent?.markingCriteria && openEvent.markingCriteria.length > 0 && (
                    <div>
                      <strong>Marking Criteria:</strong>
                      <ul className="mt-2">
                        {openEvent.markingCriteria.map((item, index) => (
                          <li key={`criteria-item-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpenEventId(null)}>
                  Close
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setOpenEventId(null);
                    router.push('/student/event/registerpage');
                  }}
                >
                  Register Now
                </Button>
              </Modal.Footer>
            </Modal>
          </section>

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
      <Footer />
      <style jsx>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        .transition {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
