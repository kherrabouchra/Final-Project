import React, { useEffect, useState } from 'react';
import { json, useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';
import { Loading, Grid, Radio, Progress } from '@nextui-org/react';
import { P, SubHeader,Header, PurpleBtn, TextSub, PinkBtn } from '../../Global/GlobalComponents';
import Spline from '@splinetool/react-spline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Parag } from '../../Hackathon/dev/Details/HackathonDetails'; 
import { MdArrowBack } from 'react-icons/md'; 
const Sloading = () => {
  return <Spline scene="https://prod.spline.design/zMRNvNoZlhkCXZho/scene.splinecode" />;
};

const JobChallenge = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState('');
  const [challenge, setChallenge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState('');
  const[result, setResult]= useState(false)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
const [points, setPoints] = useState(0);



  const totalTime = 5 * 60 + 8; // Total time in seconds
const isTimeUp = elapsedTime >= totalTime;

  const loc = useLocation();
  const user= loc.state;
 
const [answer, setAnswer]= useState({
    challenge: '',
    developer:user.userID,

    input:[],
    score:0, 
    time:'',

})
  useEffect(() => {
    api.get(`/job/get/${id}/challenge`).then((res) => {
      if (res.data.status === 'success') {
        setChallenge(res.data.data); 
 

}
    });

    api.get(`/job/get/${id}`)
      .then((res) => {
        if (res.data.status === 'success') {
          setJobDetails(res.data.data);
        }
      })
      .catch((e) => console.log(e));

    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, [id]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleQuizSubmission = () => {
    // Calculate the remaining time
    const remainingTime = totalTime - elapsedTime;

    // Send the remaining time to the backend API
    // ...

    // Reset the elapsed time
    setElapsedTime(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const calculateProgress = () => {
    const progress = (elapsedTime / totalTime) * 100;
    return Math.round(progress);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

 

  useEffect(() => {
    if (checked) {
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        input: [...prevAnswer.input, checked] 
      }));
    }
  }, [checked]);
  useEffect(() => {
    if (challenge.length > 0) {
      const totalPoints = challenge.reduce((accumulator, currentChallenge) => {
        return accumulator + currentChallenge.points;
      }, 0);
      setPoints(totalPoints);

  
    }
  }, [challenge]);

const handleNext = (e) => {

    e.preventDefault()

  if (currentChallengeIndex < challenge.length - 1) {
    const currentChallenge = challenge[currentChallengeIndex];
    const selectedInput = checked;
    const solution = currentChallenge.solution; 
    // Compare the selected input with the solution
    if (selectedInput === currentChallenge.choices[solution]) {
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        score: prevAnswer.score + currentChallenge.points
      }));
    } 
      setChecked('')
    setCurrentChallengeIndex((prevIndex) => prevIndex + 1);

  }else{ 

    
    const currentChallenge = challenge[currentChallengeIndex];
    const selectedInput = checked;
    const solution = currentChallenge.solution;
    // Compare the selected input with the solution
    if (selectedInput === currentChallenge.choices[solution]) {
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        score: prevAnswer.score + currentChallenge.points
      }));
    } 

    
    handleSubmit(e);

  }
}; 
 const navigate= useNavigate()

    useEffect(()=>{
    if(isTimeUp===true){


        setTimeout(() => {
            navigate(`/jobs/${id}`, {state:user})
        }, 3000);
    }
    },[isTimeUp, totalTime])

const handleSubmit = (e) => {
    e.preventDefault();
  
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      time: elapsedTime,
      challenge: challenge[0].challenge,
      input: JSON.stringify(prevAnswer.input)
    })   ); 
  
  };
  
useEffect(() => {
    if (answer.time !== '') {
      api.post('/job/challenge/submission', answer)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            setResult(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [answer.time]);
  const currentChallenge = challenge[currentChallengeIndex];

  return (
    <div>
      {loading ? (
        <div style={{ background: '#fafafa', display: 'flex', height: '100vh' }}>
          <Grid style={{ position: 'absolute', top: '40vh', right: '150px', zIndex: 1 }}>
            <SubHeader data-aos="fade-left">Take this challenge to apply!</SubHeader>
            <div style={{ display: 'flex', marginLeft: '130px', marginTop:"10px" }}>
              <P>You have 5 minutes to complete this challenge</P>
              <Loading color="primary" textColor="grey" size="md" type="points" />
            </div>
          </Grid>
          <Sloading style={{ zIndex: 0, overflow: 'visible', width: '20vw', height: '50px', marginLeft: '200px' }} />
        </div>
      ) : (
        <div style={{ background: 'black', height: '100vh', width: '100vw', display:'flex' }}>
          <div style={{ height: '10vh', padding: '50px',   margin: '70px  80px'}}>
          {isTimeUp ? (
            <h1 style={{color:'white'}}>Time is up !</h1>
              ) : 
              
              <>
              {!result ? 
              
              
              <><h1 style={{color:'white', margin:"10px"}}>Time left:</h1><Box sx={{ position: 'relative', display: 'inline-flex' }}>
              
              <CircularProgress  variant="determinate" value={calculateProgress()} size={140} color='secondary' />
              <Box 
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" id= 'quizc' style={{fontSize:"30px", fontWeight:900, color:"white"}} component="div" color="text.secondary">
                {formatTime(totalTime - elapsedTime)}
                </Typography>
              </Box>
            </Box></> : <h3 style={{    color:"white"}}>Completed in: {answer.time>60 ? `${answer.time/60} minutes`:  `${answer.time} seconds`}</h3>}</>}
          </div>




          <div className="shadow" style={{ background: 'white', margin: '80px  ', borderRadius: '20px', width: '45svw' ,
           padding: '40px' , height:"40vw", display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
   
            
       {  !result ? (<> <Grid>
              <Progress
              id='quizbar' size="md" value={challenge ? ((currentChallengeIndex + 1) / challenge.length) * 100 : 0}
              /> <P>{currentChallengeIndex} / {challenge.length}</P>
            </Grid> 
            <Parag>{currentChallenge.question}</Parag>
            <Grid>
              <Radio.Group label="Select an answer:" color="secondary" value={checked} onChange={setChecked}>
               
              {currentChallenge.choices &&
                  currentChallenge.choices.map((c)=>{
                return(
                    <Radio value={c}> {c}</Radio>


                )
               })} 
              </Radio.Group>
            </Grid>
            <PurpleBtn style={{alignSelf:'flex-end'}} onClick={(e)=>handleNext(e) }>{(currentChallengeIndex < challenge.length - 1)  ?  'Next': 'Submit'}</PurpleBtn>
      </> ) :(
       
       <>
       <div style={{alignItems:'center', justifyContent:'center ', display:"flex", flexDirection:"column"}}>
        <SubHeader style={{margin:' auto', padding:0, width:"84%"}}>Thank you for applying !</SubHeader>
        <P>You will be contacted soon.</P>
        <div style={{margin:"80px"}}>
        <h1>Your score:</h1>
        <div style={{display:'flex', padding:"30px"}}><Header style={{fontSize:"100px"}} >{answer.score} </Header> <TextSub>/{points} </TextSub></div>
       </div>
       <PinkBtn to={'/dashboard'} state={user}> <MdArrowBack/> Go Back </PinkBtn>
       </div>
       </>)}  </div>
        </div>
      )}
    </div>
  );
};

export default JobChallenge;
