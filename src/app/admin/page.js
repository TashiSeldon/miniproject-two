'use client';
import React, { useState, useEffect } from 'react';
import ParticipationTypeSelector from '../component/ParticipationTypeSelector';
import EventSelector from '../component/EventSelector';
import TeamMemberInput from '../component/TeamMember';
// import { validateTeamMembers } from '@/utils/validation';

const EventRegistrationForm = () => {
  const [registrationType, setRegistrationType] = useState('');
  const [eventName, setEventName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  // Reset team members based on participation type
  useEffect(() => {
    if (registrationType === 'team') {
      setTeamMembers([{ name: '', studentId: '' }]);
    } else {
      setTeamMembers([]);
    }
  }, [registrationType]);

  const handleParticipationChange = (type) => {
    setRegistrationType(type);
  };

  const handleEventChange = (event) => {
    setEventName(event);
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', studentId: '' }]);
  };

  const removeTeamMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !registrationType) {
      alert('Please select both event and participation type.');
      return;
    }

    if (registrationType === 'team') {
      const isValid = validateTeamMembers(teamMembers);
      if (!isValid) {
        alert('Please fill out all team member fields correctly.');
        return;
      }
    }

    const formData = {
      event: eventName,
      type: registrationType,
      team: registrationType === 'team' ? teamMembers : null,
    };

    console.log('Submitting:', formData);
    // TODO: Send formData to the backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md max-w-xl mx-auto">
      <EventSelector selectedEvent={eventName} onEventChange={handleEventChange} />
      <ParticipationTypeSelector selectedType={registrationType} onTypeChange={handleParticipationChange} />

      {registrationType === 'team' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Team Members</h3>
          {teamMembers.map((member, index) => (
            <TeamMemberInput
              key={index}
              index={index}
              name={member.name}
              studentId={member.studentId}
              onChange={handleTeamMemberChange}
              onRemove={() => removeTeamMember(index)}
              showRemove={teamMembers.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={addTeamMember}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Member
          </button>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default EventRegistrationForm;
