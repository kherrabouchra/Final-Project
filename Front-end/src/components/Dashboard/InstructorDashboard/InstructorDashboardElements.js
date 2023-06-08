import { Table } from '@mantine/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function Quiz() {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === 'best') {
      setHelperText('You got it!');
      setError(false);
    } else if (value === 'worst') {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="best" control={<Radio />} label="The best!" />
          <FormControlLabel value="worst" control={<Radio />} label="The worst." />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

export const HackContainer = styled.div`
display: flex;
padding: 60px 80px;
justify-content:space-evenly;
background: #F8F8F8;

`
export const HackWrap = styled.div`
display: flex;
flex-direction: column;
`
export const CreateHackRec = styled.div`
 
width: 400px;
height: 400px; 
 
background: #BCBAFF;
border-radius: 35px;
&:hover{
  box-shadow: 0px 3px 29px rgba(0, 0, 0, 0.1);
  cursor:pointer;
  
}
`
export const InstDashContainer = styled.div`
 
width: 700px;
height: 100%; 
 padding:40px;
background: white;
border-radius: 35px;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);

`
export const InstRec =styled.div` 
width: 280px;
height:150px;
border: solid black 1px;
border-radius: 25px;
margin: 20px;
&:hover{
  background: #F1F1F1;
  cursor:pointer;
}
`
export const PlusIcon = ()=>{
  return( <svg  style={{margin:'50px'}} width="68" height="87" viewBox="0 0 98 117" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="49" cy="67.5" r="49" fill="black" fill-opacity="0.24"/>
  <path d="M44.8182 88.7273V43.7273H52.4545V88.7273H44.8182ZM26.1364 70.0455V62.4091H71.1364V70.0455H26.1364Z" fill="white"/>
  </svg>)
} 