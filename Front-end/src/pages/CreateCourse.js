import React from "react";
import NavBarInst from "../components/NavBar/instructorNavbar";
import NewCourseForm from '../components/Course/CreateCourse/NewCourseForm';
import Footer from "../components/Footer";

const CreateCourse = () => {
  return (
    <> 
    <NavBarInst/>
      <NewCourseForm />
    </>
  );
};

export default CreateCourse;
