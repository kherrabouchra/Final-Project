import styled from 'styled-components';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
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
import QRCode from "react-qr-code";
import { useState, useRef } from 'react';
import AuthCodeRef from 'react-auth-code-input';
import AuthCode from 'react-auth-code-input';
 import { Header,SubHeader, TextSub,BlackBtn, CheckBox } from '../Global/GlobalComponents';
import OtpInput from 'react-otp-input';
  import { useEffect } from 'react';
  import axios from 'axios';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeApp } from "firebase/app"; 
import firebase from "firebase/app";
import { TypeCheckBox, TypeChecked } from '../Signup/SignupElements';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const steps = [
  'Forgot your password?',
  'Reset email',
  'Password reset',
];
 
function QRCodeComponent() {
  const [dataURL, setDataURL] = useState(null);

  // Make a request to the backend to get the QR code image data URL
  useEffect(() => {
    axios.get('/api/generate-qr-code')
      .then(res => setDataURL(res.data.dataURL))
      .catch(err => console.log('Error getting QR code:', err));
  }, []);
  return (
    <div>
      {dataURL ? <QRCode value={dataURL} /> : 'Loading QR code...'}
    </div>
  );
}
export const ForgotPassword=() =>{
  const [email, setEmail] = useState("");
  
  const [instOpen,setInstOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [otp, setOtp] = useState('');

   
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
    {activeStep ===1 & instOpen ?  setInstOpen(false) :
             
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  
  const firebaseConfig = {
    apiKey: "AIzaSyBI5wXXPqjybPCaxed-WYs1-KRQ-j9POps",
    authDomain: "otpauth-d22d0.firebaseapp.com",
    projectId: "otpauth-d22d0",
    storageBucket: "otpauth-d22d0.appspot.com",
    messagingSenderId: "636294014083",
    appId: "1:636294014083:web:b9b53c61a33f81a3a8a7b6",
    measurementId: "G-HJX1TXM64Y"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig); 
   const[isValide, setIsValide]= useState('true');
   const actionCodeSettings = {
  
};
  const auth = getAuth(app);
 const handleReset =()=>{
sendPasswordResetEmail(auth, email)
  .then(() => { 
     console.log("Email was sent to"+" "+email);
     handleNext();
  })
  .catch((error) => {
    setIsValide(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error sending password reset email: ${errorCode} - ${errorMessage}`);
  }); }
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
        <SubHeader>Forgot your password?</SubHeader>
       <TextSub> We'll send a password reset link to your email. </TextSub>
      <Box sx={{ display: 'flex', flexDirection: 'column' , padding: '40px 140px' }}>
           
           <TextField required id="outlined-adornment-email "  value={email}
            onChange={(e) => setEmail(e.target.value)} type ="email" autoComplete='true' label="Email" multiline
         maxRows={4} sx={{m: 1, width: '45ch'}} variant="outlined" /> 
         <BlackBtn onClick={handleReset}>Reset</BlackBtn>
         {!isValide && 
         <h3 className='errmsg'>Enter a valid email please.</h3>}
      </Box></React.Fragment>}  
       {activeStep === 1 && <>
 <div style={{margin:"30px 0", display:"flex", flexDirection:"column",alignItems:"center"}}>
       <div style={{display:'flex', flexDirection:"column"}}><SubHeader>Check your email </SubHeader>
        <TextSub style={{textAlign:"center"}} > 
         Email was sent to {email}.</TextSub>
         <CheckBox/> </div> 
        
         </div>
</> }
       {activeStep === 2 &&<> 
       <SubHeader>Enter your new password:</SubHeader>
        
       <div style={{margin:"20px 220px"}}>
       <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
         <OutlinedInput 
           id="outlined-adornment-password"
           type={showPassword ? 'text' : 'password'}
           endAdornment={
             <InputAdornment position="end">
               <IconButton
                 aria-label="toggle password visibility"
                 onClick={handleClickShowPassword}
                 onMouseDown={handleMouseDownPassword}
                 edge="end"
               >
                 {showPassword ? <VisibilityOff /> : <Visibility />}
               </IconButton>
             </InputAdornment>
           }
           label="New Password"
         /><InputLabel htmlFor="outlined-adornment-password2">Repeat new Password</InputLabel>
         <OutlinedInput 
           id="outlined-adornment-password2"
           type={showPassword ? 'text' : 'password'}
           endAdornment={
             <InputAdornment position="end">
               <IconButton
                 aria-label="toggle password visibility"
                 onClick={handleClickShowPassword}
                 onMouseDown={handleMouseDownPassword}
                 edge="end"
               >
                 {showPassword ? <VisibilityOff /> : <Visibility />}
               </IconButton>
             </InputAdornment>
           }
           label="Repeat new Password"
         /> </div></>}
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
        <React.Fragment>
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
           
            { activeStep === steps.length - 1 ? 
            <BlackBtn  > Login<Link to="/dashboard"></Link></BlackBtn> 
            : <Button onClick={handleNext} disabled={ activeStep==1} > Next </Button>}
         
          </Box>
        </React.Fragment>
      )}
    </ >
  );
}

 

export const MultilineTextFields=()=> {
  return (

    <Box className='Login-input'
      component="form"
      sx={{
  '& .MuiTextField-root': { m: 1, width: '25ch' } 
      }}
      noValidate
      autoComplete="off"
    >
      <div >
<TextField id="outlined-basic" label="Outlined" multiline
          maxRows={1} variant="outlined" />
</div> </Box> 
)}


 

