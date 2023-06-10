import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CloudinaryContext, Video } from "cloudinary-react";

export const QuizContainer = styled.section`
  margin: 10px;
  width: 50%;
`;

export const LessonTitle = styled.h2`
  font-size: 35px;
  margin: 0 0 15px 8px;
`;
export const  Ticket=()=>{
  return( <svg style={{margin:'auto', zIndex:'-200'}} width="464" height="211" viewBox="0 0 564 311" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.802246" y="0.0518799" width="522.893" height="309.977" fill="#F989E6"/>
  <ellipse cx="523.696" cy="155.04" rx="39.7903" ry="38.0849" fill="white"/>
  </svg>)
}
export const LessonParagraph = styled.p`
  font-size: 1.15rem;
  margin: 0 10px 15px 10px;
`;

export const QuizElement = styled.h3`
  font-size: 25px;
  margin: 0 0 15px 20px;
`;

export const QuizOptions = styled.label`
  font-size: 1.25rem;
  margin: 0 0 15px 10px;
`;

export const QuizAnswer = styled.h1`
  margin: 50px auto;
  padding: 70px;
  width: fit-content;
  border: 1px solid rgb(141, 100, 245, 0);
  background-color: rgb(141, 100, 245, 0.5);
  color: #333;
  font-size: 40px;
  border-radius: 30px;
  text-align: center;
`;

export const VideoFrame = styled(Video)`
  margin: 25px auto;
`;

export const NextButton = styled.button`
  text-decoration: none;
  margin: 25px 18px 0px 0;
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 25px;
  font-size: 22px;
  background-color: white;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transition: all 0.4s ease-in-out;
    padding: 10px 20px;
    background: #8D64F5;
    border: 2px solid #8D64F5;
    color: white;
  }
`;


export const CloudinaryVideoContainer = styled(CloudinaryContext)`
  
`

export const VideoWndw = styled(Video)`
  width: 70%;
  height: auto;
  border-radius: 30px;
  margin: 15px 260px;
  padding: 15px;
  border: 2px solid rgb(0, 0, 0, 0.3);
  background-color: rgb(0, 0, 0, 0.2);
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.2);
`

export const CsvLink = styled.a`
  color: #008ae6;
  font-size: 25px;
`

export const RadioInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin-top: 8px;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid #333;
  border-radius: 50%;
  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 0.2rem;
  }
  :hover {
    ::after {
      background-color: rgb(98, 12, 103, 0.6);
    }
  }
  :focus {
    outline: 2px solid rgb(98, 12, 103, 0.2);
  }
  :checked {
    ::after {
      background-color: rgb(98, 12, 103);
    }
    :hover {
      background-color: white;
      border: 2px solid rgb(98, 12, 103);
      ::after {
        background-color: rgb(98, 12, 103);
      }
    }
  }
`;