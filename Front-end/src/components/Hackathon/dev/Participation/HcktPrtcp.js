import React, { useEffect, useState } from "react";
import { Banner, BlackBtn, Container, TextSub } from "../../../Global/GlobalComponents";
import { TextField } from "@mui/material";
import api from "../../../../api/api";
import { useParams } from "react-router-dom";
import { CourseTitle } from "../../../Course/Details/CourseElements";
import { TextWrapper } from "../../../HeroSection/HeroElements";
import { Code, Tabs } from "@mantine/core";
import { renderToString } from "react-dom/server";

const HcktPrtcp = () => {
  const [hackathon, setHackathon] = useState({});
  const { id } = useParams();

  const fetchHackathon = async () => {
    api
      .get(`/hackathons/${id}`)
      .then((res) => {
        if (res.status === 200) {
            setHackathon(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(hackathon)

  function renderQuestion(question) {
    const html = question;
    const container = document.createElement("div");
    container.innerHTML = html;

    const codeTags = container.querySelectorAll("code");

    codeTags.forEach((codeTag) => {
      const codeText = codeTag.textContent;
      const codeLanguage = codeTag.getAttribute("language");

      const codeComponent = React.createElement(
        Code,
        { language: codeLanguage },
        codeText
      );

      const wrapper = document.createElement("div");
      const renderedCode = renderToString(codeComponent);
      wrapper.innerHTML = renderedCode;

      // Replace the <code> tag with the wrapper div in the container
      codeTag.parentNode.replaceChild(wrapper.firstChild, codeTag);
    });

    // Return the modified HTML string
    return container.innerHTML;
  }

  useEffect(() => {
    fetchHackathon();
  }, []);

  return (
    <>
      <Banner color={"black"} style={{ display: "flex" }}>
        <TextWrapper style={{ flex: 1, margin: "45px 99px" }}>
          <CourseTitle color={"white"} title={`${hackathon.name} Hackathon`} style={{ width: "80vw" }} />
          <TextSub style={{ color: "white", margin: 0 }}>
            Answer the following question(s) before the time is up. Good luck!
          </TextSub>
          <br/>
          <TextSub style={{ color: "white", margin: 0 }}>
            Timer
          </TextSub>
        </TextWrapper>
      </Banner>
      <Container style={{ height: "100vw" }}>
        <h1>Problem</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "2.4rem",
            padding: "0 30px",
            justifyContent: "space-around",
          }}
          dangerouslySetInnerHTML={{
            __html: renderQuestion(hackathon.question),
          }}
        ></div>
        <h2>Good Luck!</h2>
        <h1>Answer</h1>
        <TextField
          fullWidth
          label="Answer"
          id="bg"
          style={{ margin: "20px" }}
          multiline
          /* onChange={(e) => setHackathon(hackathon.solution)}
          value={hackathon.solution} */
          rows={10}
        />

        <BlackBtn style={{ width: "5%" }}>Submit</BlackBtn>
      </Container>
    </>
  );
};

export default HcktPrtcp;
