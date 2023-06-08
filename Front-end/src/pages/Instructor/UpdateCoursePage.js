import React from "react";
import NavBarInst from "../../components/NavBar/instructorNavbar";
import UpdateCourse from "../../components/Course/UpdateCourse/UpdateCourse";
import Footer from "../../components/Footer";

const UpdateCoursePage = () => {
  return (
    <>
      <NavBarInst />
      <UpdateCourse />
    </>
  );
};

export default UpdateCoursePage;
