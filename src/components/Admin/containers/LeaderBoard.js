import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { CourseTitle, Header } from "../../Course/Details/CourseElements";
import { DashboardContainer } from "../../Dashboard/DashboardElements";

const LeaderboardWrapper = styled.div`
  width: 80%;
  border: 1px solid black;
  padding:10px;
  border-radius:30px;
  paddin:10px;
  left:10%; right:10%;
  top:120Px;
  position:absolute;
`;
 

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from API or database
    // and set it to users state
    setUsers([
      { id: 1, name: "John Doe", score: 500 },
      { id: 2, name: "Jane Doe", score: 450 },
      { id: 3, name: "Bob Smith", score: 400 },
      { id: 4, name: "Alice Johnson", score: 350 },
      { id: 5, name: "Mike Jackson", score: 300 },
    ]);
  }, []);


  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.score >= 450 ? <StarFilled style={{ color: 'gold', marginRight: 5 }} /> : null}
          {record.score >= 350 ? <StarOutlined style={{ color: 'silver', marginRight: 5 }} /> : null}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  const dataSource = users.map(user => ({
    key: user.id,
    name: user.name,
    score: user.score,
  }));

  return (
    <div style={{background:'black',}} >
      <div style={{display:'flex',justifyContent:'space-between', alignItems:'center', width:'80%', left:'15%', position:'absolute', zIndex:100,}}> 
      <CourseTitle color={'white'} title="LeaderBoard"></CourseTitle>
        <img src="../images/leaderboard.png"/></div>
       <div style={{height:"200px"}}></div>
        <DashboardContainer style={{margin:'0 auto',top:"150px"}}>
          <div style={{position:'relative', width:"100%", height:"100%",
             
            }}>
    <LeaderboardWrapper>
      
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </LeaderboardWrapper></div></DashboardContainer>
    </div>
  );
};

export default Leaderboard;
