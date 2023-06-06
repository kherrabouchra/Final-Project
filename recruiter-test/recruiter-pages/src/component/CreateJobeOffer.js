import styled from "styled-components";
import axios from "axios";
import React, { useState } from 'react';


const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  
  border: 1px solid #ddd;
  border-radius: 8px;
  
  width: 1000px;
  background: #FFFFFF;
  box-shadow: 0px 4px 27px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  transform: translateY(150px);
`;

const Title = styled.h2`
   position: absolute;
    width: 383px;
    height: 1px;
  
    top: -86px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700px;
    font-size: 34px;
 
    /* identical to box height, or 51px */


    color: #202020;

`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  
`;

const Input = styled.input`
  width: 98%;
  padding: 10px;
  border: 1px solid #ccc;
 
  background: #FFFFFF;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  
`;

const Select = styled.select`
  width: 98%;
  padding: 10px;
  border: 1px solid #ccc;
  
  background: #FFFFFF;
  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  
  display: flex;
  resize: none;
  background: #FFFFFF;
  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
 
`;

const Button = styled.button`
  padding: 10px 20px;

  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  background: #8D8AFD;
  mix-blend-mode: normal;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  color : white;
  &:last-of-type {
    margin-right: 0;
  }
`;
const Formg = styled.div`
  display: flex;
  align-items: center;`
const RadioLabel = styled.label`
display: flex;
align-items: center;
margin-right: 20px;

@media screen and (max-width: 768px) {
  margin-bottom: 10px;
  margin-right: 0;
}
`;
const RadioInput = styled.input`
  margin-right: 5px;
`;


const CreateJobeOffer = () => {
    const [title, setTitle] = useState("");
    const [skills, setSkills] = useState("");
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("");

    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [experience, setExperience] = useState("");
    const [additional_info, setAdditional_info] = useState("");
    const [terms, setTerms] = useState("");
    const [onSite, setOnSite] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            skills,
            company,
            country,
            city,
            address,
            description,
            onSite,
            additional_info,
            terms,
            duration,
            experience,
            salary

        };
        console.log(formData);

        axios.post('http://localhost:5000/interview/Job', formData)
            .then((response) => {
                alert('Job offer added successfully!');
                setTitle('');
                setSkills('');
                setCompany('');
                setCountry('');
                setCity('');
                setAddress('');
                setDescription('');
                setDuration('');
                setExperience('');
                setAdditional_info('');
                setOnSite('');
                setSalary('');
                setTerms('');
            })
            .catch((error) => {
                console.error('Error adding job offer:', error);
                alert('Failed to add job offer');
            });
    };



    return (
        <Container>

            <Title>Create a Job Offer</Title>
            <FormGroup>
                <Label>Job Title:</Label>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <Formg>
                <div style={{ flex: 1, marginLeft: 10 }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Skills:</label>
                        <div style={{ display: 'flex', alignItems: 'center', borderRadius: '5px', padding: '2px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <input style={{ flex: '1', border: 'none', outline: 'none', backgroundColor: '#fff', fontSize: '16px', padding: '10px' }}
                                type="text"
                                placeholder="Enter skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, marginLeft: 10 }}>
                    <Label>Remote or On-site:</Label>
                    <div>
                        <RadioLabel>
                            <RadioInput type="radio" name="location" value="remote" onChange={(e) => setOnSite(e.target.value)} />
                            Remote
                        </RadioLabel>
                        <RadioLabel>
                            <RadioInput type="radio" name="location" value="onsite" onChange={(e) => setOnSite(e.target.value)} />
                            On-site
                        </RadioLabel>
                    </div>

                </div>
            </Formg>
            <FormGroup>
                <Label>Company:</Label>
                <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </FormGroup>
            <FormGroup>

                <div style={{ display: "flex" }}>

                    <div style={{ flex: 1, marginRight: 10 }}>
                        <Label>Country:</Label>
                        <Input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div style={{ flex: 1, marginRight: 10 }}>
                        <Label>City:</Label>
                        <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div style={{ flex: 1, marginRight: 29 }}>
                        <Label>Adress:</Label>

                        <Input type="text" placeholder="adress" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>
            </FormGroup>
            <FormGroup>
                <Label>Salary</Label>
                <Input type="text" placeholder="salary $$" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}></div>
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Label>Description</Label>
                        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                </div>
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Label>Duration</Label>
                        <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                            <option>Select an option</option>
                            <option>Full time</option>
                            <option>One-time</option>
                            <option>Seasonal</option>
                        </Select>
                    </div>
                    <div style={{ flex: 1, marginLeft: 10 }}>
                        <Label>Minimum Experience </Label>
                        <Select value={experience} onChange={(e) => setExperience(e.target.value)}>
                            <option>Select an option</option>
                            <option>0-2 years</option>
                            <option>3-5 years</option>
                            <option>5-7 years</option>
                            <option>More than 7 years</option>
                        </Select>
                    </div>
                </div>
            </FormGroup>
            <FormGroup>
                <Label>Additional Information</Label>
                <TextArea value={additional_info} onChange={(e) => setAdditional_info(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Terms and Conditions</Label>
                <TextArea value={terms} onChange={(e) => setTerms(e.target.value)} />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Button onClick={handleSubmit}>Create Job Challenge</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
        </Container>
    );
};

export default CreateJobeOffer;
