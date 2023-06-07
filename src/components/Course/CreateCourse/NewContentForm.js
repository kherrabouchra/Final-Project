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
  P,
  SubHeader,
  TextSub,
  WhiteBtn,
} from "../../Global/GlobalComponents";
import { DoodleArrow } from "../../LandingSection/LandingContent";
import TextField from "@mui/material/TextField";
import { Switch, Spacer } from "@nextui-org/react";
import { Radio, Grid } from "@nextui-org/react";
import { FilterBtnWrapper } from "../../Course/Courses/LearnElements";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { TextWrapper } from "../../HeroSection/HeroElements";
import { ContentWrapper } from "../../Course/Details/CourseElements";
import VideoUploader from "./VideoUploader";
import {
  TypeWrapper,
  TypeContainer,
  TypeCheckBox,
} from "../../Signup/SignupElements";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextEditor } from "../../Global/TextEditor";

import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import api from "../../../api/api";
import {
  CsvLink,
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
import CsvUploader from "./CsvUploader";
import { CheckBox } from "../../Global/GlobalComponents";
import { MdArrowBack } from "react-icons/md";
const steps = [" ", " ", " "];

const NewContentForm = () => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [exercise, setExercise] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [correct_answer, setCorrect_answer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess]= useState('')
  const navigate= useNavigate()
  const { id } = useParams();

  const fetchCourses = async () => {
    try {
      const course = await api.get(`courses/${id}`);
      const chapters = await api.get(`courses/chapters/getAll/${id}`);

      setCourseName(course.data.data.name);
      setChapters(chapters.data);
      console.log(course, chapters);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const lessonData = lessons.map((lesson) => ({
        lessonName: lesson.lessonName,
        points: lesson.points,
        videoUrl: lesson.videoUrl,
        notebookURL: lesson.notebookURL,
        csvUrl: lesson.csvUrl,
        chapterID: lesson.chapterID,
      }));

      const createdLessons = await api.post(
        "courses/lessons/create",
        lessonData
      );

      const createdLessonIDs = createdLessons.data.lessonIDs;

      const quizData = createdLessonIDs.reduce(
        (accumulator, lessonID, index) => {
          const lesson = lessons[index];

          if (lesson.showQuiz === true) {
            const quiz = {
              lessonID: lessonID || null,
              exercise: lesson.exercise || null,
              correct_answer: lesson.correct_answer || null,
              option_a: lesson.options[0]?.label || null,
              option_b: lesson.options[1]?.label || null,
              option_c: lesson.options[2]?.label || null,
              option_d: lesson.options[3]?.label || null,
            };
            accumulator.push(quiz);
          }
          return accumulator;
        },
        []
      );
      if (quizData.length > 0) {
        const createdQuizzes = await api.post("courses/quiz/create", quizData);
        console.log(createdQuizzes.data);
        setSuccess(true);
      }
      console.log(createdLessons.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(lessons);
  console.log(chapters.length);

  const handleVideoUpload = (videoUrl, lessonIndex) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.map((lesson, index) => {
        if (index === lessonIndex) {
          return {
            ...lesson,
            videoUrl: videoUrl,
          };
        }
        return lesson;
      });
      return updatedLessons;
    });
  };

  const handleVideoRemove = (lessonIndex) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.map((lesson, index) => {
        if (index === lessonIndex) {
          return {
            ...lesson,
            videoUrl: null, // Remove the video URL
          };
        }
        return lesson;
      });
      return updatedLessons;
    });
  };

  const handleCsvUpload = (csvUrl, lessonIndex) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.map((lesson, index) => {
        if (index === lessonIndex) {
          return {
            ...lesson,
            csvUrl: csvUrl,
          };
        }
        return lesson;
      });
      return updatedLessons;
    });
  }; 

  const handleCsvRemove = (lessonIndex) => {
    setLessons((prevLessons) => {
      const updatedLessons = prevLessons.map((lesson, index) => {
        if (index === lessonIndex) {
          return {
            ...lesson,
            csvUrl: null, // Remove the csv URL
          };
        }
        return lesson;
      });
      return updatedLessons;
    });
  };

  const handleDoubleClick = (lessonIndex, optionIndex) => {
    setIsEditing({ lessonIndex, optionIndex });
  };

  const handleBlur = (lessonIndex, optionIndex) => {
    setIsEditing(false);
  };

  /* const handleChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].label = event.target.value;
    setOptions(newOptions);
  }; */

  const handleOptionChange = (lessonIndex, optionId) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      newLessons[lessonIndex].correct_answer = optionId;
      return newLessons;
    });
  };

  const addLesson = (chapterIndex) => {
    setLessons((prevLessons) => [
      ...prevLessons,
      {
        lessonName: null,
        points: null,
        notebookURL: null,
        videoUrl: null,
        csvUrl: null,
        chapterID: chapters[chapterIndex].id,
        exercise: null,
        options: [
          { id: "a", label: "Option A" },
          { id: "b", label: "Option B" },
          { id: "c", label: "Option C" },
          { id: "d", label: "Option D" },
        ],
        correct_answer: null,
        showQuiz: false,
      },
    ]);
  };

  const toggleQuizFields = (index) => {
    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      updatedLessons[index] = {
        ...updatedLessons[index],
        showQuiz: !updatedLessons[index].showQuiz,
      };
      return updatedLessons;
    });
  };

  const handleLessonChange = (lessonIndex, field, value) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      newLessons[lessonIndex][field] = value;
      return newLessons;
    });
  };

  const handleLabelChange = (lessonIndex, optionIndex, value) => {
    setLessons((prevLessons) => {
      const newLessons = [...prevLessons];
      newLessons[lessonIndex].options[optionIndex].label = value;
      return newLessons;
    });
  };

  /* const handleTypeClick = (index, type) => {
    setLessons((prevLesson) => {
      const updatedLesson = [...prevLesson];
      updatedLesson[index] = { ...updatedLesson[index], type };
      return updatedLesson;
    });
  }; */

  /* const handleTypeClick = (index, type) => {
    setLessons((prevLessons) => {
      const updatedLesson = [...prevLessons];
      updatedLesson[index] = { ...updatedLesson[index], type };
      if (type === 'video') {
        delete updatedLesson[index].options;
      }
      return updatedLesson;
    });
  }; */

  /* const handleTypeClick = (index, type) => {
    setLessons((prevLessons) => {
      const updatedLesson = [...prevLessons];
      updatedLesson[index] = {
        ...updatedLesson[index],
        type,
        options: type === "video" ? null : updatedLesson[index].options,
      };
      return updatedLesson;
    });
  }; */

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateForm = () => {
    if (activeStep === 0) {
      // Step 0 doesn't require the lessons fields
      return true; // Return true to indicate the form is valid
    }

    if (lessons.length === 0) {
      setError("Please create the lessons");
      return false; // Return false to indicate the form is invalid
    }

    let hasErrors = false;

    const newErrors = lessons.map((lesson, index) => {
      const error = {};

      if (!lesson.lessonName) {
        error.lessonName = `Please enter a lesson name`;
        hasErrors = true;
      }
      if (!lesson.points) {
        error.points = `Please enter the number of points`;
        hasErrors = true;
      }
      if (!lesson.videoUrl && !lesson.showQuiz) {
        error.videoQuiz = `Please upload a video or create a quiz`;
        hasErrors = true;
      } else{ if (!lesson.exercise & lesson.showQuiz) {
        error.exercise = `Please enter an exercise text`;
        hasErrors = true;
      }
      if (!lesson.correct_answer & lesson.showQuiz) {
        error.correct_answer = `Please select the correct answer`;
        hasErrors = true;
      }}
     
      

      return error;
    });

    const chapterIdsWithLessons = lessons.map((lesson) => lesson.chapterID);
    const chapterIds = chapters.map((chapter) => chapter.id);

    const missingChapterIds = chapterIds.filter(
      (chapterId) => !chapterIdsWithLessons.includes(chapterId)
    );

    if (missingChapterIds.length > 0) {
      setError("Please create the lessons for all chapters");
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return false; // Return false to indicate the form is invalid
    }

    setErrors([]); // Clear any previous errors

    return true; // Return true to indicate the form is valid
  };

  const handleNext = (e) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    const isValid = validateForm();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    handleScrollToTop();
  };

  const removeLesson = (index) => {
    setLessons((prevLessons) => {
      const updatedLessons = [...prevLessons];
      updatedLessons.splice(index, 1);
      return updatedLessons;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (activeStep === 0) handleSubmit();
    }
  };

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ background: "white", height: "100%" }}>

      <Link to="/instdash/courses">
        <GoBack color={"black"} style={{marginRight:'40px'}}/>
      </Link>
      <DashboardContainerDisplay>
    
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Stepper style={{ flex: 1 }} activeStep={activeStep}>
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
                <Header>Details</Header>
                <TextSub style={{ width: "70%", margin: "10px 100px" }}>
                  Here is the gamified course and its syllabus. You're going to
                  create the content of it.
                </TextSub>

                <Box
                  sx={{ padding: "20px 50px", width: "70%", maxWidth: "100%" }}
                >
                  <h1>{courseName}</h1>
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
                    onClick={handleNext}
                  >
                    Next
                  </BlackBtn>
                </Box>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Header>Gamified course creation</Header>
                <TextSub style={{ width: "70%", margin: "20px 100px" }}>
                  Create the content of the chapters.
                </TextSub>

                {chapters.map((chapter, chapterIndex) => (
                  <div key={chapter.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <h2 style={{ margin: "30px 30px 0 30px" }}>
                        {chapterIndex + 1}. {chapter.chapterName}
                      </h2>

                      <BlackBtn onClick={() => addLesson(chapterIndex)}>
                        + Section
                      </BlackBtn>
                    </div>
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
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
                    </div> */}
                    {lessons.map((lesson, lessonIndex) =>
                      lesson.chapterID === chapter.id ? (
                        <div key={lessonIndex}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-end",
                              margin: "30px 0 0 15px",
                            }}
                          >
                            <h2 style={{ margin: "2px 30px" }}>
                              Section {lessonIndex + 1}:
                            </h2>
                            <BlackBtn onClick={() => removeLesson(lessonIndex)}>
                              Delete
                            </BlackBtn>
                          </div>
                          <TextField
                            fullWidth
                            label="Section name"
                            id={`lesson-${lessonIndex}-name`}
                            style={{ margin: "20px 20px 0 20px" }}
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
                          />
                          {errors[lessonIndex] &&
                            errors[lessonIndex].lessonName && (
                              <div className="errmsg">
                                {errors[lessonIndex].lessonName}
                              </div>
                            )}
                          <TextField
                            fullWidth
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
                          {errors[lessonIndex] &&
                            errors[lessonIndex].points && (
                              <div className="errmsg">
                                {errors[lessonIndex].points}
                              </div>
                            )}
                          {/* <TypeWrapper
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
                          </TypeWrapper> */}
                          {/* {errors[lessonIndex] && errors[lessonIndex].type && (
                            <div className="errmsg">
                              {errors[lessonIndex].type}
                            </div>
                          )} */}
                          {/* {lesson.type === "video" && ( */}
                          <TextSub
                            style={{ width: "70%", margin: "10px 100px" }}
                          >
                            You can either upload a video or a create quiz for
                            your section. Or you can do both.
                          </TextSub>
                          <div style={{ display: "flex" }}>
                            <VideoUploader
                              onUpload={(videoUrl) =>
                                handleVideoUpload(videoUrl, lessonIndex)
                              }
                            />
                            <BlackBtn
                              style={{ width: "150px", margin: "15px 200px" }}
                              onClick={() => toggleQuizFields(lessonIndex)}
                            >
                              {lesson.showQuiz ? "Remove quiz" : "Add quiz"}
                            </BlackBtn>
                          </div>
                          {lesson.videoUrl && ( 
                            <>
                              <CloudinaryContext cloudName="dub9jmuyb">
                                <VideoWndw
                                  publicId={lesson.videoUrl}
                                  controls
                                />
                              </CloudinaryContext>
                              <BlackBtn
                                style={{ width: "150px", margin: "15px 200px" }}
                                onClick={() => handleVideoRemove(lessonIndex)}
                              >
                                Delete video
                              </BlackBtn>
                            </>
                          )}

                          {/* )} */}
                          {/* {lesson.type === "quiz" && ( */}
                          <div>
                            {lesson.showQuiz && (
                              <>
                                <TextField
                                  fullWidth
                                  label="Exercise text"
                                  id="exo"
                                  style={{ margin: "20px" }}
                                  onChange={(event) =>
                                    handleLessonChange(
                                      lessonIndex,
                                      "exercise",
                                      event.target.value
                                    )
                                  }
                                  value={lesson.exercise}
                                  multiline
                                  rows={5}
                                  onKeyDown={handleKeyDown}
                                />
                                {errors[lessonIndex] &&
                                  errors[lessonIndex].exercise && (
                                    <div className="errmsg">
                                      {errors[lessonIndex].exercise}
                                    </div>
                                  )}
                                <TextSub
                                  style={{ width: "70%", margin: "10px 100px" }}
                                >
                                  Double click on the options to edit them. Then
                                  select one of the options to precise the
                                  correct answer.
                                </TextSub>
                                {lesson.options.map((option, optionIndex) => (
                                  <OptionsContainer key={option.id}>
                                    {isEditing &&
                                    isEditing.lessonIndex === lessonIndex &&
                                    isEditing.optionIndex === optionIndex ? (
                                      <TextInput
                                        type="text"
                                        value={option.label}
                                        onChange={(event) =>
                                          handleLabelChange(
                                            lessonIndex,
                                            optionIndex,
                                            event.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          handleBlur(lessonIndex, optionIndex)
                                        }
                                        autoFocus
                                      />
                                    ) : (
                                      <Label
                                        onDoubleClick={() =>
                                          handleDoubleClick(
                                            lessonIndex,
                                            optionIndex
                                          )
                                        }
                                      >
                                        <RadioInput
                                          type="radio"
                                          value={option.id}
                                          checked={
                                            lesson.correct_answer === option.id
                                          }
                                          onChange={() =>
                                            handleOptionChange(
                                              lessonIndex,
                                              option.id
                                            )
                                          }
                                        />
                                        {option.label}
                                      </Label>
                                    )}
                                  </OptionsContainer>
                                ))}
                                {errors[lessonIndex] &&
                                  errors[lessonIndex].correct_answer && (
                                    <div className="errmsg">
                                      {errors[lessonIndex].correct_answer}
                                    </div>
                                  )}
                              </>
                            )}

                            {errors[lessonIndex] &&
                              errors[lessonIndex].videoQuiz && (
                                <div className="errmsg">
                                  {errors[lessonIndex].videoQuiz}
                                </div>
                              )}
                            <TextField
                              fullWidth
                              label="Notebook URL (Jupyter notebook is recommended)"
                              id="notebookURL"
                              style={{ margin: "20px" }}
                              multiline
                              onChange={(event) =>
                                handleLessonChange(
                                  lessonIndex,
                                  "notebookURL",
                                  event.target.value
                                )
                              }
                              value={lesson.notebookURL}
                              onKeyDown={handleKeyDown}
                            />
                            {errors[lessonIndex] &&
                              errors[lessonIndex].notebookURL && (
                                <div className="errmsg">
                                  {errors[lessonIndex].notebookURL}
                                </div>
                              )}

                            <CsvUploader
                                onUpload={(csvUrl) =>
                                  handleCsvUpload(csvUrl, lessonIndex)
                                }
                              />
                              {lesson.csvUrl && (
                                <div style={{ margin: "15px 175px" }}>
                                  <CsvLink
                                    href={lesson.csvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download CSV File
                                  </CsvLink>
                                  <BlackBtn
                                  style={{
                                    width: "150px",
                                    margin: "15px 25px",
                                  }}
                                  onClick={() => handleCsvRemove(lessonIndex)}
                                >
                                  Delete CSV file
                                </BlackBtn>
                                </div>
                              )} 
                          </div>
                          {/* )} */}
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
                {error && <div className="errmsg">{error}</div>}
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
              <> {!success ? <>
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
                </Box></> : <> 
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:"80px"}}>
       
       <SubHeader>Gamified course successfully created !</SubHeader>
       <CheckBox></CheckBox>
       <WhiteBtn onClick={()=>navigate ('/instdash/courses')}> <MdArrowBack/> Go back to courses</WhiteBtn>
       </div></>}
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
                    onClick={activeStep !== 0 ? handleSubmit : handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </BlackBtn>
                </Box> */}
              </>
            )}
          </Box>
      </DashboardContainerDisplay>
    </div>
  );
};

export default NewContentForm;
