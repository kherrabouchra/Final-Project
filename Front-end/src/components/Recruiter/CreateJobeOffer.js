import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { BlackBtn, GoBack, WhiteBtn, Header,TextSub, P, PinkBtn } from "../Global/GlobalComponents";
import { FilterBtnWrapper } from "../Course/Courses/LearnElements";
import { Box, TextField } from "@mui/material";
import { Radio, Grid } from "@nextui-org/react";
import { NumberInput } from "@mantine/core";
import { MdArrowBack } from "react-icons/md";
import { CheckBox, SubHeader } from "../Global/GlobalComponents";
const steps = ['0', '1', '2'];

const Container = styled.div` 
  margin: 0 ;
  padding: 80px;
  margin-top:-70px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  
  width: 1100px;
  background: #FFFFFF;
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

  border-radius: 10px;
  
`;

const Select = styled.select`
  width: 98%;
  padding: 10px;
  border: 1px solid #ccc;
  
  background: #FFFFFF;
  
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
    const [checked, setChecked] = useState(' ');
    const [success, setSuccess]=useState(false)
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [experience, setExperience] = useState("");
    const [additional_info, setAdditional_info] = useState("");
    const [terms, setTerms] = useState("");
    const [onSite, setOnSite] = useState("");
    const [salary, setSalary] = useState("");
    const [data, setData] = useState({
      name: '',
      description: '',
      creator:'',
      level: '', 
      type:'job challenge',
      duration:'',
    
      creationDate : new Date(), banner:'', grading:''
      
    }) 

    const [questions, setQuestions] = useState([
      { question: '', points: '', solution: '', choices: [] }
    ]);
    const [error, setError] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const loc= useLocation();
    const[user, setUser]=useState();


    useEffect(()=>{
      setUser(loc.state)
    },[])
   
    
    const isStepOptional = (step) => {
        return step === 1;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };
    
      const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }  
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(activeStep);
          return newSkipped;
        });
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };
      const handleKeyDown = (event) => {
  
        if (event.key === 'Enter') {
          if (activeStep===0) handleSubmit( ); 
        }
      
      };
      function handleScrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      
    }      

   console.log(questions);
  const handlePointsChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].points = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = { question: '', points: '', choices: [], solution: '' };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (index, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };
   
  const handleCorrectAnswerChange = (index, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].solution = choiceIndex;
    setQuestions(updatedQuestions);
  };
  const handleAddChoice = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push('');
    setQuestions(updatedQuestions);
  };

      const checkFields = (formData) => {
        
      
        if (  !formData.title ||
          !formData.skills ||
          !formData.company ||
          !formData.country ||
          !formData.city ||
          !formData.address ||
          !formData.description ||
          !formData.duration ||
          !formData.experience || 
          !formData.terms ||
          !formData.onSite ||
          !formData.salary) {
          setError("Please fill all the required fields");
          return false;
        } else{
           setError('')
        return true;
        }
       
      };
      function handleScrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      
      
      }

      const navigate=useNavigate()
      const handleCancle=()=>{
        navigate('/joboffers', {state: user})
      }

      useEffect (()=>{
        setData({
          ...data,
          level: checked
        });
       },[checked])
       

     
           const checkFieldsData =(data)=>{
            const credentials = !data.name || !data.description  || !data.level   ;
            if (credentials) {
              setError("Please fill all the required fields");
              return false;
            }else{
              setError('');
              return true;
            }}

            const handleClick = (event) => {
              event.preventDefault(); // Prevent the default form submission behavior
            
              if (activeStep === 0) {

      
                const formData = {
                  title,
                  skills,
                  recruiter: user.userID,
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
                  salary,
                  creationDate: dayjs(new Date()).format('YYYY-MM-DD HH:MM'),
                };
            
                if (!checkFields(formData)) {
                  return;
                } else {
                  handleNext();
                }
              }
            
              if (activeStep === 1) {
                if (!checkFieldsData(data)) {
                  return;
                } else {
                  handleNext();
                }
              }
            };
        console.log(user);
    const handleSubmit = (e) => { 
      setData({...data, creator:user.userID})
      e.preventDefault();
        
        
                      api.post('/hackathons/job', data)
                      .then((r)=>{
                        console.log(r.data);
                                  if(r.data.status==="success"){
                                    console.log(r.data.message); 
                                    
                                    const formData = {
                                      title,
                                      challenge:r.data.id,
                                      skills,
                                      recruiter: user.userID,
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
                                      salary, 
                                      creationDate: dayjs( new Date()).format('YYYY-MM-DD HH:MM'),
                          
                                  };
                             
                                    api.post('/Job',  formData)
            .then((response) => { console.log(response.data);
                if(response.data.status==='success'){

                    console.log('Job offer added successfully!');
               
                setError('');
                }


               
            })
            .catch((error) => {
                console.error('Error adding job offer:', error); 
            });
                                    questions.forEach((q) => {
                                     
                                    api.post('/hackathons/challenge_question', {id: r.data.id, question: q.question,
                                      choices: JSON.stringify(q.choices),
                                      solution: q.solution,
                                      points: q.points})
                                .then((res)=>{console.log(res.data);
                                  if(res.data.status==="success"){console.log(res.data.message);
                                  setSuccess(true)}
                                }).catch((err)=>console.log(err))})
                        }
                      }).catch((err)=>console.log(err))

                    
    };

  
    console.log(data, checked);

    return (
        <Container>

 <Stepper style={{flex: 1,}} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel  {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper> 


      {activeStep===0 && <>
        <Header>Job offer details </Header>
            <TextSub style={{width:'70%', margin:'8px 0 30px 80px  ' }}  >Enter requires information about the job offer to attract appliers. </TextSub>
         
            <FormGroup>
                <Label>Job Title:</Label>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  onKeyDown={handleKeyDown} />
            </FormGroup>
            <Formg>
                <div style={{ flex: 1, marginLeft: 10 }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Skills:</label>
                        <div style={{ display: 'flex', alignItems: 'center', borderRadius: '5px', padding: '2px'}}>
                            <Input 
                                type="text"
                                placeholder="Enter skills"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, marginLeft: "50px" }}>
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
                <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)}   onKeyDown={handleKeyDown} />
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
                <NumberInput type="text" placeholder="salary $$" value={salary} onChange={(value) => setSalary(value)}  onKeyDown={handleKeyDown}  />
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}></div>
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Label>Description</Label>
                        <TextArea value={description} onChange={(e) => setDescription(e.target.value)}  onKeyDown={handleKeyDown}  />
                    </div>

                </div>
            </FormGroup>
            <FormGroup>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Label>Duration</Label>
                        <Select value={duration} onChange={(e) => setDuration(e.target.value)}  onKeyDown={handleKeyDown} >
                            <option>Select an option</option>
                            <option>Full time</option>
                            <option>One-time</option>
                            <option>Seasonal</option>
                        </Select>
                    </div>
                    <div style={{ flex: 1, marginLeft: 10 }}>
                        <Label>Minimum Experience </Label>
                        <Select value={experience} onChange={(e) => setExperience(e.target.value)}  onKeyDown={handleKeyDown} >
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
                <Label>Additional Information(Optional)</Label>
                <TextArea value={additional_info} onChange={(e) => setAdditional_info(e.target.value)}   onKeyDown={handleKeyDown} />
            </FormGroup>
            <FormGroup>
                <Label>Terms and Conditions</Label>
                <TextArea value={terms} onChange={(e) => setTerms(e.target.value)}  onKeyDown={handleKeyDown}  />
            </FormGroup>
            {error && <div className="errmsg">{error}</div>}
            
            </>}

          {activeStep===1 && <>
    <Header>Job challenge </Header>
          
            <TextSub style={{width:'70%', margin:'20px 100px' }} >You are required to create a job challenge for your offer. Enter related details. </TextSub>
          
            <>
  
 <Box 
      
      sx={{ padding:10,
        width: '70%',
        maxWidth: '100%',
      }}
    >  

    {/* <TextEditor/> */}
      <TextField fullWidth label="Name" id="hackname" style={{margin:' 20px'}} 
                	onChange={e => setData({...data, name: e.target.value})} 
                  value={data.name}  onKeyDown={handleKeyDown}  />
       <TextField fullWidth label="Description" multiline id="desc" style={{margin:'0 20px'}} 
                 onChange={e => setData({...data, description: e.target.value})} 
                 value={data.description}  onKeyDown={handleKeyDown}  />
    
           
  <Grid.Container gap={2}  style={{margin:'20px'}}>
    <Grid>
      <Radio.Group 
        label="Level"
        value={checked}
        color= "primary"
        onChange={setChecked}
        orientation="horizontal"  size="sm"
      >
        <Radio value="Beginner">Begginer</Radio>
        <Radio value="Intermediate">Intermediate</Radio>
        <Radio value="Expert">Expert</Radio> 
      </Radio.Group>
    </Grid> 
    </Grid.Container>
   
     
     {error && <div className='errmsg'>{error}</div>}
    </Box>
    </> 
 </>
         
          }

{activeStep === 2 && (
  <>{!success &&<>
    <Header>Job challenge</Header>
    <TextSub style={{ width: '70%', margin: '20px 100px' }}>
      Add a variety of questions to your challenge.
    </TextSub>

    <div
      style={{
            flexDirection: 'column',
            display: 'flex',
        justifyContent: 'flex-end',
        ...(questions.length === 0 && { margin: '30px 0 400px 0' }),
      }}
    >

      <div style={{margin:"20px", display:"flex"}}>
      {questions.length !== 0 && (
        <BlackBtn onClick={() => setQuestions([])}>Reset</BlackBtn>
      )}

      {questions.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 40px',
          }}
        >
          <h3 style={{ color: '#F989E6', margin: '10px' }}>
            Click to add questions.
          </h3>
        </div>
      )}

      <BlackBtn onClick={addQuestion}>+ Question</BlackBtn>
</div>
      {questions.map((q, index) => (
        <div key={index} style={{width:"90"}}>
          <h2 style={{ margin: '30px' }}>Question {index + 1}</h2>

          <NumberInput
            bordered
            label="Points" style={{margin:"20px"}}
            type="number"
            placeholder="0"
            value={q.points}
            onChange={(value) => handlePointsChange(index, value)}
          />

          <TextField
            fullWidth
            label="Question text"
            id={`question-${index}`}
            style={{ margin: '20px' }}
            multiline
            rows={5}
            value={q.question}
            onChange={(event) => handleQuestionChange(index, event.target.value)}
          />

{q.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex} style={{margin:"20px", width:'50%'}}>
              <TextField
                label={`Choice ${choiceIndex + 1}`}
                value={choice}
                onChange={(event) => handleChoiceChange(index, choiceIndex, event.target.value)}
              />

              <input
                type="radio" style={{margin:"20px"}}
                name={`correct-answer-${index}`}
                checked={q.solution === choiceIndex}
                onChange={() => handleCorrectAnswerChange(index, choiceIndex)}
              />
              <label>Correct Answer</label>
            </div>
          ))}

          <div>
            <PinkBtn onClick={() => handleAddChoice(index)} style={{margin:"20px", width:"20%"}}> + Add Choice</PinkBtn>
          </div>
        </div>
      ))}
    </div>
</>}

  </>
)}


           {success ?  <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:"80px"}}>
       
       <SubHeader>Job offer created successfully !</SubHeader>
       <CheckBox></CheckBox>
       <WhiteBtn onClick={handleCancle}> <MdArrowBack/> Go back to job offers</WhiteBtn>
       </div>:
       
       
       <div style={{ display: "flex", justifyContent:'space-between' }}>
              <WhiteBtn onClick={handleBack}> Go back</WhiteBtn>
                <FilterBtnWrapper style={{alignItems:'center'}}>

                <WhiteBtn onClick={handleCancle}>Cancel</WhiteBtn>
                    <BlackBtn style={{padding:"14px 20px "}} onClick={activeStep!==2 ? (e)=> handleClick(e) :(e)=> handleSubmit(e)}>Next</BlackBtn>
                     
                </FilterBtnWrapper>
            </div>
       
       }
            
        </Container>
    );
};

export default CreateJobeOffer;
