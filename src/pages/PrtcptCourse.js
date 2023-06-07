import React from "react";
import Learn from "../components/Course/Courses/index";
import { NavBarDev } from "../components/NavBar/index-2";
import Footer from "../components/Footer";
import ParticipateCourse from "../components/ParticipateCourse/ParticipateCourse";

const PrtcptCourse = ({user, log}) => {
  return (
    <div>
      <NavBarDev/>
      <ParticipateCourse user={user} log={log} />
      <Footer />
    </div>
  );
};

export default PrtcptCourse;
