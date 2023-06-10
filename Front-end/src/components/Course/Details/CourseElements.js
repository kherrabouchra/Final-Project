import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../../api/api";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const TextWrapper = styled.div`
  margin: 100px 0 0 132px;
  max-width: 70%;
`;

export const CourseTitle = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 77px;
  color: rgba(32, 32, 32, 1);
  &:before {
    content: ${(props) => `'${props.title}'`};
    color: ${(props) => props.color};
  }
`;

export const CourseIcon = styled.svg`
  align-self: center;
  padding-right: 180px;
  background-repeat: no-repeat;
  width: 195px;
  height: 195px;
  background: url("${(props) => props.img}");
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  flex: 1;
  max-width: 70%;
  flex-basis: 50%;
  @media screen and (max-width: 768px) {
  }
`;

export const Header = styled.h1`
  padding: 35px;
  margin-left: 60px;
  margin-top: 20px;
`;
export const P = styled.p`
  margin-left: 100px;
  margin-right: 50px;
  font-size: large;
  line-height: 164.02%;
  @media screen and (max-width: 768px) {
    margin: 10px;
  }
`;

export const Rectangle = styled.div`
  box-sizing: border-box;
  margin: 0 7%;
  width: 80%;
  height: auto;

  border: 1px solid #000000;
  border-radius: 50px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: auto;
  }
`;

export const SyllabusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 50px 50px 300px;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    margin: 10px 0 0 50px;
  }
`;
export const LessonLink = styled(Link)`
  background-color: transparent;
  font-size: 24px;
  font-weight: 600;
  border: none;
  color: black;
  margin: -4px 17px;
  text-align: left;
  cursor: pointer;
  padding: 9px;
  &:hover {
    background-color: rgb(0, 0, 0, 0.15);
    text-decoration: underline;
    border-radius: 17px;
  }
`;
export const Lesson = styled(LinkS)`
  display: flex;
  align-items: flex-start;
  font-size: x-large;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    margin: 0px;
  }
`;
export const LessonTitle = styled.h4`
  padding: 4px 25px;
`;

// export const LessonIconOpen =()=>{
//   return(
//     < >
//     <div className="Lesson-icon">

// <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
// <circle cx="19.1604" cy="19.1746" r="16.5" fill="white" stroke="#4FE9AF" strokeWidth="4"/>
// </svg> <VerticalSeparator separator="false" className="iconLine" height="45px"/></div></>
//   )
// }

export const LessonIcon = () => {
  return (
    <>
      <div className="Lesson-icon">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="37"
            height="37"
            transform="translate(0.458496 0.671387)"
            fill="white"
          />
          <circle
            cx="18.9585"
            cy="19.1714"
            r="17"
            stroke="black"
            strokeOpacity="0.44"
            strokeWidth="3"
          />
          <path
            d="M24.6019 14.6083V13.6333C24.6019 10.6333 22.3519 8.0833 19.5019 7.8583C17.9269 7.7083 16.3519 8.2708 15.1894 9.3208C14.0269 10.3708 13.3519 11.8708 13.3519 13.4083V14.6083C11.1769 15.0208 9.52686 16.9333 9.52686 19.2583V26.0458C9.52686 28.5208 11.5519 30.5083 13.9894 30.5083H23.8894C26.3644 30.5083 28.3894 28.4833 28.3894 26.0083V19.1833C28.4269 16.9333 26.7769 15.0583 24.6019 14.6083ZM16.3144 10.5583C17.1394 9.8083 18.2269 9.4333 19.3519 9.5458C21.3394 9.7333 22.9144 11.5333 22.9144 13.6333V14.4958H15.0394V13.3708C15.0394 12.3208 15.4894 11.3083 16.3144 10.5583ZM26.7394 26.0458C26.7394 27.5833 25.4644 28.8583 23.9269 28.8583H14.0269C12.4894 28.8583 11.2519 27.6208 11.2519 26.0833V19.2583C11.2519 17.5708 12.6019 16.2208 14.2894 16.2208H23.6644C25.3519 16.2208 26.7394 17.5708 26.7394 19.1833V26.0458Z"
            fill="black"
            fillOpacity="0.44"
          />
          <path
            d="M18.9768 20.1208C18.5268 20.1208 18.1143 20.4958 18.1143 20.9833V24.9208C18.1143 25.3708 18.4893 25.7833 18.9768 25.7833C19.4268 25.7833 19.8393 25.4083 19.8393 24.9208V20.9458C19.8393 20.4958 19.4268 20.1208 18.9768 20.1208Z"
            fill="black"
            fillOpacity="0.44"
          />
        </svg>
        <VerticalSeparator
          separator="false"
          className="iconLine"
          height="45px"
        />
      </div>
    </>
  );
};

export const UnlockedIcon =()=>{
   return(<div className="Lesson-icon"> 
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="19.1604" cy="19.1746" r="16.5" fill="white" stroke="#686868" stroke-width="4"/>
</svg>
<VerticalSeparator
          separator="false"
          className="iconLine"
          height="45px"
        /></div>
)
}
export const CourseCard = ({ details, courses, type, to, state }) => {
  const [quizCount, setQuizCount] = useState({});
  const { id } = useParams();

  
  console.log(details, courses, type)

  useEffect(() => { 
  setQuizCount(3);

  }, []);

  return (
    <div
      style={{
        width: "330.95px",
        height: "399.45px",
        position: "relative",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          width: "330.95px",
          height: "399.45px",
          position: "absolute",
          left: "-0.7px",
          top: "-0.7px",
          borderRadius: 22,
          background: "#f1f1f1",
          boxShadow: "0px 2px 4px 0 rgba(0,0,0,0.25)",
        }}
      />
      <svg
        width={279}
        height={112}
        viewBox="0 0 279 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", left: "51.98px", top: "369.36px" }}
        preserveAspectRatio="none"
      >
        <g filter="url(#filter0_d_117_791)">
          <path
            d="M27.5396 52.2576C27.5396 36.471 40.3372 23.6733 56.1238 23.6733H222.955C238.742 23.6733 251.54 36.471 251.54 52.2576V52.2576C251.54 68.0443 238.742 80.8419 222.955 80.8419H56.1238C40.3372 80.8419 27.5396 68.0443 27.5396 52.2576V52.2576Z"
            fill="#202020"
          />
          <path
            d="M56.1238 24.6733H222.955C238.19 24.6733 250.54 37.0232 250.54 52.2576C250.54 67.492 238.19 79.8419 222.955 79.8419H56.1238C40.8895 79.8419 28.5396 67.492 28.5396 52.2576C28.5396 37.0232 40.8895 24.6733 56.1238 24.6733Z"
            stroke="black"
            strokeWidth={2}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_117_791"
            x="0.539551"
            y="0.67334"
            width={278}
            height="111.169"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feflood floodOpacity={0} result="BackgroundImageFix" />
            <fecolormatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feoffset dy={4} />
            <fegaussianblur stdDeviation="13.5" />
            <fecomposite in2="hardAlpha" operator="out" />
            <fecolormatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feblend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_117_791"
            />
            <feblend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_117_791"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <p
        style={{
          width: "385.18px",
          position: "absolute",
          left: "31.03px",
          top: 156,
          fontSize: 20,
          fontWeight: 500,
          textAlign: "left",
          color: "rgba(0,0,0,0.54)",
        }}
      >
        <span
          style={{
            width: 234,
            height: 19,
            position: "absolute",
            left: "200.53px",
            fontSize: 20,
            fontWeight: 600,
            textAlign: "left",
            color: "#000",
          }}
        >
          {quizCount.quizCount}
        </span>
        🧩 Quizzes
      </p>
      <p
        style={{
          width: "385.18px",
          position: "absolute",
          left: "31.03px",
          top: 216,
          fontSize: 20,
          fontWeight: 500,
          textAlign: "left",
          color: "rgba(0,0,0,0.54)",
        }}
      >
        {type === "courses" ? (
          <span
            style={{
              width: 234,
              height: 19,
              position: "absolute",
              left: "200.53px",
              fontSize: 20,
              fontWeight: 600,
              textAlign: "left",
              color: "#000",
            }}
          >
            {details && details.points} xp
          </span>
        ) : (
          <span
            style={{
              width: 234,
              height: 19,
              position: "absolute",
              left: "200.53px",
              fontSize: 20,
              fontWeight: 600,
              textAlign: "left",
              color: "#000",
            }}
          >
             {courses && courses.reduce((sum, course) => sum + course.points, 0)} xp
          </span>
        )}
        💯 Points
      </p>
      <p
        style={{
          width: "385.18px",
          position: "absolute",
          left: "31.03px",
          top: 276,
          fontSize: 20,
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        <span
          style={{
            width: "385.18px",
            fontSize: 20,
            fontWeight: 500,
            textAlign: "left",
            color: "rgba(0,0,0,0.54)",
          }}
        >
          🖥
        </span>
        <span
          style={{
            width: "385.18px",
            fontSize: 20,
            fontWeight: 500,
            textAlign: "left",
            color: "#000",
          }}
        >
          In-browser IDE to practice
        </span>
      </p>
      <p
        style={{
          width: "385.18px",
          position: "absolute",
          left: "31.03px",
          top: 42,
          fontSize: 20,
          fontWeight: 500,
          textAlign: "left",
          color: "rgba(0,0,0,0.54)",
        }}
      >
        ⏱ Duration
      </p>
      <p
        style={{
          width: "385.18px",
          position: "absolute",
          left: "31.03px",
          top: 99,
          fontSize: 20,
          fontWeight: 500,
          textAlign: "left",
          color: "rgba(0,0,0,0.54)",
        }}
      >
        <span
          style={{
            width: 234,
            height: 19,
            position: "absolute",
            left: "200.53px",
            fontSize: 20,
            fontWeight: 600,
            textAlign: "left",
            color: "#000",
          }}
        >
          {courses && courses.length}
        </span>
        {type === "courses" ? <p>📕 Lessons</p> : <p>📕 Courses</p>}
      </p>
      {type === "courses" ? (
        <p
          style={{
            width: 234,
            height: 19,
            position: "absolute",
            left: "200.53px",
            top: 42,
            fontSize: 20,
            fontWeight: 600,
            textAlign: "left",
            color: "#000",
          }}
        >
          {details.duration} Hours
        </p>
      ) : (
        <p
          style={{
            width: 234,
            height: 19,
            position: "absolute",
            left: "200.53px",
            top: 42,
            fontSize: 20,
            fontWeight: 600,
            textAlign: "left",
            color: "#000",
          }}
        >
          { courses ? courses.reduce((sum, course) => sum + course.duration, 0): ''} Hours
        </p>
      )}

      <Link href="#enroll" to={to} state={state}>
        <button
          className="btn"
          style={{
            top: "93%",
            width: "auto",
            left: "38%",
            position: "relative",
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            padding: "10px 15px",
            background: "#202020",
            border: " 2px solid #000000",
            boxShadow: "0px 4px 27px rgba(0, 0, 0, 0.25)",
            borderRadius: "50px",
          }}
        >
          Enroll
        </button>
      </Link>
    </div>
  );
};
