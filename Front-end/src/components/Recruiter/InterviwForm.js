import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
 import api from '../../api/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PurpleBtn, WhiteBtn ,SubHeader, CheckBox,} from '../Global/GlobalComponents';
import { MdArrowBack } from 'react-icons/md';
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
  border-radius: 32px;
  transform: translateY(150px);
  font-size: 17px;
  
`;


const InputGroup = styled.div`
display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 16px;
  background: #FFFFFF;
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
 
  border-radius: 10px;
 
  max-width: 320px;
`;
const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 182px;
  background: #FFFFFF;
 
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
  justify-content: space-between;
  align-items:center;
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
margin-top: -30px;
margin-left:20%;
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
    const [jobOffer, setJobOffer] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [duration, setDuration] = useState('');
    const [link, setLink]=useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const[success, setSuccess]=useState(false);
    const [candidate, setCandidate]=useState('')
    const {id}=useParams();
    const l=useLocation();
    console.log("state:",l);
    const user=l.state.user;
    const job= l.state.job;
     const [data, setData] = useState({
            title:'',
            jobOffer:'',
            developerID:'',
            date:'',
            hour:'',
            duration:'',
            additionalInfo:'',
            link:'',
           
        });
    const handleSubmit = (e) => {
        e.preventDefault();
        
console.log(data);
        api.post('interview/saveinterview',  {title , jobOffer, developerID, date , hour, duration, additionalInfo, link})
            .then((response) => {console.log(response.data);
                if(response.data.status==='success'){

                console.log('Interview added successfully!');
                setTitle('');
                setJobOffer('');
                setDate('');
                setHour('');
                setDuration('');
                setAdditionalInfo('');
                setdeveloperID('');
                setSuccess(true);

                }
            })
            .catch((error) => {
                console.error('Error adding interview:', error);
            });
    };
 
    ////get users
    const [users, setUsers] = useState(null);

    
    useEffect(() => {

        //console.log(users);
       setdeveloperID(id);
       setJobOffer( job)
        api.get('/interview/dev')
            .then(res => {
                setUsers(res.data.users) 
               //console.log(res.data.users)
            })
            .catch(err => console.log(err));
 
        api.get(`/job/candidate/${id}`)
        .then((res)=>{console.log(res.data);
            if(res.data.status==="success"){
                console.log(res.data.data);
                setCandidate(res.data.data)
            }
        })
    }, [])


    const handleReset = () => {
        setTitle('');
        setdeveloperID('');
        setJobOffer('');
        setDate('');
        setHour('');
        setDuration('');
        setAdditionalInfo('');
    };
 
    const navigate=useNavigate()
  const handleCancle=(e)=>{
    e.preventDefault()
    navigate(`/candidates`, {state:user})
  }

    return (<>
    {!success &&     <AA>
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


              


 
                
               <div style={{display:'flex', width:"100%"}}><InputGroup>
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
                </InputGroup><InputGroup>
                    <Label>Duration (minutes)</Label>
                    <Input
                        type="number"
                        min="15"
                        max="120"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </InputGroup></div> 
                <InputGroup>
                    <Label>Interview Link</Label>
                    <Input
                    
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <Label>Additional Information</Label>
                    <TextArea style={{padding:"20px"}}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                </InputGroup>

                <ButtonGroup>
                    <div style={{display:'flex'}}>
                    <WhiteBtn type="button" onClick={handleReset}>Reset</WhiteBtn>
                    <WhiteBtn type="button" onClick={handleCancle}>Cancel</WhiteBtn></div>
                    <PurpleBtn type="submit" onClick={handleSubmit}>Submit</PurpleBtn>

                </ButtonGroup>

            </FormContainer>
        </AA>}
 {success && <AA>
    <FormContainer><div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:"80px"}}>
       
       <SubHeader>Job interview created successfully !</SubHeader>
       <CheckBox></CheckBox>
       <WhiteBtn onClick={handleCancle}> <MdArrowBack/> Go back to job offers</WhiteBtn>
       </div> </FormContainer></AA> 
       } </>  );
}

export default InterviewForm;