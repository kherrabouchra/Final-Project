import React, { useState, useEffect } from "react";
import {
  Banner,
  Container,
  TextSub,
  WhiteBtn,
} from "../Global/GlobalComponents";
import { CourseTitle, TextWrapper } from "../Course/Details/CourseElements";
import { FilterBtnWrapper } from "../Course/Courses/LearnElements";
import {
  CloudinaryVideoContainer,
  CsvLink,
  LessonTitle,
  NextButton,
  QuizAnswer,
  QuizContainer,
  VideoFrame,
  VideoWndw,
} from "./styles";
import CodeEditor from "./CodeEditor";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Quiz from "./Quiz";

const ParticipateCourse = ({ user, log }) => {
  const [lesson, setLesson] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctOptionLabel, setCorrectOptionLabel] = useState("");

  const handleCorrectAnswer = (selectedOption) => {
    if (lesson.correct_answer === selectedOption) {
      console.log("Correct");
      setCorrect(true);
    } else {
      console.log("False");
      setCorrect(false);
      setShowCorrectAnswer(true);

      const correctOptionLabel = lesson[`option_${lesson.correct_answer}`];
      if (correctOptionLabel) {
        setCorrectOptionLabel(correctOptionLabel);
      }
    }
  };

  const addPoints = async () => {
    try {
      const data = {
        devID: user.userID,
        points: lesson.points,
      };

      const pointsAdded = await api.put(`user/addPoints/${user.userID}`, data);

      console.log(pointsAdded.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmission = () => {
    setSubmitted(true);

    if (correct) {
      addPoints();
    }
  };

  const fetchLesson = async () => {
    try {
      const response = await api.get(`/courses/lessons/get/${id}`);
      if (response.status === 200) {
        setLesson(response.data);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  console.log(lesson);

  const handleClick = () => {
    navigate(`/Dashboard/courses/lesson/${parseInt(id) + 1}`);
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  let bannercolor =
    "linear-gradient(299.49deg, #000000 12.93%, #4335EE 27.28%, #C78AFB 69.39%)";
  return (
    <div>
      <Banner color="black" style={{ height: "270px" }}>
        <TextWrapper>
          <CourseTitle color={"white"} title={lesson.chapterName} />
        </TextWrapper>
      </Banner>

      {/* {!lesson.videoUrl || !lesson.exercise ? (
        <div style={{ height: "40vh" }}>
          <h1 style={{ textAlign: "center", margin: "10% auto" }}>Oops, there is nothing here yet!</h1>
          <Link to={'/Dashboard'}>Click here to go back to your home page!/* </Link> 
        </div>
      ) :  */}
      {lesson.videoUrl && !lesson.quizID && !lesson.notebookURL && (
        <Container>
          <LessonTitle>{lesson.lessonName}</LessonTitle>
          <CloudinaryVideoContainer cloudName="dub9jmuyb">
            <VideoWndw
              publicId={lesson.videoUrl}
              controls
              width="75%"
              height="auto"
              style={{ margin: "15px 23%", width: "60%" }}
            />
          </CloudinaryVideoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to={
                `/Dashboard/courses/lesson/${parseInt(id) + 1}` || "/Dashboard"
              }
            >
              <NextButton onClick={addPoints}>Got it!</NextButton>
            </Link>
          </div>
        </Container>
      )}
      {!lesson.videoUrl && (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <QuizContainer>
              <LessonTitle>{lesson.lessonName}</LessonTitle>
              <Quiz
                lesson={lesson}
                correct={correct}
                submitted={submitted}
                handleCorrectAnswer={handleCorrectAnswer}
                handleSubmission={handleSubmission}
                showCorrectAnswer={showCorrectAnswer}
                correctOptionLabel={correctOptionLabel}
                addPoints={addPoints}
                user={user}
              />
            </QuizContainer>
            <CodeEditor lesson={lesson} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {!submitted && (
              <NextButton onClick={() => handleSubmission()}>
                Submit answer
              </NextButton>
            )}
          </div>
        </Container>
      )}
      {lesson.videoUrl && lesson.quizID && (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <QuizContainer>
              <LessonTitle>{lesson.lessonName}</LessonTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CloudinaryVideoContainer cloudName="dub9jmuyb">
                  <VideoWndw
                    publicId={lesson.videoUrl}
                    controls
                    width="75%"
                    height="auto"
                    style={{ margin: "15px 4%", width: "100%" }}
                  />
                </CloudinaryVideoContainer>
                <div>
                  <Quiz
                    lesson={lesson}
                    correct={correct}
                    submitted={submitted}
                    handleCorrectAnswer={handleCorrectAnswer}
                    handleSubmission={handleSubmission}
                    showCorrectAnswer={showCorrectAnswer}
                    correctOptionLabel={correctOptionLabel}
                    fetchLesson={fetchLesson}
                    handleClick={handleClick}
                  />
                </div>
              </div>
            </QuizContainer>
            <CodeEditor lesson={lesson} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* <Link
              to={`/Dashboard/courses/lesson/${parseInt(id) + 1}`}
              onClick={handleClick}
            > */}
            <NextButton>Submit answer</NextButton>
            {/* </Link> */}
          </div>
        </Container>
      )}
      {lesson.videoUrl && !lesson.quizID && lesson.notebookURL && (
        <Container>
          <LessonTitle>{lesson.lessonName}</LessonTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CloudinaryVideoContainer cloudName="dub9jmuyb">
                <VideoWndw
                  publicId={lesson.videoUrl}
                  controls
                  width="75%"
                  height="auto"
                  style={{ margin: "20px 8%", width: "280%" }}
                />
              </CloudinaryVideoContainer>
              {lesson.csvUrl && (
                <div style={{ margin: "15px 50px" }}>
                  <CsvLink
                    href={lesson.csvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download dataset
                  </CsvLink>
                </div>
              )}
            </div>
            <CodeEditor lesson={lesson} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to={
                `/Dashboard/courses/lesson/${parseInt(id) + 1}` || "/Dashboard"
              }
            >
              <NextButton onClick={addPoints}>Got it!</NextButton>
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default ParticipateCourse;
