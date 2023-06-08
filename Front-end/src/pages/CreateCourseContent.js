import React from "react";
import NavBarInst from "../components/NavBar/instructorNavbar";
import NewContentForm from '../components/Course/CreateCourse/NewContentForm';
import Footer from "../components/Footer";

const CreateCourseContent = () => {
  return (
    <>
      <NewContentForm />
      <Footer />
    </>
  );
};

export default CreateCourseContent;
