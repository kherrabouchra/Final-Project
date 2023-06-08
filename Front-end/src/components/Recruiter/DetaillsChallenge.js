import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  margin-top: 90px;
  align-items: center;
  justify-content: center;
  height: 80%;


`;

const Card = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 1000px;
  height: 80%;
  padding: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  position: absolute;
    width: 1000px;
    height: 2px;
   
    top: 18px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 126.7%;
    /* identical to box height, or 51px */


    color: #202020;

`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CounterButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: #8D8AFD;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Counter = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  resize: none;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckBox = styled.input`
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 20%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #8D8AFD;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const DetaillsChallenge = () => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(1);
  const [description, setDescription] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState({
    beginner: false,
    intermediate: false,
    expert: false,
  });
  const [rules, setRules] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleSeatsIncrease = () => setSeats(prevSeats => prevSeats + 1);
  const handleSeatsDecrease = () => setSeats(prevSeats => prevSeats > 1 ? prevSeats - 1 : 1);
  const handleDescriptionChange = e => setDescription(e.target.value);
  const handleOrganizationTypeChange = e => setOrganizationType(e.target.value);
  const handleOrganizationNameChange = e => setOrganizationName(e.target.value);
  const handleDurationChange = e => setDuration(e.target.value);
  const handleLevelChange = e => {
    const { name, checked } = e.target;
    setLevel(prevState => ({ ...prevState, [name]: checked }));
  };
  const handleRulesChange = e => setRules(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log({
      name,
      seats,
      description,
      organizationType,
      organizationName,
      duration,
      level,
      rules,
    });
  };

  return (
    <FormContainer>
       <Title>Details</Title>
      <Card>
       
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="name">Title Name</Label>
            <Input placeholder="Name" value={name} onChange={handleNameChange} id="name" />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="seats">Number of Seats</Label>
            <CounterContainer>
              <CounterButton type="button" onClick={handleSeatsDecrease}>-</CounterButton>
              <Counter>{seats}</Counter>
              <CounterButton type="button" onClick={handleSeatsIncrease}>+</CounterButton>
            </CounterContainer>
          </InputContainer>
          <TextArea placeholder="Description" value={description} onChange={handleDescriptionChange} />
          <InputContainer>
            <Label htmlFor="organizationType">Organization Type</Label>
            <Select value={organizationType} onChange={handleOrganizationTypeChange} id="organizationType">
              <option value="">Select a company</option>
              <option value="company1">Company 1</option>
              <option value="company2">Company 2</option>
              <option value="company3">Company 3</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="organizationName">Organization Name</Label>
            <Input placeholder="Organization Name" value={organizationName} onChange={handleOrganizationNameChange} id="organizationName" />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onChange={handleDurationChange} id="duration">
              <option value="">Select a duration</option>
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Level</Label>
            <CheckBoxContainer>
              <label htmlFor="beginner">
                <CheckBox type="radio" name="level" value="Beginner" />
                Beginner
              </label>
              <label htmlFor="intermediate">
                <CheckBox type="radio" name="level" value="intermediate" />
                Intermediate
              </label>
              <label htmlFor="expert">
                <CheckBox type="radio" name="level" value="Expert" />
                Expert
              </label>
            </CheckBoxContainer>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="rules">Rules</Label>
            <TextArea placeholder="Rules" value={rules} onChange={handleRulesChange} id="rules" />
          </InputContainer>
          <ButtonContainer>
            <Button type="submit">Submit</Button>
          </ButtonContainer>
        </form>
      </Card>
    </FormContainer>
  );
};

export default DetaillsChallenge;