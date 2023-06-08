import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Button, Select } from "antd";
import api from '../../../api/api';
import axios from "axios";
import { P, SubHeader, WhiteBtn } from "../../Global/GlobalComponents";
import { useNavigate } from "react-router-dom";

 
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Dropdown, Textarea } from "@nextui-org/react";
import { Modal, Text, Input, Row, Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";

 const { Option } = Select; 


const TableContainer = styled.div`
  width: 70%;
  margin: 0 5% 0 25%;
  border-radius:10px;
  margin-top: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content:  flex-end;
  align-items: center;
  
  margin-bottom: 20px;
  margin-right: 5%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colorGrayLight};
`;

const UserManageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 550;
  margin-left: 300px;
`;

const Claims = () => { 
    const[denied,setDenied]=useState("")
  const [claims, setClaims] = useState(null);
  const navigate = useNavigate(); 
   
const [data,setData]=useState({
    recipientID:'', 
    creationDate: '',
    title: 'new course creation request',
      content:''}

)
const [selectedInst, setSelectedInst]=useState('');
const [courseinfo, setCourseinfo] = useState({
    name:'', content:''
});


  const handleDeny =(id)=>{
console.log("fd");
    api.post(`/claims/deny/${id}`)
    .then((res)=>{
      if(res.data.status==='success'){
        console.log(res.data.message);
        setDenied(true)
      }
    }).catch((err)=>console.log(err))
  }
    const columns = [
      {
        title: "Claim",
        dataIndex: "content",
        key: "claim",
        
      },
       
      {
        title: "Date of creation",
        dataIndex: "creationDate",
        key: "creationDate",
      },
      {
        title: "User",
        dataIndex: "username",
        key: "user",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <> 
            <Button type="link" onClick={()=>navigate(`/claims/${record.claimID}`)}>View</Button>

            <Button type="link" danger value="action" onClick={()=>handleDeny(record.claimID)}>
              Deny
            </Button>
          </>
        ),
      },
    ];
  
	useEffect(( ) => { 
		 
	 	api.get('/claims')
		.then(res => {
      setClaims(res.data.data) ;
    })
		.catch(err => console.log(err));

		 

	},[]) 

    
     
     
   
  return (
    <div>
      <TopBar>
        <SubHeader style={{marginLeft:"22%"}}>Claim Management</SubHeader>
      </TopBar>

      <FilterContainer>

   
      </FilterContainer>
      <TableContainer>
        <Table dataSource={claims} columns={columns} rowKey="claimID"   rowClassName={ denied && "denied"}/>
      </TableContainer>
    </div>
  );
};

export default Claims;
