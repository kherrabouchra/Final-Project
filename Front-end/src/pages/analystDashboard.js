import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/Admin/styles/global";
import { lightTheme, darkTheme } from "../components/Admin/styles/theme";
import Nav from "../components/Analyst/Nav";
import Main from "../components/Analyst/Main";

const AnalystDashboard = () => {
  
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />

        <Nav />

        <Main />
      </ThemeProvider>
    </div>
  );
};

export default AnalystDashboard;
