import React, { useEffect, useState } from "react";
import { PurpleBtn } from "../Global/GlobalComponents";
import styled from "styled-components";
import { Calendar, Table } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import api from "../../api/api";
import { SubHeader } from "../Global/GlobalComponents";
import { CartesianGrid } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Column } = Table;

const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  position: relative;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colorGrayLight};
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
`;

const AnalyticsCard = styled.div`
  width: 30%;
  height: 14rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 20px;
`;
const UsersCard = styled.div`
  width: 60%;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 20px;
`;
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  height: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Main = (props) => {
  const [loginData, setLoginData] = useState([]);
  const [users, setUsers] = useState("");
  console.log(props);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // <-- Empty dependency array to run the effect only once

  const data = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 15 },
    { name: "Apr", value: 25 },
    { name: "May", value: 30 },
    { name: "Jun", value: 35 },
    { name: "Jul", value: 40 },
  ];
  const pidata = [
    { name: "Jan", developer: 20 },
    { name: "Feb", developer: 25 },
    { name: "Mar", developer: 30 },
    { name: "Apr", developer: 35 },
    { name: "May", developer: 40 },
    { name: "Jun", developer: 45 },
  ];
  const websiteData = [
    { month: "Jan", Jobs: 200, pages: 400, bounceRate: "25%" },
    { month: "Feb", Jobs: 350, pages: 600, bounceRate: "20%" },
    { month: "Mar", Jobs: 500, pages: 800, bounceRate: "18%" },
    { month: "Apr", Jobs: 700, pages: 1000, bounceRate: "15%" },
    { month: "May", Jobs: 900, pages: 1200, bounceRate: "12%" },
  ];
  const [jobOfferData, setJobOfferData] = useState([]);

  const fetchJobOfferData = async () => {
    try {
      const jobOfferData = await api.get("/job/analytic/jobmounth");
      const data = jobOfferData.data; // Assuming the response is in JSON format
      setJobOfferData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobOfferData();
  }, []);

  const [claimData, setClaimData] = useState([]);

  const fetchClaimData = async () => {
    try {
      const claimData = await api.get("/job/analytic/claimsmounth");
      const data = await claimData.data;
      setClaimData(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(claimData)

  useEffect(() => {
    fetchClaimData();
  }, []);

  const [challengeData, setChallengeData] = useState([]);

  const fetchChallengeData = async () => {
    try {
      const challengeData = await api.get("/job/analytic/challengemounth");
      const data = await challengeData.data;
      setChallengeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChallengeData();
  }, []);
  console.log("Challenge Data:", challengeData);
  const [userBanner, setUserBanner] = useState([]);

  const fetchUserData = async () => {
    try {
      const userBanner = await api.get("/job/analytic/banneduser");
      const data = await userBanner.data;
      setUserBanner(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [courseMounth, setCourseMounth] = useState([]);

  const fetchCourseMounth = async () => {
    try {
      const courseMounth = await api.get("/job/analytic/coursmounth");
      const data = courseMounth.data;
      setCourseMounth(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseMounth();
  }, []);

  return (
    <Container>
      <TopBar>
        <SubHeader style={{ margin: 0 }}>Dashboard</SubHeader>
      </TopBar>
      <AnalyticsContainer>
        <AnalyticsCard className="shadow">
          <h3 style={{ paddingLeft: "4%", marginBottom: "20px" }}>
            Challenge Development
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "250px",
              marginTop: "-45px",
            }}
          >
            <PieChart width={250} height={250}>
              <Pie
                data={challengeData.data}
                dataKey="count"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
                key="challenge-pie"
              />

              <Tooltip />
            </PieChart>
          </div>
        </AnalyticsCard>
        {/* <DashboardTitle>User count </DashboardTitle>
 <SubHeader style={{margin:"40px 110px"}}>{users}</SubHeader> */}
        <AnalyticsCard className="shadow">
          <h3 style={{ paddingLeft: "4%", marginBottom: "20px" }}>
            Claims Development
          </h3>
          <LineChart
            width={297}
            height={150}
            data={Array.isArray(claimData) ? claimData.sort((a, b) => a.month - b.month) : claimData}
            style={{ marginLeft: "-40px" }}
          >
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </AnalyticsCard>

        <AnalyticsCard className="shadow">
          <h3 style={{ paddingLeft: "4%", marginBottom: "20px" }}>
            Job Offer Development
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BarChart
              width={320}
              height={149}
              data={jobOfferData.sort((a, b) => a.month - b.month)}
            >
              <Bar dataKey="count" fill="#8884d8" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </div>
        </AnalyticsCard>
      </AnalyticsContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <UsersCard className="shadow">
          <h2 style={{ paddingLeft: "4%", marginBottom: "20px" }}>
            Users Banned Development
          </h2>
          <LineChart
            width={600}
            height={300}
            data={userBanner}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </UsersCard>
        <div style={{ width: "35%" }}>
          <h3>Cours Chart</h3>
          <BarChart width={430} height={380} data={courseMounth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </Container>
  );
};

export default Main;
