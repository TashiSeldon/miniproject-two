'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    activeEvents: 0,
    totalParticipants: 0,
    pendingApprovals: 0
  });

  const [registrations, setRegistrations] = useState({
    individualRegistrations: [],
    teamRegistrations: [],
    serviceRegistrations: [],
    membershipRegistrations: []
  });

  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    venue: '',
    time: '',
    vision: '',
    mission: '',
    markingCriteria: [''] 
  });
  const [newNews, setNewNews] = useState({ title: '', content: '', category: '', imageUrl: '', imageAlt: '', author: '', publicationDate: '', source: '' });
  const [studentContent, setStudentContent] = useState({
    welcomeMessage: '',
    featuredEvents: [],
    announcements: []
  });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' });

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add new state for event mapping
  const [eventMap, setEventMap] = useState({});

  // Add state for editing
  const [editEvent, setEditEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Wrap eventsData in useMemo
  const eventsData = React.useMemo(() => [
    {
      id: "eventOne",
      title: "Tech Talk: Future of AI",
      date: "April 25, 2025",
      time: "10:00 AM",
      venue: "CST Team Hall"
    },
    {
      id: "eventTwo",
      title: "Coding Challenge 2025",
      date: "May 10, 2025",
      time: "1:30 PM",
      venue: "Lecture Theater 3"
    },
    {
      id: "eventThree",
      title: "Workshop: Web Development Bootcamp",
      date: "June 5, 2025",
      time: "9:00 AM",
      venue: "CST Lab 3"
    },
    {
      id: "eventFour",
      title: "Hackathon: Code for Good",
      date: "April 27, 2025",
      time: "11:00 AM",
      venue: "CST Conference Hall"
    }
  ], []);

  // Wrap fetch functions in useCallback
  const fetchRegistrations = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/registrations');
      if (!response.ok) throw new Error('Failed to fetch registrations');
      const data = await response.json();
      setRegistrations(data);
      
      // Update stats with null checks
      const individualRegs = data.individualRegistrations || [];
      const teamRegs = data.teamRegistrations || [];
      const serviceRegs = data.serviceRegistrations || [];
      const membershipRegs = data.membershipRegistrations || [];
      
      setStats({
        totalRegistrations: individualRegs.length + teamRegs.length + serviceRegs.length + membershipRegs.length,
        activeEvents: new Set([...individualRegs, ...teamRegs].map(r => r.eventId)).size,
        totalParticipants: individualRegs.length + teamRegs.reduce((acc, team) => acc + (team.teamMembers?.length || 0), 0),
        pendingApprovals: serviceRegs.filter(s => s.status === 'pending').length + membershipRegs.filter(m => m.status === 'pending').length
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      // Create a mapping of event IDs to event details
      const mapping = {};
      eventsData.forEach(event => {
        mapping[event.id] = event;
      });
      setEventMap(mapping);
      setEvents(eventsData);
    } catch (err) {
      setError(err.message);
    }
  }, [eventsData]);

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchStudentContent = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/student-content');
      if (!response.ok) throw new Error('Failed to fetch student content');
      const data = await response.json();
      setStudentContent(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
    fetchNews();
    fetchStudentContent();
  }, [fetchRegistrations, fetchEvents, fetchNews, fetchStudentContent]);

  // Handle service request status update
  const handleServiceStatus = async (id, status) => {
    try {
      const response = await fetch('/api/admin/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      if (!response.ok) throw new Error('Failed to update service status');
      
      // Refresh data after update
      fetchRegistrations();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle membership status update
  const handleMembershipStatus = async (id, status) => {
    try {
      const response = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'membership', status })
      });

      if (!response.ok) throw new Error('Failed to update membership status');
      
      // Refresh data after update
      fetchRegistrations();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete registration
  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    try {
      const response = await fetch('/api/admin/registrations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id })
      });

      if (!response.ok) throw new Error('Failed to delete registration');
      
      // Refresh data after deletion
      fetchRegistrations();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add these new handler functions
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });

      if (!response.ok) throw new Error('Failed to add event');
      
      setNewEvent({ title: '', description: '', date: '', venue: '', time: '', vision: '', mission: '', markingCriteria: [''] });
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });

      if (!response.ok) throw new Error('Failed to add news');
      
      setNewNews({ title: '', content: '', category: '', imageUrl: '', imageAlt: '', author: '', publicationDate: '', source: '' });
      fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    console.log('Attempting to delete event with id:', id);
    try {
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log('Delete API response:', data);
      if (!response.ok) throw new Error('Failed to delete event');
      fetchEvents();
    } catch (err) {
      console.error('Delete event error:', err);
      setError(err.message);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!confirm('Are you sure you want to delete this news?')) return;

    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete news');
      fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new handler for student content
  const handleUpdateStudentContent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/student-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentContent)
      });

      if (!response.ok) throw new Error('Failed to update student content');
      
      // Show success message
      alert('Student page content updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement)
      });

      if (!response.ok) throw new Error('Failed to add announcement');
      
      setNewAnnouncement({ title: '', content: '', priority: 'normal' });
      // Refresh student content
      fetchStudentContent();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(`/api/admin/announcements?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete announcement');
      fetchStudentContent();
    } catch (err) {
      setError(err.message);
    }
  };

  const StatCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );

  const [showAddForm, setShowAddForm] = useState(false);

  // Edit event handler
  const handleEditEvent = (event) => {
    setEditEvent(event);
    setShowEditModal(true);
  };

  // Update event handler
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/events?id=${editEvent._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEvent)
      });
      if (!response.ok) throw new Error('Failed to update event');
      setShowEditModal(false);
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Dark Blue Background */}
        <div className="bg-blue-900 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'overview' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'services' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'registrations' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Registrations
            </button>
            <button
              onClick={() => setActiveTab('memberships')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'memberships' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Memberships
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'events' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Upcoming Events
            </button>
          <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'news' ? 'bg-white text-blue-900' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              Tech News
          </button>
        </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Registrations" 
            value={stats.totalRegistrations} 
          />
          <StatCard 
            title="Active Events" 
            value={stats.activeEvents} 
          />
          <StatCard 
            title="Total Participants" 
            value={stats.totalParticipants} 
          />
          <StatCard 
            title="Pending Approvals" 
            value={stats.pendingApprovals} 
          />
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome to the admin dashboard. Use the tabs above to manage different aspects of the system.</p>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Service Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations?.serviceRegistrations?.map((service) => (
                    <tr key={service._id || `service-${service.name}-${service.service}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{service.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          service.status === 'approved' ? 'bg-green-100 text-green-800' :
                          service.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleServiceStatus(service._id, 'approved')}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleServiceStatus(service._id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Event Registrations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations?.individualRegistrations?.map((registration) => {
                    const event = eventMap[registration.eventId];
                    return (
                      <tr key={registration._id || `ind-${registration.name}-${registration.eventId}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{registration.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.title || 'Unknown Event'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.date || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.venue || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">Individual</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete('individual', registration._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {registrations?.teamRegistrations?.map((team) => {
                    const event = eventMap[team.eventId];
                    return (
                      <tr key={team._id || `team-${team.teamName}-${team.eventId}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{team.teamName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.title || 'Unknown Event'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.date || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{event?.venue || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">Team</div>
                            <div className="text-gray-500">Members: {team.teamMembers?.length || 0}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete('team', team._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
        </div>
      )}

        {activeTab === 'memberships' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Membership Requests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations?.membershipRegistrations?.map((member) => (
                    <tr key={member._id || `member-${member.email}`}>
                      <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{member.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          member.status === 'approved' ? 'bg-green-100 text-green-800' :
                          member.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {member.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleMembershipStatus(member._id, 'approved')}
                              className="text-green-600 hover:text-green-900 mr-2"
                            >
                              Approve
                            </button>
      <button
                              onClick={() => handleMembershipStatus(member._id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Events Section */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Upcoming Events</h2>
            
            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Add New Event</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Venue"
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add Event
              </button>
            </form>

            {/* Admin Events Table (CRUD) */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events?.filter(event => event._id).map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{event.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{event.venue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEditEvent(event)} className="text-blue-600 hover:text-blue-800 mr-4">Edit</button>
                        <button onClick={() => handleDeleteEvent(event._id)} className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* News Section */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Tech News</h2>
            
            {/* Add News Form */}
            <form onSubmit={handleAddNews} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Add New Tech News</h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="News Title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({...newNews, category: e.target.value})}
                  className="p-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="AI">Artificial Intelligence</option>
                  <option value="WebDev">Web Development</option>
                  <option value="Mobile">Mobile Development</option>
                  <option value="Cloud">Cloud Computing</option>
                  <option value="Security">Cybersecurity</option>
                </select>
                <textarea
                  placeholder="News Content"
                  value={newNews.content}
                  onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                  className="p-2 border rounded h-32"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      placeholder="Enter image URL (e.g., Imgur link)"
                      value={newNews.imageUrl}
                      onChange={(e) => setNewNews({...newNews, imageUrl: e.target.value})}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
                    <input
                      type="text"
                      placeholder="Describe the image"
                      value={newNews.imageAlt}
                      onChange={(e) => setNewNews({...newNews, imageAlt: e.target.value})}
                      className="p-2 border rounded w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                    <input
                      type="text"
                      placeholder="Author's full name"
                      value={newNews.author}
                      onChange={(e) => setNewNews({...newNews, author: e.target.value})}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date</label>
                    <input
                      type="date"
                      value={newNews.publicationDate}
                      onChange={(e) => setNewNews({...newNews, publicationDate: e.target.value})}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source/Publication</label>
                  <input
                    type="text"
                    placeholder="Source or publication name"
                    value={newNews.source}
                    onChange={(e) => setNewNews({...newNews, source: e.target.value})}
                    className="p-2 border rounded w-full"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add News
      </button>
    </form>

            {/* News List */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news?.map((item) => (
                    <tr key={item._id || `news-${item.title}-${item.category}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteNews(item._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateEvent}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editEvent?.title || ''}
                onChange={e => setEditEvent({ ...editEvent, title: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editEvent?.date ? new Date(editEvent.date).toISOString().split('T')[0] : ''}
                onChange={e => setEditEvent({ ...editEvent, date: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                value={editEvent?.venue || ''}
                onChange={e => setEditEvent({ ...editEvent, venue: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editEvent?.description || ''}
                onChange={e => setEditEvent({ ...editEvent, description: e.target.value })}
                required
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowEditModal(false)} className="me-2">Cancel</Button>
              <Button variant="primary" type="submit">Update Event</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
