import React, { useState } from "react";
import {
  LessonContainer,
  LessonTitle,
  LessonParagraph,
  QuizElement,
  QuizOptions,
  QuizAnswer,
  CsvLink,
  RadioInput,
  NextButton,
} from "./styles";
import { P } from "../Global/GlobalComponents";
import { Link, useParams } from "react-router-dom";

const Quiz = ({
  lesson,
  correct,
  submitted,
  handleCorrectAnswer,
  correctOptionLabel,
}) => {
  const { id } = useParams();

  return (
    <>
      <QuizElement>Exercise</QuizElement>
      <LessonParagraph>{lesson.exercise}</LessonParagraph>

      {lesson.csvUrl && (
        <div style={{ margin: "15px 50px" }}>
          <CsvLink
            href={lesson.csvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CSV File
          </CsvLink>
        </div>
      )}

      <QuizElement>Instructions</QuizElement>
      <RadioInput
        type="radio"
        id="option_a"
        name="question"
        value="a"
        onChange={() => handleCorrectAnswer("a")}
        disabled={submitted}
      />
      <QuizOptions htmlFor="option_a">{lesson.option_a}</QuizOptions>
      <br />
      <RadioInput
        type="radio"
        id="option_b"
        name="question"
        value="b"
        onChange={() => handleCorrectAnswer("b")}
        disabled={submitted}
      />
      <QuizOptions htmlFor="option_b">{lesson.option_b}</QuizOptions>
      <br />
      <RadioInput
        type="radio"
        id="option_c"
        name="question"
        value="c"
        onChange={() => handleCorrectAnswer("c")}
        disabled={submitted}
      />
      <QuizOptions htmlFor="option_c">{lesson.option_c}</QuizOptions>
      <br />
      <RadioInput
        type="radio"
        id="option_d"
        name="question"
        value="d"
        onChange={() => handleCorrectAnswer("d")}
        disabled={submitted}
      />
      <QuizOptions htmlFor="option_d">{lesson.option_d}</QuizOptions>
      {submitted && !correct && (
        <QuizAnswer>
          Incorrect answer!! The correct answer was {correctOptionLabel}.
          <br />
          <Link to={`/Dashboard/courses/lesson/${parseInt(id) + 1}`}>Next</Link>
        </QuizAnswer>
      )}

      {submitted && correct && (
        <QuizAnswer>
          Correct answer!!
          <br />
          <Link to={`/Dashboard/courses/lesson/${parseInt(id) + 1}`}>Next</Link>
        </QuizAnswer>
      )}
    </>
  );
};

export default Quiz;
