import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: #f1f1f1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const JobOffersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const JobOfferCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 20px;
`;

const JobOfferName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const JobOfferDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const JobOfferParticipants = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const JobOfferDeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const JobOfferUpdateButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const InterviewCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 30%;
  margin-bottom: 20px;
`;

const InterviewTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InterviewItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InterviewDateTime = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const InterviewProfileName = styled.p`
  font-size: 16px;
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  margin-top: 20px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const CalendarContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 30%;
`;

const CalendarTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const DashMain = () => {
  const [interviews, setInterviews] = useState([
    {
      datetime: 'May 15, 10:00 AM',
      profileName: 'John Doe',
    },
    {
      datetime: 'May 16, 2:00 PM',
      profileName: 'Jane Doe',
    },
    {
      datetime: 'May 20, 3:00 PM',
      profileName: 'Bob Smith',
    },
  ]);

  const jobOffers = [
    {
      title: 'Frontend Developer',
      description: 'React, HTML, CSS',
      participants: '10 Participants',
    },
    {
      title: 'Backend Developer',
      description: 'Node.js, MongoDB',
      participants: '5 Participants',
    },
    {
      title: 'Full Stack Developer',
      description: 'React, Node.js, MongoDB',
      participants: '8 Participants',
    },
  ];

  return (
    <DashboardContainer>
      <CardContainer>
        <JobOffersContainer>
          {jobOffers.map((jobOffer, index) => (
            <JobOfferCard key={index}>
              <JobOfferName>{jobOffer.title}</JobOfferName>
              <JobOfferDescription>{jobOffer.description}</JobOfferDescription>
              <JobOfferParticipants>{jobOffer.participants}</JobOfferParticipants>
              <div>
                <JobOfferDeleteButton>Delete</JobOfferDeleteButton>
                <JobOfferUpdateButton>Update</JobOfferUpdateButton>
              </div>
            </JobOfferCard>
          ))}
        </JobOffersContainer>
        <InterviewCard>
          <InterviewTitle>Interviews</InterviewTitle>
          {interviews.map((interview, index) => (
            <InterviewItem key={index}>
              <InterviewDateTime>{interview.datetime}</InterviewDateTime>
              <InterviewProfileName>{interview.profileName}</InterviewProfileName>
            </InterviewItem>
          ))}
        </InterviewCard>
      </CardContainer>
      <TableContainer>
        <TableTitle>Upcoming Events</TableTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Date</TableHeader>
              <TableHeader>Event</TableHeader>
            </tr>
          </thead>
          <tbody>
            <TableRow>
              <TableCell>May 15, 10:00 AM</TableCell>
              <TableCell>Interview with John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>May 16, 2:00 PM</TableCell>
              <TableCell>Interview with Jane Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>May 20, 3:00 PM</TableCell>
              <TableCell>Interview with Bob Smith</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </TableContainer>
      <CalendarContainer>
        <CalendarTitle>Calendar</CalendarTitle>
        <Calendar
          localizer={localizer}
          events={[
            {
              title: 'Interview with John Doe',
              start: new Date(2023, 4, 15, 10, 0),
              end: new Date(2023, 4, 15, 11, 0),
            },
            {
              title: 'Interview with Jane Doe',
              start: new Date(2023, 4, 16, 14, 0),
              end: new Date(2023, 4, 16, 15, 0),
            },
            {
              title: 'Interview with Bob Smith',
              start: new Date(2023, 4, 20, 15, 0),
              end: new Date(2023, 4, 20, 16, 0),
            },
          ]}
          style={{ height: '500px' }}
        />
      </CalendarContainer>
    </DashboardContainer>
  );
};

export default DashMain;