import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../api/api';

import axios from "axios";


const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 990px;
  width: 100%;
  margin: 40px auto 0;
  padding: 16px;
  border: 1px solid #ccc;
  height: 740px;
  background: #FFFFFF;
  box-shadow: 0px 4px 27px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  transform: translateY(150px);
  font-size: 17px;
  
`;


const InputGroup = styled.div`
display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 16px;
  background: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
 padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #FFFFFF;
 
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
 
  max-width: 320px;
`;
const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 182px;
  background: #FFFFFF;
 
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  resize: none;
`;


const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 17px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
position: absolute;
width: 104px;
height: 38px;
left: calc(50% - 104px/2 - 432px);
top: 94%;

background: #8D8AFD;
mix-blend-mode: normal;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.26);
border-radius: 50px;
color : white;
`;

const ResetButton = styled(Button)`
position: absolute;
width: 104px;
height: 38px;
left: calc(50% - 104px/2 - 297px);
top: calc(50% - 38px/2 + 425px);

background: #202020;
mix-blend-mode: normal;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.26);
border-radius: 50px;
color : white;
top: 94%;

`;

const CancelButton = styled(Button)`

position: absolute;
width: 104px;
height: 38px;
left: calc(50% - 104px/2 + 343px);
top: calc(50% - 38px/2 + 425px);

background: #202020;
mix-blend-mode: normal;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.26);
border-radius: 50px;
color : white;
top: 94%;

`;


const Title = styled.div`
    position: absolute;
    width: 383px;
    height: 2px;
   
    top: -80px;

    font-family: 'Inter';
    font-style: normal;
 
    font-size: 34px;
    line-height: 126.7%;
    /* identical to box height, or 51px */


    color: #202020;

`;
const CandidateInfoWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;

 
`


const InputWrapper = styled.div`
  position: relative;
  margin-top: 31px;
  margin-right: 100px;
`;

const Labelb = styled(Label)`
  position: absolute;
  top: -20px;
  left: 0;
  margin-top: -10px;
  margin-right: 10px;
  
`;
const AA = styled.div`
margin-top: -10px;
`
const columns = [
    {
        title: "username",
        dataIndex: "username",
        key: "username",
    }]



function InterviewForm() {

    const [title, setTitle] = useState('');
    const [developerID, setdeveloperID] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [duration, setDuration] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title,
            jobRole,
            developerID,
            date,
            hour,
            duration,
            additionalInfo,
           
        };
      

        axios.post('http://localhost:5000/interview/saveinterview', data)
            .then((response) => {
                alert('Interview added successfully!');
                setTitle('');
                setJobRole('');
                setDate('');
                setHour('');
                setDuration('');
                setAdditionalInfo('');
                setdeveloperID('');
              
            })
            .catch((error) => {
                console.error('Error adding interview:', error);
                alert('Failed to add interview');
            });
    };

    // Use useEffect to handle cleanup when the component unmounts
    useEffect(() => {
        const source = axios.CancelToken.source();
        return () => {
            source.cancel('Component unmounted');
        }
    }, []);

    ////get users
    const [users, setUsers] = useState(null);

    
    useEffect(() => {

        //console.log(users);

        axios.get('http://localhost:5000/interview/dev')
            .then(res => {
                setUsers(res.data.users)
               //console.log(res.data.users)
            })
            .catch(err => console.log(err));
    }, [])


    const handleReset = () => {
        setTitle('');
        setdeveloperID('');
        setJobRole('');
        setDate('');
        setHour('');
        setDuration('');
        setAdditionalInfo('');
    };

    const handleCancel = () => {
        // TODO: handle cancel action
    };


    return (
        <AA>
            <FormContainer >
                <Title>Create Interview</Title>
                <InputGroup>
                    <Label>Title of the interview </Label>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </InputGroup>


                <InputGroup>
                    <Label>Candidate name</Label>
                    <Select value={developerID} onChange={(e) => setdeveloperID(e.target.value)}>
                        <option value="">-- Select candidate name --</option>
                        {users &&
                            users.map((user) => (
                                <option key={user.userID} value={user.userID}>
                                    {user.username}
                                </option>
                            ))}
                    </Select>
                </InputGroup>





                <InputGroup>
                    <Label>Job Role</Label>
                    <Select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
                        <option value="">--Please select a job role--</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Designer">Designer</option>
                        <option value="Other">Other</option>
                    </Select>
                </InputGroup>
                <InputGroup>
                    <Label>Date</Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label>Time</Label>
                    <Input
                        type="time"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label>Duration (in minutes)</Label>
                    <Input
                        type="number"
                        min="15"
                        max="120"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label>Additional Information</Label>
                    <TextArea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                </InputGroup>

                <ButtonGroup>
                    <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
                    <ResetButton type="button" onClick={handleReset}>Reset</ResetButton>
                    <CancelButton type="button" onClick={handleCancel}>Cancel</CancelButton>
                </ButtonGroup>

            </FormContainer>
        </AA>
    );
}

export default InterviewForm;