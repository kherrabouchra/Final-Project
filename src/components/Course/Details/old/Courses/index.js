import React, { useState, useEffect } from "react";
import { TextWrapper, CourseTitle } from "../Details/CourseElements";
import {
  WhiteBtn,
  SubHeader,
  TextSub,P,
  Banner,
} from "../../Global/GlobalComponents";
import { Course, FilterBtnWrapper } from "./LearnElements";
import {
  HorizontalSeparator,
  Page,
  Container,
} from "../../Global/GlobalComponents";
import api from "../../../api/api";

export const Learn = () => {
  const [currentButton, setCurrentButton] = useState('All');
  const [loading, setLoading] = useState('All');
  const [showing, setShowing] = useState(0);
  const [selected, setSelected] = useState(0);

  const [courses, setCourses] = useState('');
  const [paths, setPaths] = useState('');
  const [all, setAll] = useState('');

  const fetchAllPaths = async () => {
    try {
      setLoading(true);
      const response = await api.get("/paths");

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses");
       
      if (response.status === 200) {
      
        return response.data;
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addType();
  }, []);

  function handleButton (index, label) {
    setShowing(index);
    setCurrentButton(label);
    setSelected(index);
  }

  async function addType () {
    const paths = await fetchAllPaths();
    const courses = await fetchAllCourses();

    courses.forEach(function(course) {
      course.type = "courses";
    });

    paths.forEach(function(path) {
      path.type = "paths";
    });

    setCourses(courses);
    console.log(courses[0].courseID);
    setPaths(paths);
    setAll([...courses, ...paths]);
  }

  let bannercolor =
    "linear-gradient(299.49deg, #000000 12.93%, #4335EE 27.28%, #C78AFB 69.39%)";
  return (
    <div>
      <Banner color={bannercolor}>
        <TextWrapper>
          <CourseTitle color={"white"} title={"LEARN"} />
          <TextSub style={{ color: "white", margin: 0 }}>
            Find the right courses that match your interests, skill level and
            learning goals.
          </TextSub>
        </TextWrapper>
      </Banner>
      <Container>
       

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flex: "1",
            justifyContent: "center",
          }}
        >
          <SubHeader>{currentButton}</SubHeader>
          <HorizontalSeparator width={"80%"} />
        </div>
       <div style={{display:'flex', justifyContent:'space-between', width:'80%', margin:'auto',padding: "15px"}}>
          <P>We have found : {selected===1 && courses.length}
          {selected===0 && all.length}{selected===2 && paths.length}  </P>
         <div style={{display:'flex', alignItems:'center'}}>
          <P>Sort by: </P>  <FilterBtnWrapper>
            <WhiteBtn isSelected={selected === 0} onClick={() => handleButton(0, 'All')}>All</WhiteBtn>
            <WhiteBtn isSelected={selected === 1} onClick={() => handleButton(1, 'Courses')}>Courses</WhiteBtn>
            <WhiteBtn isSelected={selected === 2} onClick={() => handleButton(2, 'Learning paths')}>Learning paths</WhiteBtn>
        </FilterBtnWrapper></div>
        </div> 
        
        <ul style={{ listStyle: "none" }}>
          {showing === 0 && !loading ? 
            all.map((el, index) => (
              <li key={index}>
                <Course
                id={el.courseID}
                  colorid={index}
                  name={el.name}
                  description={el.description}
                  type={el.type}
                  points={el.points}

                />
              </li>
            ))
            : showing === 1 && !loading ? 
            courses.map((el,index ) => (
              <li key={index}>
                <Course
                id={el.courseID}
                  colorid={index}
                  name={el.name}
                  description={el.description}
                  type={el.type}
                  inst={el.instructorID}
                  points={el.points}

                />
              </li>
            )) 
            : !loading && paths.map((el,index) => (
              <li key={el.courseID}>
                <Course
                id={el.courseID}
                  colorid={index}
                  name={el.name}
                  description={el.description}
                  type={el.type}
                  points={el.points}
                />
              </li>
            ))
          }
        </ul>
        <Page />
      </Container>
    </div>
  );
};

export default Learn;
// import React from 'react'
// import {   TextWrapper, CourseTitle, Rectangle } from "../Details/CourseElements";
// import { NavBarDev2 } from '../../NavBar/index-3';
// import { WhiteBtn, SubHeader, TextSub, Banner } from '../../Global/GlobalComponents';
// import { Course, FilterBtnWrapper, Book } from './LearnElements';
// import { VerticalSeparator, HorizontalSeparator,TimelineBar ,Page, Container} from "../../Global/GlobalComponents";
// import OppositeContentTimeline from '../../Global/Timeline';

// import  { useState, useEffect } from "react";
// import { buttons, coursedata } from "./data"; 



// export function getCourses() {
//   const courses=coursedata ;
//   return courses;
// }

// export function filter(ctype) {
//   let filtred = getCourses().filter(type => type.type === ctype);
//   return filtred;}

// export const Learn = (props) => {
//   const [filtred , setFiltred ] = useState(null);
//   const [currentButton, setCurrentButton] = useState("All");
//   useEffect(() => {
//     setFiltred(getCourses());
//   }, []); 

//   function handleCourse(e) {
//     let typeCourse = e.target.value;
//     console.log(typeCourse);
//     let nameCourse = e.target.name;
//     setCurrentButton(nameCourse);
//     typeCourse !== "all" ? setFiltred  (filter (typeCourse))
//     : setFiltred (getCourses());
 
//   } 
//    let bannercolor =  "linear-gradient(299.49deg, #000000 12.93%, #4335EE 27.28%, #C78AFB 69.39%)";
//   return (
//     <div>
   
//             <Banner color={bannercolor}>
//       <TextWrapper>
//         <CourseTitle color={"white"} title={"LEARN"}/> 
//         <TextSub style={{color:"white", margin: 0}}>Find the right courses that match your interests, skill level
// and learning goals.</TextSub>
//         </TextWrapper>
//       </Banner>
//       <Container>
//          <FilterBtnWrapper>
//        {buttons &&

//         buttons.map((type, index) => (
//             <WhiteBtn style={{padding:"10px 20px"}} key={index} name={type.name} 
           
//              value={type.value} onClick={handleCourse}>
//               {type.name}
//             </WhiteBtn>
             
//       ))  }</FilterBtnWrapper>
      
//     <div style={{display:"flex", flexWrap: 'wrap', flex:"1", justifyContent:'center'}}> 
//      <SubHeader  >{currentButton}</SubHeader>
//         <HorizontalSeparator width={"80%"}/></div>
//         {filtred  &&
//         filtred.map(type => (
//           <ul key={type.id}>
//                <Course id={type.id} name={type.name} description={type.description} type={type.type}/>   
//           </ul>
//         ))}
//    <Page  />
// </Container>
//     </div>

//   )
// }
  
