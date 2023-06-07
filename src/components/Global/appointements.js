const appointments = [
  {
    id: 1,
    title: 'Meeting with John',
    startDate: new Date(2023, 4, 2, 9, 30),
    endDate: new Date(2023, 4, 2, 10, 0),
    location: 'Room 1',
    notes: 'Meeting about project X',
    attendees: ['John'],
  },
  {
    id: 2,
    title: 'Lunch with Susan',
    startDate: new Date(2023, 4, 2, 12, 0),
    endDate: new Date(2023, 4, 2, 13, 0),
    location: 'Restaurant',
    notes: 'Susan is vegetarian',
    attendees: ['Susan'],
  },
  {
    id: 3,
    title: 'Conference call with team',
    startDate: new Date(2023, 4, 3, 14, 0),
    endDate: new Date(2023, 4, 3, 15, 0),
    location: 'Online',
    notes: 'Discuss project status',
    attendees: ['John', 'Susan', 'Bob'],
  },
  // Add more appointments as needed...
];

export default appointments;
