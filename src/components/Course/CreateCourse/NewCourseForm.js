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
import { Link } from "react-router-dom";
import api from "../../../api/api";

const steps = [" ", " ", " "];

const NewCourseForm = () => {
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const [path, setPath] = useState("");
  const [chapters, setChapters] = useState([]);
  const [chapterNames, setChapterNames] = useState([]);

  const handleSubmit = async (e) => {
    try {
      const course = await api.post("/courses/create", {
        name,
        description,
        duration,
        points,
      });

      const courseID = course.data.courseID;

      const chapter = await api.post("courses/chapters/create", {
        courseID,
        chapterNames
      }); //Add the course id here somehow

      console.log(course.data);
      console.log(chapter.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(chapterNames)

  const [data, setData] = useState({
    name: "",
    description: "",
    level: "",
    rules: "",
    type: "hackathon",
    Qtype: "",
    evaluationCriteria: "",
    creationDate: "",
    banner: "",
  });

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (activeStep === 0) handleSubmit();
    }
  };

  const addChapter = () => {
    setChapterNames((prevChapterName) => [...prevChapterName, ""]);
  };

  const handleChapterNameChange = (index, event) => {
    const newChapterName = [...chapterNames];
    newChapterName[index] = event.target.value;
    setChapterNames(newChapterName);
  };

  const checkFields = () => {
    const credentials = !name || !description || !duration || !points;
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

  /* const handleSubmit = () => {
    if (!checkFields()) {
      return;
    }
    handleScrollToTop();
    handleNext();
  }; */

  return (
    <div style={{ background: "black", height: "100%" }}>
      <Link to="/instdash/courses">
        <GoBack color={"white"} />
      </Link>
      <DashboardContainerDisplay>
        <DashboardContainer
          style={{
            height: `${
              activeStep === 1 && activeStep === 2 ? "800px" : "100%"
            }`,
            margin: "70px",
          }}
        >
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
                  Tell us about your gamified course. Please provide a brief
                  description of your course, including the name, duration and
                  points.
                </TextSub>

                <Box
                  sx={{ padding: "20px 50px", width: "70%", maxWidth: "100%" }}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    style={{ margin: "0 20px" }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Descriprion"
                    id="desc"
                    style={{ margin: "20px" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    multiline
                    rows={5}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    width="50"
                    label="Duration"
                    id="duration"
                    style={{ margin: "20px 50px 20px 20px" }}
                    multiline
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    width="50"
                    label="Points"
                    id="points"
                    style={{ margin: "20px 20px 20px 50px" }}
                    multiline
                    onChange={(e) => setPoints(e.target.value)}
                    value={points}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    fullWidth
                    label="Learning path"
                    id="path"
                    style={{ margin: "20px" }}
                    multiline
                    onChange={(e) => setPath(e.target.value)}
                    value={path}
                    onKeyDown={handleKeyDown}
                  />
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
                <Header>Gamified course syllabus</Header>
                <TextSub style={{ width: "70%", margin: "20px 100px" }}>
                  Create the course's chapter and their lessons.
                </TextSub>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  {chapterNames.length !== 0 && (
                    <BlackBtn onClick={() => setChapterNames([])}>reset</BlackBtn>
                  )}
                  {chapterNames.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        margin: "0 40px",
                      }}
                    >
                      <h3 style={{ color: "#F989E6", margin: "10px" }}>
                        Click to add a chapter.
                      </h3>
                      <DoodleArrow />
                    </div>
                  )}
                  <BlackBtn onClick={addChapter}>+ Chapter</BlackBtn>
                </div>

                {chapterNames
                  .map((chapterName, index) => (
                    <div key={index}>
                      <h2 style={{ margin: "0 30px" }}>Chapter {index + 1}:</h2>
                      <TextField
                        fullWidth
                        label="Chapter name"
                        id={`chaptername-${index}`}
                        style={{ margin: "20px" }}
                        multiline
                        onChange={(event) =>
                          handleChapterNameChange(index, event)
                        }
                        value={chapterName}
                        onKeyDown={handleKeyDown}
                      />
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
                  If you finished creating the course, you can click on
                  "Create".
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
        </DashboardContainer>
      </DashboardContainerDisplay>
    </div>
  );
};

export default NewCourseForm;
