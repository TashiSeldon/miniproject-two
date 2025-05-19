'use client';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const eventsData = [
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
  const [openEventId, setOpenEventId] = useState(null);

  const openEvent = eventsData.find(event => event.id === openEventId);

  return (
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
        <h3 className="mb-4 fw-semibold text-primary">Upcoming Events</h3>
        <div className="list-group">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="list-group-item list-group-item-action mb-3 shadow-sm rounded"
              style={{ backgroundColor: '#fff', cursor: 'pointer' }}
              onClick={() => setOpenEventId(event.id)}
            >
              <h5 className="mb-1 fw-bold">{event.title}</h5>
              <p className="mb-1"><strong>Date:</strong> {event.date}</p>
              <p className="mb-0"><strong>Time:</strong> {event.time}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Modal show={!!openEventId} onHide={() => setOpenEventId(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{openEvent?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {openEvent?.date}</p>
            <p><strong>Time:</strong> {openEvent?.time}</p>
            <p><strong>Venue:</strong> {openEvent?.venue}</p>
            <p><strong>Description:</strong> {openEvent?.description}</p>
            <p><strong>Vision:</strong> {openEvent?.vision}</p>
            <p><strong>Mission:</strong> {openEvent?.mission}</p>
            <strong>Marking Criteria:</strong>
            <ul>
              {openEvent?.markingCriteria.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpenEventId(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Register Button */}
        <div className="text-center my-5">
          <a href="/student/event/registerpage" className="btn btn-lg fw-semibold px-5" style={{
            backgroundColor: '#0d3b66',
            color: '#fff',
            borderRadius: '2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            Register for any Event
          </a>
        </div>
      </section>
    </div>
  );
}
