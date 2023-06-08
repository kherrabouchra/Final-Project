import styled from "styled-components";
import { Checkbox } from "@nextui-org/react";

export const CheckboxNextui=()=> {
  return (
    <>
      <Checkbox isRounded size="xl" color="success"  >
      
      </Checkbox> 
    </>
  );
}

export const TypeWrapper=styled.div`
display:flex;
justify-content: space-evenly;
padding:40px;
`
export const TypeContainer = styled.div` 
width: 240px;
height: 270px;
border: 3px solid #FA6EE1;
border-radius: 35px;
display:flex;
align-items: flex-end;
justify-content: space-between;
padding: 30px;
flex-direction: column;
input[type="radio"] {
  margin-right: 8px;
   width: 30px;
    accent-color:black; 
 
   height: 25px;
   padding:20px;
 
}
&:hover{
    cursor:pointer;
    background: rgba(255, 198, 245, 0.38);
    box-shadow: 0px 0px 27px rgba(250, 110, 225, 0.25);
}`


export const TypeCheckBox = ()=>{
  return(
    
    <svg width="40" height="40" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.0228 44.9761C34.2202 44.9761 43.3816 35.5261 43.3816 23.9761C43.3816 12.4261 34.2202 2.97607 23.0228 2.97607C11.8255 2.97607 2.66406 12.4261 2.66406 23.9761C2.66406 35.5261 11.8255 44.9761 23.0228 44.9761Z" stroke="#F989E6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.3705 23.9761L20.1321 29.9191L31.6755 18.0332" stroke="#F989E6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  ) }

  export const TypeChecked = ()=>{
    return(<svg width="40" height="40" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.37052 7.97609L8.13205 13.9191L19.6755 2.03317" fill="#F989E6"/>
    <path d="M2.37052 7.97609L8.13205 13.9191L19.6755 2.03317" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    )
  }