import React, { useState, useEffect } from "react";
import {
  Banner,
  Container,
  TextSub,
  WhiteBtn,
} from "../../Global/GlobalComponents"; 
import { LessonContainer, LessonElement, LessonParagraph, LessonTitle } from "./styles";
import { useParams } from "react-router-dom";
import api from '../../../api/api';

const ParticipateCourse = () => {
  const [courses, setCourses] = useState({});
  const [syllabus, setSyllabus] = useState({});
  const { id } = useParams();

  const fetchCourses = async () => {
    try {
      const response = await api.get(`courses/${id}`);
      if (response.status === 200) {
        setCourses(response.data);
        setSyllabus(response.data.syllabus);
        console.log(syllabus);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  let bannercolor =
    "linear-gradient(299.49deg, #000000 12.93%, #4335EE 27.28%, #C78AFB 69.39%)";
  return (
    <div>
      <Banner color={bannercolor} style={{ height: "125px" }}/>
      <Container style={{ display: 'flex', justifyContent: 'space-between'}}>
        <LessonContainer>
        <LessonTitle>{syllabus[1].lesson}</LessonTitle>
            {Object.entries(syllabus[1]).map(([title, content]) => (
              <div key={title}>
                <LessonElement>{title}</LessonElement>
                <LessonParagraph>{content}</LessonParagraph>
              </div>
            ))}
        </LessonContainer>
        {/* <iframe
          src="https://www.kaggle.com/embed/mostafahabibi1994/stocks-market-analysis-cleaning-noise-nan-vals?kernelSessionId=128380640"
          height="auto"
          width="900"
          allowFullScreen
          frameBorder="0"
          scrolling="auto"
          title="Stocks Market Analysis(Cleaning Noise&amp;Nan Vals)"
        ></iframe> */}
      </Container>
    </div>
  );
};

export default ParticipateCourse;
