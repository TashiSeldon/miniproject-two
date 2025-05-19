//src/app/utils/validation.js
export function validateIndividual(individualForm) {
  const { event, name, studentNumber, department, year } = individualForm;
  if (!event) return { valid: false, error: 'Event is required' };
  if (!name.trim()) return { valid: false, error: 'Name is required' };
  if (!studentNumber.trim()) return { valid: false, error: 'Student number is required' };
  if (!department) return { valid: false, error: 'Department is required' };
  if (!year) return { valid: false, error: 'Year is required' };
  return { valid: true };
}

export function validateTeam(teamForm) {
  const {
    event,
    teamName,
    groupLeader,
    groupLeaderStudentNumber,
    department,
    year,
    members,
  } = teamForm;

  if (!event) return { valid: false, error: 'Event is required' };
  if (!teamName.trim()) return { valid: false, error: 'Team name is required' };
  if (!groupLeader.trim()) return { valid: false, error: 'Group leader name is required' };
  if (!groupLeaderStudentNumber.trim()) return { valid: false, error: 'Group leader student number is required' };
  if (!department) return { valid: false, error: 'Department is required' };
  if (!year) return { valid: false, error: 'Year is required' };
  if (!Array.isArray(members) || members.length === 0)
    return { valid: false, error: 'At least one team member is required' };

  const invalidMember = members.find(
    (m) =>
      !m.name.trim() ||
      !m.studentNumber.trim() ||
      !m.department ||
      !m.year
  );

  if (invalidMember)
    return { valid: false, error: 'All team members must have valid info' };

  return { valid: true };
}
