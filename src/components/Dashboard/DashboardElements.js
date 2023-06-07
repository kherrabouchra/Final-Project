
import { Link } from "react-router-dom";
import styled from "styled-components";
 export const DashboardContainerDisplay = styled.div` 
  display: flex;
  justify-content: center;
  width:90%; 
  align-items: center;
  margin :auto;
 `

export const DashboardContainer = styled.div`
width: 90%;
height: 1557px;
margin:auto;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
border-radius: 50px;

`

export const DashboardTextWrapper= styled.div`
padding:30px;


`

export const Section1 =styled.div`
display : flex;
flex-direction: column;
flex:1;
`
export const Section2= styled.div`
display: flex;
flex-direction: column;
`


export const SectionWrap= styled.div` 
display : flex;
margin: 40px;

`
export const SectionTextWrap= styled.div`
align-items:center;
justify-content: space-evenly;
display : flex;
width:100%;
`

export const Xppoint =styled.div`
background-image: url('../images/xppoint.png' );
z-index: 100;
`
export const JobsLinkContainer = styled(Link)`
box-sizing: border-box;
 margin-top: 130px;
width: 510px;
padding: 10px;
height: 184px; 
position: relative ;
background: #202020;
mix-blend-mode: normal;
border: 0.4px solid #FFFFFF;
border-radius: 22px;
display:flex;
justify-content: flex-end;
transition: all 0.4s ease-in-out;

&:hover {
    transition: all 0.4s ease-in-out;
    padding:15px;
     
    cursor: pointer;
}`

export const StreakContainer = styled.div`
 
width: 510px;
height: 305.4px;
 

background: #F1F1F1;
mix-blend-mode: normal;
border: 0.4px solid #FFFFFF;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
border-radius: 22px;

`


export const Streak = styled.div`


box-sizing: border-box;
 
width: 481px;
height: 137px; 
margin: auto;
background: #FFFFFF;
mix-blend-mode: normal;
border: 0.4px solid #000000;
border-radius: 19px;
display: flex;
`

export const StreakDayWrap= styled.div`
margin: auto;
display: flex;
flex-direction: column;`
export const StreakDay = styled.div`
padding:20px 5px;
 
`
export const StreakIcon= styled.div`
 
margin: 30px auto;
`



export const LevelContainer = styled.div`


 margin-bottom:30Px;
width: 510px;
height: 120px; 
background: #FFFFFF;
mix-blend-mode: normal;
border: 0.4px solid #000000;
border-radius: 19px;
display: flex;
`
export const Points=styled.div`
display : flex;
flex-direction: column;
padding:30px;
justify-content: center;
align-items:center;
`

export const LevelWrap=styled.div`
display : flex;
flex-direction: column;
padding:25px;
justify-content: space-between;
flex:1;
`

export const BlackRectangle = styled.div`

 
width: 242px;
height: 282px;
margin:30px 0;
padding:30px;
background: #202020;
mix-blend-mode: normal;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
border-radius: 22px;`


export const PurpleRectangle = styled.div`

 
width: 242px;
height: 282px;
padding:30px;
margin:30px 0;
background: #C78AFB;
mix-blend-mode: normal;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
border-radius: 22px;`

export const trophyicon = ()=>{
    return(
<img alt='rank' ref="../images/trophyicon.png"/>
   )
}