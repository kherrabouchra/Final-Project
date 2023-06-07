import React, { useEffect, useState } from "react";
import {
  CourseCard,
  CourseIcon,
  P,
  Rectangle,
  Lesson,
  CourseTitle,
  SyllabusWrapper,
  TextWrapper,
  InfoContainer,
  Header,
  ContentWrapper,
  LessonIcon,
  LessonTitle,
  LessonLink,
} from "./CourseElements";
import {
  GoBack,
  VerticalSeparator,
  Container,
  Banner,
  WhiteBtn,
} from "../../Global/GlobalComponents";
import api from "../../../api/api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { color } from "framer-motion";

export const CourseDetails = () => {
  const [details, setDetails] = useState({});
  const [syllabus, setSyllabus] = useState({});
  const [enrolled, setEnrolled] = useState(false);
  const { type, id } = useParams();
  /* const { type, name } = useParams();
  const location = useLocation();
  const id = location.state.id;
  
  const navigate = useNavigate();
  
  const handleLink = () => {
    navigate(`/Learn/courses/${encodeURIComponent(syllabus[id])}`, { state: { id } });
  }

  const detailsName = decodeURIComponent(name);
  const syllabusName = decodeURIComponent(syllabus[id]) */

  const fetchDetails = async () => {
    try {
      const response = await api.get(`/${type}/${id}`);
      
      if (response.data.status === "success") {
        console.log(response.data);
        setDetails(response.data.data);  
        // setSyllabus(response.data.data.courseSyllabus)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEnroll = () => {
    const enrollData = {
      developer: 1,
      course: 1,
      state: "in progress",
    };
    api
      .post("/dashboard/courses/", enrollData)
      .then((response) => {
        console.log(response);
        setEnrolled(true);
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const colors=[ "#4435EE ", "#6249f1", "#8D64F5", "#C78AFB","#F198FF" ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <>
      <Banner color={"#C78AFB"}>
       <Link to="/Learn"><GoBack  color={"black"}/></Link>
          <TextWrapper>
       
          {type === "courses" ? <h3>Course</h3> : <h3>Learning path</h3>}

          <CourseTitle style={{width:'700px'}} color={"#eee"} title={details.name} />
        </TextWrapper>

        <CourseIcon img="../images/python.png" />
      </Banner>
      <Container>
        <InfoContainer />
        <Header>Description</Header>
        <InfoContainer>
          <ContentWrapper>
            <P>{details.description}</P>
          </ContentWrapper>
          <VerticalSeparator separator=" true" />
          <CourseCard details={details} syllabus={syllabus} type={type} />
        </InfoContainer>
        <Header>Syllabus</Header>
        <Rectangle>
          <SyllabusWrapper>
          {type === 'paths' ? 
            Object.keys(syllabus).map((  key) => (
              <Lesson key={key}>
                <LessonIcon lesson={key} />
                <LessonLink to={`/Learn/courses/${syllabus[key].id}`}>
                {syllabus[key].lesson}

                </LessonLink>
              </Lesson>
            ))
           : 
           Object.keys(syllabus).map((  key) => (
              <Lesson key={key}>
                <LessonIcon lesson={key} />
                <LessonTitle>
                  {syllabus[key].lesson}
                </LessonTitle>
              </Lesson>
            ))
          }
              <WhiteBtn
                style={{ margin: 0 }}
                onClick={handleEnroll}
                id="enroll"
              >
                Enroll course
              </WhiteBtn>
          </SyllabusWrapper>
        </Rectangle>
      </Container>
    </>
  );
};
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   CourseCard,
//   CourseIcon,
//   P, 
//   Rectangle,
//   Lesson,
//   CourseTitle,
//   SyllabusWrapper,
//   TextWrapper,
//   InfoContainer,
//   Header,
//   ContentWrapper,
//   LessonIcon,
//   LessonTitle,
// } from "./CourseElements";
// import {
//   GoBack,
//   VerticalSeparator,
//   Container,
//   Banner,
//   WhiteBtn,TextSub,
// } from "../../Global/GlobalComponents";

// export const CourseDetails = ({ details }) => {
//   const lessons = [
//     { id: 1, name: "intro" },
//     { id: 2, name: "nflenfrnr" },
//     { id: 3, name: "kjnkerjbfdkn" },
//     { id: 4, name: "kbksenfen" },
//     { id: 6, name: "kbksenfen" },
//     { id: 9, name: "kbksenfen" },
//     { id: 5, name: "grekldg," },
//   ];

//     //const syllabus = JSON.parse(details.syllabus);
//     console.log(details)

//     return (
//       <>
//         <Banner color="blue">
//         <Link to="/Learn"><GoBack  color={"black"}/></Link>
//           <TextWrapper>
//             <h3>Course</h3>
//               <CourseTitle color={'white'} title={details.name}/>
//               <TextSub style={{ color: "white", margin: 0 }}>
//                 instructor:
//               </TextSub>
//           </TextWrapper>

//           <CourseIcon img="../images/python.png" />
//         </Banner>
//         <Container>
//           <InfoContainer />
//           <Header>Description</Header>
//           <InfoContainer>
//             <ContentWrapper>
//               <P>{details.description}</P>
//             </ContentWrapper>
//             <VerticalSeparator separator=" true" />
//             <CourseCard details={details} lessons={lessons} />
//           </InfoContainer>
//           <Header>Syllabus</Header>
//           <Rectangle>
//             <SyllabusWrapper>
//               {lessons.map(lesson => (
//                 <Lesson key={lesson.id}>
//                   <LessonIcon lesson={lesson.id} />
//                   <LessonTitle>{lesson.name}</LessonTitle>
//                 </Lesson>
//               ))}
//               {/* {Object.keys(syllabus).map(key => (
//                 <Lesson key={key}>
//                   <LessonIcon lesson={key} />
//                   <LessonTitle>{syllabus[key]}</LessonTitle>
//                 </Lesson>
//               ))} 
//               <WhiteBtn style={{ margin: 0 }}>Enroll course</WhiteBtn> */}
//             </SyllabusWrapper>
//           </Rectangle>
//         </Container>
//       </>
//     );
// };

// // import React from 'react'
// // import { CourseCard, CourseIcon,P,Rectangle, Lesson,CourseTitle,SyllabusWrapper, 
// //   TextWrapper, InfoContainer,Header,LessonIconOpen, ContentWrapper, LessonIcon, LessonTitle} from './CourseElements'
// // import { GoBack , VerticalSeparator, Container, Page,Banner, WhiteBtn} from '../../Global/GlobalComponents'
// // import { coursedata } from '../Courses/data'
// // export const CourseDetails = (props) => {
// //   const id =props.id;
// // console.log(props);

// //   const lessons =[
// // {

// //   id: 1, name: "intro"
// // },
// // {
// //   id:2, 
// //   name:"nflenfrnr"

// // },
// //     {
// //       id:3,

// //       name: "kjnkerjbfdkn"
// //     } ,{id: 4,
// //       name:"kbksenfen"},{id: 6,
// //         name:"kbksenfen"},{id: 9,
// //           name:"kbksenfen"}
// //           ,{id: 5,
// //             name:"grekldg,"}
// //   ]
// //   const lessonlist = lessons.map((lesson ) => {
// //     return (
// //      <Lesson key={lesson.id}> 
// //    <LessonIcon lesson={lesson.id}/> 
// //     <LessonTitle>{lesson.name}</LessonTitle></Lesson>
    
// //     ) })
// //   return (
// //     <>
// //   <Banner color={props.color}>
// //         <GoBack/>  
// //         <TextWrapper>
// //         <h3>{coursedata[id].type}</h3>
// //         <CourseTitle  color={"white"} title={coursedata[id].title}/> 
// //         </TextWrapper>
     
// //      <CourseIcon img="../images/python.png"/>
  
// //   </Banner>  
// //   <Container>
// //   <InfoContainer/>
// //   <Header>Description:</Header> 
// //   <InfoContainer>
// //   <ContentWrapper>
  
// //    <P>{coursedata[id].descriptiondesc} </P>
// //   </ContentWrapper>
// //   <VerticalSeparator separator=" true"  />
// //       <CourseCard/>  
// //     </InfoContainer>
// //     <Header>Syllabus:</Header>
// //     <Rectangle>
// //       <SyllabusWrapper>  
// //         {/* <Lesson> <LessonIcon/> <LessonTitle>dsbhbrk</LessonTitle></Lesson>     
// //         <Lesson> <LessonIcon/> <LessonTitle>dsbhbrk</LessonTitle></Lesson>     */}

// //  {lessonlist} <WhiteBtn style={{margin:0}}>Enroll course</WhiteBtn>
// //       </SyllabusWrapper></Rectangle>
// //        </Container></>
// //   )
// // }
