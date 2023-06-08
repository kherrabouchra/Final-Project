import styled from 'styled-components';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BlackBtn } from '../Global/GlobalComponents';
import QRCode from "react-qr-code";
import { useState, useRef,useEffect } from 'react';
import AuthCodeRef from 'react-auth-code-input';
import AuthCode from 'react-auth-code-input';
 import { Header, TextSub } from '../Global/GlobalComponents';
import OtpInput from 'react-otp-input';
  import axios, { Axios } from 'axios'; 
  import { useNavigate } from 'react-router-dom';
  import Authcontext from '../../context/Authprovider';
  import { useDisclosure } from '@mantine/hooks';
  import { LoadingOverlay  , Group } from '@mantine/core';
import { UserContext, UserProvider, login} from '../../hooks/userContext';
import { useContext } from 'react'; 
import api from "../../api/api";

  const steps = [
  'Login',
  'Two factor authentication',
  'Enter code',
]; 


 

export const HorizontalLinearStepper=() =>{
  
  const [instOpen,setInstOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [otp, setOtp] = useState('');
  const [role , setRole]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPwd]= useState(''); 
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const [userID,setId] = useState(null);
  const { login , setUserProvider,userIdProvider} = useContext(UserContext);
  axios.defaults.withCredentials=true;
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
    {activeStep ===1 & instOpen ? 
       setInstOpen(false) :
    setActiveStep((prevActiveStep) => prevActiveStep - 1); 
    setOtp('');
     setError('');
}
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }; 
  


  const checkFields =()=>{
    if (!email || !password){
      setError("Please enter your informations to continue.")
      return false;
    } 
    setError("");
    return true;
  }
const handleSubmit = (event) => {
  event.preventDefault();
  if(!checkFields()){return;};
  axios.post('http://localhost:3000/login', { email: email, password: password })
  .then(res => {
      if(res.data.Status === 'success') {
        handleNext();
        setQrCodeDataUrl(res.data.QR);
        setKey(res.data.key)  ;
       setId(res.data.id);
       setRole(res.data.role);
        setEmail('');
        setPwd('');
        setError('');

      } else {

          setError(res.data.Error);
      }
  })
  .catch(err => console.log(err));
}  


const handleKeyDown = (event) => {
  
  if (event.key === 'Enter') {
    if (activeStep===0) handleSubmit(event);
    if (activeStep===1) handleNext();
    if (activeStep===2) handleVerify();
  }

};
const handleVerify = (event) => {
  
  event.preventDefault();
  axios.post('http://localhost:3000/verify',{ secretKey: key, token: otp, role: role,id: userID})
    .then(res => {  
      if (res.data.Status === 'Success') { 
         console.log("Success");
        setError('');   
       {userID && 
        navigate('/DashboardRedirect',{state:{id: {userID} }})
      
      }
      } else {

    console.log(res.data.Error);
    setOtp('')
    console.log( key);
    setError(res.data.Error);
      }
    })
    .catch(err => console.log(err));
}


  return (<>


      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
           
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>



 
      {activeStep === 0 &&
       <React.Fragment>
        <Header>Login</Header>
       <TextSub>Don't have an account yet?<Link to='/Signup'>Sign up.</Link></TextSub>
      <Box sx={{ display: 'flex', flexDirection: 'column' , padding: '40px 140px' }}>
          <form >
         <FormControl     required sx={{ m: 1, width: '45ch' }} variant="outlined">

         <InputLabel  color={error && "error"}  htmlFor="outlined-adornment-email">Email</InputLabel>
         <OutlinedInput  color={error && "error"}   onKeyDown={handleKeyDown}   autoComplete='true' required 
         id="outlined-adornment-email " type ="email" name="email" label="Email" 
            variant="outlined"  
              onChange={(e)=>setEmail(e.target.value)} value={email} />
          </FormControl>
         <FormControl required sx={{ m: 1, width: '45ch' }} variant="outlined">
         <InputLabel  color={error && "error"}  htmlFor="outlined-adornment-password5">Password</InputLabel>
         <OutlinedInput    color={error && "error"}   onKeyDown={handleKeyDown} onChange={(e)=>setPwd(e.target.value)} value={password} 
           id="outlined-adornment-password5"   autoComplete='true'
           type={showPassword ? 'text' : 'password'}
           endAdornment={
             <InputAdornment position="end">
               <IconButton
                 aria-label="toggle password visibility"
                 onClick={handleClickShowPassword}
                 onMouseDown={handleMouseDownPassword}
                 edge="end" name="password"
               >
                 {showPassword ? <VisibilityOff /> : <Visibility />}
               </IconButton>
             </InputAdornment>
           }
           label="Password"
         /> 
       </FormControl>
       {/* <button type='submit'>log</button> */}
       <Link style={{padding:"20px", textDecoration: "none"}} to="/Forgot_Password" >I Forgot my password.</Link>
       
        </form></Box>
       </React.Fragment>}



      <div className={instOpen? ' ':'hidden'} >
       <Header >Setup instructions</Header>
       <TextSub>Two-factor authentication protects your account by requiring
        an additional code every time you log in.
      </TextSub>
      <div style={{ margin:'20px 120px 0 120px  ',display:'flex', flexDirection:'column', alignItems:"center", lineHeight:'40px',  padding:' 20px', border: '1px solid #000000',
       borderRadius: '30px'}}>
      <p>① Download the authentication app</p>
      <p>② Scan this QR code in the app : </p>
      <img src={qrCodeDataUrl} style={{width:'100px',height:"100px", padding:'0'}} /> 
        
      <p>③ Enter code generated by the app.</p>
        </div></div>



       {activeStep === 1 && <>
 
       <div  className={instOpen? 'hidden':' Login-privacy '} >
       <Header>Your security is
       our priority.
       </Header>
        <TextSub style={{marginTop:'80px'}}> 
        Add extra security to your account with two-factor 
       authentication.
       <Link onClick={()=>setInstOpen(!instOpen)}>See instructions.
       </Link> 
       </TextSub> 
       <img alt='Step-2' src ={'../images/lock.png'} style={{width:"220px", margin:"0 40px 0 0 "}}/></div></> }
      
       
       

      
       {activeStep === 2 &&
       
       
       <div className="otp-container"> 
       <Header>Enter login code:</Header>
       <TextSub>Two-factor authentication protects your account by requiring
        an additional code every time you log in.</TextSub>
        <form  >
      <FormControl  
      sx={{ width: '25ch' , margin: '70px  110px ' }}>
      
       <OtpInput
      value={otp}
      name= "otp"
      inputmode="numeric" autocomplete="one-time-code"
      onChange={(otp)=>{setOtp(otp)}}
      numInputs={6}
      disabled={false} 
      onKeyDown={handleKeyDown(otp)} 
      renderInput={(props) => <input {...props} />}
      inputStyle={ {width:"60px", height:"80px",fontSize:"xx-large" ,  margin: "5px"}}
    />
     </FormControl>
     </form></div>}
      {activeStep === steps.length ? (
        <React.Fragment >
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>{error && <div className='errmsg'>{error}</div> }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,   padding:"40px",top:"630px", position:'absolute', left:'55%'}}>
            <Button
              color="inherit"
              disabled={activeStep === 0 }
              onClick= {handleBack}
              sx={{ mr: 1 }}
            >  Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            {/* `<Link to="/Learn/course"></Link>` */}
           
            { activeStep === steps.length - 1 ? <>
            
              <LoadingOverlay transitionDuration={500} 
         loaderProps={{ size: 'lg', color: 'black' }} 
         visible={visible} overlayBlur={2} />
            <BlackBtn  onClick={handleVerify} > Login </BlackBtn> </>
            :<>  <LoadingOverlay transitionDuration={500} 
            loaderProps={{ size: 'lg', color: 'black' }} 
            visible={visible} overlayBlur={2} /> <Button 
              onClick={activeStep===0? handleSubmit: handleNext} disabled={  instOpen} 
              > Next </Button></>}
          </Box>
        </React.Fragment>
      )}
    </ >
  );
}
 