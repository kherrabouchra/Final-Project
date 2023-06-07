import React from 'react'
import { Banner, BlackBtn, Container, GoBack, Header, P, PinkBtn, PurpleBtn, SubHeader, TextSub, WhiteBtn } from '../../../Global/GlobalComponents'
import { CourseTitle, TextWrapper } from '../../../Course/Details/CourseElements'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import  { useEffect, useState } from 'react';
import { Parag, Title } from './HackathonDetails';
import { RichTextEditor } from '@mantine/rte'; 
import { renderToString } from 'react-dom/server';

import ReactDOMServer from 'react-dom/server';
import { Code } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import api from '../../../../api/api';
import { Prism } from '@mantine/prism';
 import { useLocation } from 'react-router-dom';
import { Modal } from '@nextui-org/react';
import { FilterBtnWrapper } from '../../../Course/Courses/LearnElements';



const Hackathon = (data) => {
  const [timeLeft, setTimeLeft] = useState('');
   const [instructor,setInst]= useState('')
    const[register, setRegister]=useState('');
   const location= useLocation();

   const [user , setUser]= useState('')
    const[success,setSuccess]=useState('')
   const navigate=useNavigate();


   useEffect(()=>{
    setUser(location.state);
    console.log(user);
   }, [])
useEffect(()=>{
  api.get(`/instructor/${data.data.creator}`)
  .then((res)=>{  
    if(res.data.status==="success"){
  setInst(res.data.data[0]) ; }
  })
  .catch((err)=>console.log(err))
},[data])

 

  useEffect(() => {
    // Calculate the time left
    const calculateTimeLeft = () => {

      const currentTime = new Date().getTime();
      const targetTime = new Date(data.data.endDate).getTime();
      const difference = targetTime - currentTime;

      if (difference > 0) {
        // Calculate the days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format the time left string
        const timeLeftString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setTimeLeft(timeLeftString);
      } else {
        // If the end time has passed, display a message
        setTimeLeft('Closed');
      } 
      // (new Date(hackathon.startDate).toLocaleDateString("ja-JP", 
      // {  day: '2-digit', month: '2-digit',year: 'numeric'}).replace(/\//g, '-')+ "T" + hackathon.start +"Z" )<= new Date().toISOString() &&
   
    };

      // Update the time left every second
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      // Clean up the timer when the component is unmounted
      return () => clearInterval(timer);
    }, [data.data.endDate]); 

 
function renderQuestion(question) {
  const html = question;
  const container = document.createElement('div');
  container.innerHTML = html;

  const codeTags = container.querySelectorAll('code');

  codeTags.forEach((codeTag) => {
    const codeText = codeTag.textContent;
    const codeLanguage = codeTag.getAttribute('language');

    const codeComponent = React.createElement(Code, { language: codeLanguage }, codeText);

    const wrapper = document.createElement('div');
    const renderedCode = renderToString(codeComponent);
    wrapper.innerHTML = renderedCode;

    // Replace the <code> tag with the wrapper div in the container
    codeTag.parentNode.replaceChild(wrapper.firstChild, codeTag);
  });

  // Return the modified HTML string
  return container.innerHTML;
}

     const handleSubmit=(event)=>{
      event.preventDefault();
      api.post(`/hackathons/${data.data.challengeID}/register`, {devID: register.userID})
      .then( 
        (res)=>{console.log(res.data);
          if(res.data.status==='success'){
            console.log(res.data.message);
            setSuccess(register);
             closeHandler()            
          }
        }
      ).catch((err)=>console.log(err))
     }





const handler = (e) => setRegister(user);
const closeHandler = () => { 
   setUser(success);
  setRegister(false);
  console.log("closed");
  
};

console.log(register);
  return (
    <div>
     
        
      <Banner color={'black'} style={{display:"flex"}}>
       <NavLink to="/Compete" state={user}><GoBack color={'white'}/></NavLink> 
<TextWrapper style={{flex:1}} >       
    <CourseTitle color={'white'} title={data.data.name}/>
    <TextSub style={{color: 'white', margin:0}}>{data.data.description}</TextSub>
</TextWrapper>
<PinkBtn style={{alignSelf:"center"}} onClick={handler}>Register now</PinkBtn>

<div>
        <Modal  closeButton  state={user}
        aria-labelledby="modal-title"
        open={register}
        onClose={closeHandler}>
          <Modal.Header>
            <SubHeader>Registration</SubHeader> 
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to participate in this hackathon?</p>
          </Modal.Body>
          <Modal.Footer>
          
            <WhiteBtn onClick={closeHandler}>Cancel</WhiteBtn>
            <BlackBtn onClick={(e)=>handleSubmit(e)}>Register</BlackBtn> 
          </Modal.Footer>
          
          </Modal></div>
      </Banner>



    <Container>
      <div style={{display:"flex",padding:"40px"}}>

    <div style={{padding:"30px", width:"80%"}}>
    <Tabs color="grape" radius="md" orientation="vertical" defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview"  >Overview</Tabs.Tab>
        <Tabs.Tab value="questions" >Problem</Tabs.Tab>
        <Tabs.Tab value="howto" >How to compete?</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" pl="lg">
          <div style={{display:'flex', flexDirection:"column", lineHeight:"1.8rem",  justifyContent:"space-around"}}>
          <Title>Description</Title>
          <Parag>{data.data.background}</Parag>
          <Title>Evaluation criteria</Title>
          <Parag>{data.data.evaluationCriteria}</Parag>
          <Title>Rules</Title>
          <Parag>{data.data.rules}</Parag>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="questions" pl="lg">
      <div style={{display:'flex', flexDirection:"column", lineHeight:"2.4rem",  padding:"0 30px" , justifyContent:"space-around"}}
       dangerouslySetInnerHTML={{ __html: renderQuestion(data.data.question)}}></div>
      </Tabs.Panel>

      <Tabs.Panel value="howto" pl="lg">
       <div style={{padding:"0 30px", lineHeight:"2rem",}}> 
    <SubHeader style={{margin:0}}>Participation</SubHeader>
<ul style={{listStyle:"numbers"}}>
  <li>Get familiar with the problem on the Problem Description and About page.</li>
  <li>Click the "Register" button on the banner to enroll in the competition.</li>
  <li>Download the data from the Data.</li>
  <li>Create and train your own model.</li>
  <li>
Use your model to generate predictions that match the submission format. Click “Submit” in the sidebar, and then “Make new submission”. You’re in!
  </li>
  <li>
Bonus: share your work! Click the "+" icon on the Submissions page and add a link to your approach.

  </li>

</ul>
       </div>
      </Tabs.Panel>
    </Tabs>
    </div>
    <div style={{display:"flex", flex:1,flexDirection:'column' , alignItems:'center', width:"100%"}}>
     
     
     {timeLeft==='Closed' ? '': <P>Time Left: </P> } 
     <h1> {timeLeft}</h1> 
     {timeLeft==='Closed' ? '':<P>ends:{new Date(data.data.endDate).toLocaleDateString()}</P>}
      <div  className='shadow' style={{background:"#fafafa",borderRadius:"25px", height:'300px', padding:"20px",width:"100%", margin: "20px auto ",lineHeight:"3rem"}}>
        <div style={{margin:'auto'}}><p>Level:  {data.data.level}</p>
        <p>Number of participants: {data.data.participants} </p>
        <p>Created by:  {instructor ? instructor.username :''} </p>
        <p>Prize:  </p></div>
      </div>
      <Link to={`/dashboard/hackathon-lobby/1`}>
        Go to lobby
      </Link>
    </div>
    </div>
    </Container>

  
    </div>
  )
}

export default Hackathon
