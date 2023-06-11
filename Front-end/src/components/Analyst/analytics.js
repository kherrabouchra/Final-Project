import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AnalyticForm = () => {
  const [userID, setUserID] = useState('');
  const [analyticType, setAnalyticType] = useState('');
  const [activity, setActivity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to your backend or perform the necessary actions
    // For this example, we'll just log the values to the console
    console.log('UserID:', userID);
    console.log('Analytic Type:', analyticType);
    console.log('Activity:', activity);

    // Reset the form fields
    setUserID('');
    setAnalyticType('');
    setActivity('');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>User ID:</Label>
          <Input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Analytic Type:</Label>
          <Input
            type="text"
            value={analyticType}
            onChange={(e) => setAnalyticType(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Activity:</Label>
          <Input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    </FormContainer>
  );
};

export default AnalyticForm;
