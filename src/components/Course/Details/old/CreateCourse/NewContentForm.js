import { Children, React, useEffect, useState } from "react";
import {
  DashboardContainer,
  DashboardContainerDisplay,
} from "../../Dashboard/DashboardElements";

import {
  Arrow,
  BlackBtn,
  GoBack,
  Header,
  HorizontalSeparator,
  P,
  TextSub,
  WhiteBtn,
} from "../../Global/GlobalComponents";
import { DoodleArrow } from "../../LandingSection/LandingContent";
import TextField from "@mui/material/TextField";
import { Switch, Spacer, Input } from "@nextui-org/react";
import { Radio, Grid } from "@nextui-org/react";
import { FilterBtnWrapper } from "../Courses/LearnElements";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { TextWrapper } from "../../HeroSection/HeroElements";
import { ContentWrapper } from "../Details/CourseElements";
import VideoUploader from "./VideoUploader";
import {
  TypeWrapper,
  TypeContainer,
  TypeCheckBox,
} from "../../Signup/SignupElements";
import { Link, useParams } from "react-router-dom";
import { TextEditor } from "../../Global/TextEditor";

import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import api from "../../../api/api";
import {
  CloudinaryVideoContainer,
  Label,
  OptionsContainer,
  RadioInput,
  SyllabusIndex,
  SyllabusList,
  SyllabusTitle,
  TextInput,
  VideoWndw,
} from "./styles";
import { CloudinaryContext, Video } from "cloudinary-react";

const steps = [" ", " ", " "];

const NewContentForm = () => {
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapterName, setChapterName] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [exercise, setExercise] = useState("");
  const [notebookURL, setNotebookURL] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [correct_answer, setCorrect_answer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [options, setOptions] = useState([
    { id: "a", label: "Double click to edit" },
    { id: "b", label: "Double click to edit" },
    { id: "c", label: "Double click to edit" },
    { id: "d", label: "Double click to edit" },
  ]);

  // const { id } = useParams();
const id= 1;
  const fetchCourses = async () => {
    try {
      const course = await api.get(`/courses/${id}`);
      const chapters = await api.get(`/courses/chapters/getAll/${id}`);

      setCourseName(course.data.name);
      setChapters(chapters.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const lessonData = {
        lessons: lessons.map((lesson) => ({
          lessonName: lesson.lessonName,
          points: lesson.points,
          notebookURL: lesson.notebookURL,
          videoUrl: videoUrl,
          chapterID: lesson.chapterID,
        })),
      };

      const lesson = await api.post("courses/lessons/create", lessonData); //Add the chapter id here somehow

      const lessonID = lesson.data.lessonID;

      const quizData = {
        lessonID,
      };

      if (exercise) quizData.exercise = exercise;
      if (options[0].label) quizData.option_a = options[0].label;
      if (options[1].label) quizData.option_b = options[1].label;
      if (options[2].label) quizData.option_c = options[2].label;
      if (options[3].label) quizData.option_d = options[3].label;
      if (correct_answer) quizData.correct_answer = correct_answer;

      const quiz = await api.post("courses/quiz/create", quizData);
      console.log(lesson.data);
      console.log(quiz.data);
    } catch (err) { ;
      console.log(err);
    }
    
  };

  console.log(lessons);

  const handleDoubleClick = (index) => {
    setIsEditing(index);
  };

  const handleBlur = (index) => {
    setIsEditing(false);
  };

  const handleChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].label = event.target.value;
    setOptions(newOptions);
  };

  const handleOptionChange = (event) => {
    setCorrect_answer(event.target.value);
  };

 

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleTypeClick = (index, type) => {
    setLessons((prevLesson) => {
      const updatedLesson = [...prevLesson];
      updatedLesson[index] = { ...updatedLesson[index], type };
      return updatedLesson;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (activeStep === 0) handleSubmit();
    }
  };

  const addLesson = (chapterIndex) => {
    setLessons((prevLessons) => [
      ...prevLessons,
      {
        lessonName: "",
        points: "",
        notebookURL: "",
        videoUrl: "",
        chapterID: chapters[chapterIndex].id,
      },
    ]);
  };

  const handleLessonChange = (lessonIndex, field, value) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      newLessons[lessonIndex][field] = value;
      return newLessons;
    });
  };

  const checkFields = () => {
    const credentials = !description || !duration || !points;
    if ((activeStep === 0) & credentials) {
      setError("Please fill all the required fields");
      return false;
    }

    setError("");
    return true;
  };
  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleVideoUpload = (videoUrl) => {
    setVideoUrl(videoUrl);
  };

  console.log(videoUrl)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* const handleSubmit = () => {
    if (!checkFields()) {
      return;
    }
    handleScrollToTop();
    handleNext();
  }; */

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ height: "100%" }}>
      <Link to="/instdash/courses">
        <GoBack color={"black"} />
      </Link>
     
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Stepper style={{width:"70%"  ,margin: "auto" }} activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"> </Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel className="HackStepper" {...labelProps}>
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep === 0 && (
              <>
                <Header>{courseName}</Header>
                <TextSub style={{ width: "70%", margin: "10px 100px" }}>
                  Here is the gamified course and its syllabus. You're going to
                  create the content of it.
                </TextSub>

                <Box
                  sx={{ padding: "20px 50px", width: "70%", maxWidth: "100%" }}
                >
              
                  <SyllabusTitle>Syllabus</SyllabusTitle>
                  {chapters.map((chapter, index) => {
                    return (
                      <SyllabusList key={chapter.id}>
                        {/* <LessonIcon lesson={chapter.id} /> */}
                        <li>
                          <SyllabusIndex>{index + 1}. </SyllabusIndex>
                          {chapter.chapterName}
                        </li>
                      </SyllabusList>
                    );
                  })}
                  {error && <div className="errmsg">{error}</div>}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: " 20px 150px",
                    alignItems: "flex-end",
                  }}
                >
                  <Box sx={{ flex: "1 1 auto" }} />

                  <BlackBtn
                    style={{ padding: "10px 16px" }}
                    /* onClick={handleFirstPart} */
                    onClick={handleNext}
                  >
                    Next
                  </BlackBtn>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Header>Content</Header>
                <TextSub style={{ width: "70%", margin: "20px 100px" }}>
                  Create the content of the gamified course from the chapters to the sections.
                </TextSub>

                {chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id} style={{margin:"0 60px"}}>
                    <h2 style={{ margin: "30px 30px 0 30px" }}>
                      {chapterIndex + 1}. {chapter.chapterName}
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",margin:"10px"
                      }}
                    >
                      {lessons.some(
                        (lesson) => lesson.chapterID === chapter.id
                      ) && (
                        <BlackBtn
                          onClick={() =>
                            setLessons((prevLessons) =>
                              prevLessons.filter(
                                (lesson) => lesson.chapterID !== chapter.id
                              )
                            )
                          }
                        >
                          Reset
                        </BlackBtn>
                      )}

                      <BlackBtn onClick={() => addLesson(chapterIndex)}>
                        + Section
                      </BlackBtn>
                    </div>

                    <HorizontalSeparator />
                    {lessons.map((lesson, lessonIndex) =>
                      lesson.chapterID === chapter.id ? (
                        <div key={lessonIndex} style={{border:'1.6px solid black' , padding:"50px", borderRadius:"30px", margin:'30px 40px'}}>
                         <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                          <h2 style={{ margin: "auto " , flex:1}}>
                         Section {lessonIndex + 1}:
                          </h2>
                          <Input bordered
                            label="Title"
                            id={`lesson-${lessonIndex}-name`}
                            style={{ width:"55vw"}}
                            multiline
                            onChange={(event) =>
                              handleLessonChange(
                                lessonIndex,
                                "lessonName",
                                event.target.value
                              )
                            }
                            value={lesson.lessonName}
                            onKeyDown={handleKeyDown}
                          /></div> 
                        
                          <TypeWrapper
                            style={{ padding: "30px 40px 20px 30px" }}
                          >
                            <TypeContainer
                              onClick={() =>
                                handleTypeClick(lessonIndex, "video")
                              }
                              style={{
                                height: "125px",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: "45px",
                              }}
                            >
                              <input
                                className="radio"
                                type="radio"
                                id={`video${lessonIndex}`}
                                name={`type${lessonIndex}`}
                                value="video"
                                checked={lesson.type === "video"}
                                onChange={() => {}}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                htmlFor={`video${lessonIndex}`}
                                style={{ cursor: "pointer" }}
                              >
                                <h1>Video</h1>
                              </label>
                            </TypeContainer>
                            <TypeContainer
                              onClick={() =>
                                handleTypeClick(lessonIndex, "quiz")
                              }
                              style={{
                                height: "125px",
                                flexDirection: "row",
                                alignItems: "center",
                                padding: "45px",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                className="radio"
                                type="radio"
                                id={`quiz${lessonIndex}`}
                                name="type"
                                value={`type${lessonIndex}`}
                                checked={lesson.type === "quiz"}
                                onChange={() => {}}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                htmlFor={`quiz${lessonIndex}`}
                                style={{ cursor: "pointer" }}
                              >
                                <h1>Quiz</h1>
                              </label>
                            </TypeContainer>
                          </TypeWrapper>

                          <Input type="number" bordered
                             label="Points"
                             id={`lesson-${lessonIndex}-points`}
                             style={{ margin: "20px" }}
                             multiline
                             onChange={(event) =>
                               handleLessonChange(
                                 lessonIndex,
                                 "points",
                                 event.target.value
                               )
                             }
                             value={lesson.points}
                             onKeyDown={handleKeyDown}
                           
                          />
                          {/* <VideoUploader video={video} setVideo={setVideo} /> */}
                          {lesson.type === "video" && (
                            <>
                              <VideoUploader onUpload={handleVideoUpload} />
                              {videoUrl && (
                                <CloudinaryVideoContainer cloudName="dub9jmuyb">
                                  <VideoWndw publicId={videoUrl} controls />
                                </CloudinaryVideoContainer>
                              )}
                            </>
                          )}
                          {lesson.type === "quiz" && (
                            <div>
                              <TextField
                                fullWidth
                                label="Exercise text"
                                id="desc"
                                style={{ margin: "20px" }}
                                onChange={(e) => setExercise(e.target.value)}
                                value={exercise}
                                multiline
                                rows={5}
                                onKeyDown={handleKeyDown}
                              />
                            
                              {options.map((option, index) => (
                                <OptionsContainer key={option.id}>
                                  {isEditing === index ? (
                                    <TextInput
                                      type="text"
                                      value={option.label}
                                      onChange={(event) =>
                                        handleChange(event, index)
                                      }
                                      onBlur={() => handleBlur(index)}
                                      autoFocus
                                    />
                                  ) : (
                                    <Label
                                      onDoubleClick={() =>
                                        handleDoubleClick(index)
                                      }
                                    >
                                      <RadioInput
                                        type="radio"
                                        value={option.id}
                                        checked={correct_answer === option.id}
                                        onChange={handleOptionChange}
                                      />
                                      {option.label}
                                    </Label>
                                  )}
                                </OptionsContainer>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: " 20px 150px",
                    alignItems: "flex-end",
                  }}
                >
                  <WhiteBtn
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </WhiteBtn>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <BlackBtn
                    style={{ padding: "10px 16px" }}
                    onClick={handleNext}
                  >
                    Next
                  </BlackBtn>
                </Box>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Header>Finished ?</Header>
                <TextSub style={{ width: "70%", margin: "20px 100px" }}>
                  If you finished creating the content of the course, you can
                  click on "Create".
                </TextSub>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: " 20px 150px",
                    alignItems: "flex-end",
                  }}
                >
                  <WhiteBtn
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </WhiteBtn>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <BlackBtn
                    style={{ padding: "10px 16px" }}
                    onClick={handleSubmit}
                  >
                    Create
                  </BlackBtn>
                </Box>
              </>
            )}
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>
                {/* <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: " 20px 150px",
                    alignItems: "flex-end",
                  }}
                >
                  <WhiteBtn
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </WhiteBtn>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <BlackBtn
                    style={{ padding: "10px 16px" }}
                    onClick={
                      activeStep !== 1 ? handleSubmit : handleFirstPart
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </BlackBtn>
                </Box> */}
              </>
            )}
          </Box> 
    </div>
  );
};

export default NewContentForm;
