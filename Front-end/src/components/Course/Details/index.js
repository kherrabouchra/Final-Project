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
  const [details, setDetails] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState('');

  const [lessons, setLessons] = useState([]);
  const { type, id } = useParams();

  const location=useLocation();
  const user= location.state;
console.log(location.state);
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
      const response = await api.get(`${type}/${id}`);
      console.log(response.data);
     
      if (response.data.status === 'success') {
        setDetails(response.data.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const fetchLessons = async () => {
    try {
      const response = await api.get(`/courses/lessons/getByCourse/${id}`);
      if (response.status === 200) {
        setLessons(response.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const fetchPathCourses = async () => {
    try {
      const response = await api.get(`/paths/courses/${id}`);
      console.log(response.data);
      
      if (response.data.status === 'success') {
        setCourses(response.data.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await api.get(`/courses/chapters/getAll/${id}`);
      if (response.status === 200) {
        setChapters(response.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };


  const handleEnroll = () => {
    
  };

  useEffect(() => {
console.log(id);
    if(type==="courses" ){
 fetchDetails();
fetchLessons();
    fetchChapters(); 

    }else{
      fetchDetails();
fetchLessons();
    fetchPathCourses();
    }



    api.get(`/courses/enrolled/${user.userID}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        setEnrolled(res.data.data);

     console.log(enrolled);
      }
    })
    .catch((err) => console.log(err));

   
  }, [user]);

  console.log( lessons);
  const colors = ["#4435EE ", "#6249f1", "#8D64F5", "#C78AFB", "#F198FF"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return (
    <>
        <Banner color={"#C78AFB"}>
       <Link to="/Learn"><GoBack  color={"black"}/></Link>
          <TextWrapper>
       
          {type === "courses" ? <h3>Course</h3> : <h3>Learning path</h3>}

          <CourseTitle style={{width:'700px'}} color={"#eee"} title={details.name} />
        </TextWrapper>

      </Banner>
      <Container>
        <InfoContainer />
        <Header>Description</Header>
        <InfoContainer>
          <ContentWrapper>
            <P>{details.description}</P>
          </ContentWrapper>
          <VerticalSeparator separator=" true" />
          <CourseCard details={details} courses={courses} type={type} to={`/Dashboard/courses/lesson/1`} state={user} />
        </InfoContainer>
        <Header>Syllabus</Header>
        <Rectangle>
          <SyllabusWrapper>
            {type === "paths"
              ? courses.map((course) => (
                  <Lesson key={course.id}>
                    <LessonIcon lesson={course.id} />
                    <LessonLink to={`/Learn/courses/${course.id}`}>
                      {course.name}
                    </LessonLink>
                  </Lesson>
                ))
              : chapters.map((chapter) => {
                const isChapterUnlocked = enrolled && enrolled.some((enrollment) => enrollment.currentMaterial === lessons.id);
                return (
                  <Lesson key={chapter.id}>
                    {isChapterUnlocked ? <LessonIcon lesson={chapter.id} /> : <LessonIcon lesson={chapter.id} />}
                    <LessonTitle>{chapter.chapterName}</LessonTitle>
                  </Lesson>
                );
              })}

            {/* {enrolled && (
              <WhiteBtn style={{ margin: 0 }} id="enroll">
                Continue course!
              </WhiteBtn>
            )} */}
            {enrolled && (
              <Link to={`/Dashboard/courses/lesson/${lessons.id}`} state={{user:user, course:details}}>
                <WhiteBtn
                  style={{ margin: 0 }}
                  onClick={handleEnroll}
                  id="enroll"
                >
                  Enroll course
                </WhiteBtn>
              </Link>
            )}
          </SyllabusWrapper>
        </Rectangle>
      </Container>
    </>
  );
};
