import React, { useEffect, useState } from "react";
import {
  AddIcon,
  Button,
  Container,
  CourseContainer,
  CourseTitle,
  EditIcon,
  Header,
  IconContainer,
  Span,
  TitleContainer,
} from "./styles";
import { Tooltip } from "@nextui-org/react";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CourseTable = () => {
  const [courses, setCourses] = useState([]);
const location=useLocation();
const user= location.state;
  const fetchCourses = async () => {
    try {   
      const response = await api.get(`courses/getAll/${user.userID}`); //courses/getAll/InstrcutorID
      if (response.data.status==="success") {
        console.log(response.data);
        setCourses(response.data.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container>
      <CourseContainer>
        <Header>
          GAMIFIED COURSES
          <Span>
            The courses you have been assigned to create are down below.
          </Span>
        </Header>
        {courses.length!==0 ? (courses.map((course) => (
          <TitleContainer key={course.courseID}>
            <CourseTitle>{course.name}</CourseTitle>

            <IconContainer>
              

              <Tooltip content={"Edit"}>
                <Link to={`/instdash/courses/update/${course.courseID}`} state={user}>
                  <Button>
                    <EditIcon />
                  </Button>
                </Link>
              </Tooltip>
            </IconContainer>
          </TitleContainer>
        ))):(
          <div style={{padding:"200px 400px"}}>
          <p>You have created no courses.</p></div>
        )}
      </CourseContainer>
    </Container>
  );
};

export default CourseTable;
