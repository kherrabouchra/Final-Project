import React from "react";
import NavBarInst from "../components/NavBar/instructorNavbar";
import { HackathonTable } from "../components/Dashboard/InstructorDashboard/InstructorDashboardElements";
import HackTableList from "../components/Global/TableElements/HackTable";
import {
  Banner,
  BlackBtn,
  Header,
  SubHeader,
  TextSub,
} from "../components/Global/GlobalComponents";
import { Link } from "react-router-dom";
import { TextWrapper } from "../components/HeroSection/HeroElements";
import CourseTable from '../components/CourseManagament/CourseTable';

const CourseManagamentPage = () => {
  return (
    <div>
      <NavBarInst />
      <CourseTable />
    </div>
  );
};

export default CourseManagamentPage;
