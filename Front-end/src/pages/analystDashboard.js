import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/Admin/styles/global";
import { lightTheme, darkTheme } from "../components/Admin/styles/theme";
import Nav from "../components/Analyst/Nav";
import Main from "../components/Analyst/Main";
import MenuAnalyst from "../components/Analyst/menuAnalyst";

const AnalystDashboard = () => {
  
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />

     <MenuAnalyst/>
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default AnalystDashboard;
