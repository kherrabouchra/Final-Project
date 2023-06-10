import styled from "styled-components"; 
 import { P, SubHeader, TextSub } from "../../Global/GlobalComponents";
import {React} from "react-scroll";
import { NavLink , Link} from "react-router-dom";

import colors from './data'
import { Text } from "@nextui-org/react";



export const Course  = ( {id,colorid,name, description, type, inst, points, state}) => {




  const color =(colors[(colorid)%(colors.length)]);
  console.log(color);
    return (
      <CourseContainer >
        <CourseImgContainer  color={color}> 
           <img style={{width:"60px", alignSelf:"center"}} 
           src="../images/python.png" alt="ff"/>
           </CourseImgContainer> 
         <div>
           <SubHeader key={id} style={{margin:"30px "}}>{name}</SubHeader> 
         <Line11 />
        <div style={{ display: "flex",flexDirection:'row' , height:"40%", width:"600px",alignItems: 'center',justifyContent: "space-between"}}>
         <div>
        <TextSub   style={{padding:"20px "}}>
        {description <= 160
                ? description
                : `${description.slice(0, 160)}...`  
              }
      <Link to={`/Learn/${type}/${id}`  }  state={state} >See more</Link>
   </TextSub>
          </div>
        <Line9 /> 
      <div style={{display:'flex', flexDirection:'column-reverse' , height:"100%",padding:"14px 0", }}>
         <NavLink style={{textDecoration:"none", color :"blue"  }}   to="/Learn/courses/lesson/1">Enroll </NavLink >
        
           <div style={{display:'flex', justifyContent:"space-between", width : "100%", flex:1}}>
          <P>Points: </P>          <h3>  {points}</h3></div>
        <Line12/>
      </div>
        </div>
     </div>
     
      </CourseContainer>
    )
  } 
  export const CourseContainer = styled.div`
    border-radius: 35px;
    height: 230px;
    display:flex;
    width: 1000px;
    z-index:100;
    margin: 20px auto ;
    position:relative;
    background-color: #f2f2f2;
    &:hover {
      cursor:pointer;

    }
    
  
  `
  export const CourseImgContainer = styled.div`
    border-radius: 35px 0px 0px 35px;
    height: 230px;
    width: 25%;
    background-color: ${(props)=>(props.color)};
    justify-content:center;
    display:flex;
 ` 
  export const Line11 = styled.div`
    height: 0px;
    width: 750px;
    border: 0.699999988079071px solid rgba(0, 0, 0, 0.30000001192092896);
  ` 
  export const Line12 = styled.div`
  height: 0px;
  width: 250px;
  top: 180px;
  position:absolute;
  left:750px;
  border: 0.699999988079071px solid rgba(0, 0, 0, 0.30000001192092896);
` 
  export const Line9 = styled.div`
    transform: rotate(90deg);
    height: 0px;
     top:180px;
    position: absolute;
    width:100px;
    right:200px;
    border: 0.699999988079071px solid rgba(0, 0, 0, 0.30000001192092896);
  `
  export const FilterBtnWrapper = styled.div`
   
  display:flex;
  `
export const Book =styled.img`
position: absolute;
width: 400px;
height: 421.41px;
left: 932.64px;
top: 81px; 

alt: "book";
background: url(../images/book.png);
transform: rotate(8.68deg);`

  