import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Button from '@mui/base/ButtonUnstyled';
import { useSpring, animated } from '@react-spring/web';
import { CheckBox, CloseBtn, GoBack, SubHeader } from '../Global/GlobalComponents'
import { Header, TextSub } from '../Global/GlobalComponents';
import { Link, NavLink } from 'react-router-dom';
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
import {useOpen} from './useOpen.js'
import { useLocation } from 'react-router-dom';
import { Blur } from '../Global/GlobalComponents';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  axios from 'axios';
import { TypeCheckBox, TypeContainer,TypeWrapper , CheckboxNextui} from './SignupElements';
import { Radio } from '@nextui-org/react';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay  , Group } from '@mantine/core';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

 


  

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, ...other } = props;


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return <Fade ref={ref} in={open} {...other} />;
});

BackdropUnstyled.propTypes = {
  open: PropTypes.bool.isRequired,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
  border: '2px solid currentColor',
  boxShadow: 24,
  padding: '16px 32px 24px 32px',
});

export default function Createaccount( ) {
  
const {open, handleClose, handleOpen}= useOpen();
const location = useLocation();
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
 const [accountType, setAccountType]= React.useState('');
 const [isCreated, setIsCreated]= React.useState(false);
//  const [visible, { toggle }] = useDisclosure(false);
 const [selected, setSelected] = React.useState('');
 const [data, setData] = useState({
  username: '',
  email: '',
  password: '',
  repeatPassword:'',
  type:'', company:''
  
})
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
 const[showComp, setShowComp]=useState('');
 const  handleAccountType = ()=>{
  if (!selected) {
    setError("Please select a user type to continue.");
    return;
  } setError('');
   setAccountType(true)};
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  const validatePassword = () => {
    if (data.password !== data.repeatPassword) {
      return 'Password and repeated password do not match.';
    }
    return '';
  };
  
const checkFields =()=>{
    if (!data.username) {
      setError("Userame is required");
      return false;
    }
    if (!data.email) {
      setError("Email is required");
      return false;
    }
    if (!data.password) {
      setError("Password is required");
      return false;
    }
    if (!data.repeatPassword) {
      setError("Please repeat your password");
      return false;
    }
    if (!data.type) {
        setError("Please select account type");
        return false;
      }
    
    setError("");
    return true;
  }

const handleSubmit = (event) => {
  
		event.preventDefault();
    console.log(data);
     if(!checkFields()){return;};
    const validationError = validatePassword();
  if (validationError) {
    setError(validationError);
    return;}
  
		axios.post('http://localhost:3000/signup', data)
		.then(res => {
      if (res.data.Status === 'Success') { 

      setIsCreated(true);
      setSuccess(res.data.message);
      console.log(data);
      setData('');

     console.log(res.data.Status);
 }else{
  setError(res.data.Error);

 } })
		.catch(err => console.log(err));
 
}


  const handleTypeClick = (e) => {
     if(e.target.value==="recruiter"){
      setShowComp(true);
     }else{
      setShowComp(false)
     }

    setData({...data, type: e.target.value});

  };




const handleKeyDown = (event) => {
  
  if (event.key === 'Enter') {
    handleSubmit(event);
  }}


  console.log(data);
  return ( 
    <div>  
    
          <Box sx={{width:700, marginLeft:'30%'}} >
           
 

       
           
          
          
          {/* {!accountType  &&
           <div  >
      <SubHeader>Choose account type:</SubHeader>
        {error && <div style={{ padding:'6px' }} className="errmsg">{error}</div>}
      <TypeWrapper>
        <TypeContainer onClick={() => handleTypeClick("recruiter")}>
          <input className='radio'
            type="radio"
            id="recruiter"
            name="type"
            value="recruiter"
            checked={selected === "recruiter"}
            onChange={() => {}}
          />
          <label htmlFor="recruiter">
          <svg style={{  margin:'20px 60px'}}  width="54" height="49" viewBox="0 0 64 59" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M49.7499 16.9061C49.5729 16.8791 49.3663 16.8791 49.1893 16.9061C45.1174 16.7712 41.8718 13.7206 41.8718 9.94111C41.8718 6.08064 45.265 2.97607 49.4844 2.97607C53.7037 2.97607 57.0969 6.10764 57.0969 9.94111C57.0674 13.7206 53.8218 16.7712 49.7499 16.9061Z" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.4" d="M46.7089 36.5599C50.7513 37.1808 55.2067 36.5329 58.3343 34.6162C62.4947 32.0785 62.4947 27.9211 58.3343 25.3834C55.1772 23.4666 50.6627 22.8187 46.6204 23.4666" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.4" d="M14.2492 16.9061C14.4262 16.8791 14.6328 16.8791 14.8098 16.9061C18.8817 16.7712 22.1274 13.7206 22.1274 9.94111C22.1274 6.08064 18.7341 2.97607 14.5148 2.97607C10.2954 2.97607 6.90218 6.10764 6.90218 9.94111C6.93168 13.7206 10.1774 16.7712 14.2492 16.9061Z" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path opacity="0.4" d="M17.2912 36.5599C13.2488 37.1808 8.7934 36.5329 5.66575 34.6162C1.50538 32.0785 1.50538 27.9211 5.66575 25.3834C8.82291 23.4666 13.3374 22.8187 17.3797 23.4666" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.052 37.0731C31.8749 37.0461 31.6684 37.0461 31.4913 37.0731C27.4195 36.9381 24.1738 33.8875 24.1738 30.1081C24.1738 26.2476 27.567 23.1431 31.7864 23.1431C36.0058 23.1431 39.399 26.2746 39.399 30.1081C39.3695 33.8875 36.1238 36.9651 32.052 37.0731Z" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.4671 45.5772C19.3067 48.1148 19.3067 52.272 23.4671 54.8096C28.1881 57.6982 35.9187 57.6982 40.6397 54.8096C44.8 52.272 44.8 48.1148 40.6397 45.5772C35.9482 42.7156 28.1881 42.7156 23.4671 45.5772Z" stroke="#292D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            <h1>For companies</h1>
          </label>
        </TypeContainer>
        <TypeContainer onClick={() => handleTypeClick("developer")}>
          <input  className='radio'
            type="radio"
            id="developer"
            name="type"
            value="developer"
            checked={selected === "developer"}
            onChange={() => {}}
          />
          <label htmlFor="developer">
          <svg style={{  margin:'20px 70px'}} width="38" height="45" viewBox="0 0 38 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.988 19.9307C18.7464 19.9105 18.4564 19.9105 18.1906 19.9307C12.4391 19.7692 7.8718 15.8318 7.8718 10.9857C7.8718 6.03874 12.6566 2.02057 18.6014 2.02057C24.5219 2.02057 29.3309 6.03874 29.3309 10.9857C29.3067 15.8318 24.7394 19.7692 18.988 19.9307Z" stroke="black" stroke-opacity="0.82" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.90514 27.3815C1.05709 30.6526 1.05709 35.9832 6.90514 39.2341C13.5507 42.9494 24.4494 42.9494 31.0949 39.2341C36.9429 35.963 36.9429 30.6324 31.0949 27.3815C24.4735 23.6864 13.5748 23.6864 6.90514 27.3815Z" stroke="black" stroke-opacity="0.82" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            <h1>For developers</h1>
          </label>
        </TypeContainer></TypeWrapper>

      <BlackBtn style={{width:'140px', margin:"auto "}} onClick={handleAccountType }>Next</BlackBtn>
    
    </div>

          } */}
           <div className=   {  !isCreated ? '': 'hidden'}>
            <Header  >Create a new account</Header> 
            <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'column' , padding: '40px 140px' , margin:"30px auto 0 auto"}}>
                
                <TextField  onKeyDown={handleKeyDown} autoComplete='false' value={data.username} required id="outlined-adornment  " 
                	onChange={e => setData({...data, username: e.target.value})} 
                InputProps={{startAdornment: <InputAdornment
                  position="start">@</InputAdornment>}}
                   type ="text" name="username" label="Username" 
               sx={{m: 1, width: '45ch'}} variant="outlined" />
               <TextField value={data.email} autoComplete='false' required id="outlined-adornment-email1 "
               	onChange={e => setData({...data, email: e.target.value})}
                name="email" type ="email" 
               label="Email"  onKeyDown={handleKeyDown}  
              sx={{m: 1, width: '45ch'}} variant="outlined"  /> 
              <FormControl required sx={{ m: 1, width: '45ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password4">Password</InputLabel>
              <OutlinedInput value={data.password}  onKeyDown={handleKeyDown}  
              	onChange={e => setData({...data, password: e.target.value})}
               id="outlined-adornment-password4" name="password"
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
           label="Password"
         />
       </FormControl>
       <FormControl required sx={{ m: 1, width: '45ch' }} variant="outlined">
         <InputLabel htmlFor="outlined-adornment-password3">Repeat Password</InputLabel>
         <OutlinedInput   onKeyDown={handleKeyDown}  
                	onChange={e => setData({...data, repeatPassword: e.target.value})} 
                  value={data.repeatPassword}
           id="outlined-adornment-password3"
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
           label="Repeat Password"
         />       </FormControl>
           <FormControl  required sx={{ m: 1, width: '45ch' }}  >
        <InputLabel id="demo-simple-select-label">Account type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.type}
          label="Account type"
          onChange={handleTypeClick}
        >   
          <MenuItem value={'instructor'}>Instructor</MenuItem>
          <MenuItem value={'recruiter'}>Recruiter</MenuItem> 
        </Select>
      </FormControl>
      {showComp &&
      <TextField  onKeyDown={handleKeyDown} autoComplete='false' value={data.company} required id="outlined-adornment  " 
                	onChange={e => setData({...data, company: e.target.value})} 
                InputProps={{startAdornment: <InputAdornment
                  position="start"></InputAdornment>}}
                   type ="text" name="company" label="Company" 
               sx={{m: 1, width: '45ch'}} variant="outlined" />
 }
         {error && <div style={{padding:"10px  ", margin:0}} className="errmsg">{error}</div>}
     
  </Box></React.Fragment> 
  
        <BlackBtn onClick={handleSubmit} style={{padding:"10px 170px" , margin:"0 150px" }}>Create account</BlackBtn>
   </div>   
         
     
         
   
     
        {isCreated && 
        <>
          <Link to='/User-management'>
                <GoBack color= {'black'} /></Link>

         <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",height:"100%", textAlign:"center", margin:'50px'}}>

<SubHeader>
          {success}</SubHeader>
          <CheckBox/>
        
         </div> </>}
       
       
         </Box>
      
    </div>
);
}
