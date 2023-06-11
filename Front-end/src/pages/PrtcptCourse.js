import React from "react";
import Learn from "../components/Course/Courses/index";
import { NavBarDev } from "../components/NavBar/index-2";
import Footer from "../components/Footer";
import ParticipateCourse from "../components/ParticipateCourse/ParticipateCourse";
import { useLocation } from "react-router-dom";

const PrtcptCourse = () => {

  const loc=useLocation();
  const user = loc.state;
  return (
    <div>
      <NavBarDev/>
      <ParticipateCourse />
      <Footer />
    </div>
  );
};

export default PrtcptCourse;
