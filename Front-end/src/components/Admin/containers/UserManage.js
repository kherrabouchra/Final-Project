import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Button, Select } from "antd";
import api from '../../../api/api';
import axios from "axios";
import { SubHeader, WhiteBtn } from "../../Global/GlobalComponents";
import { useNavigate } from "react-router-dom";
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

const Usermanage = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate(); 
  const [deleted, setDeleted]=useState('')

  const handleDelete=(id)=>{
    
	 	api.delete(`/user/${id}`)
     .then(res => {
       if(res.data.status="success"){
        setDeleted(id);
      console.log(res.data.message);}
     })
     .catch(err => console.log(err));
  
  }


    const columns = [
      {
        title: "username",
        dataIndex: "username",
        key: "username",
      },
       
      {
        title: "email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "user",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <> 
            <Button type="link" danger value="action" onClick={()=>handleDelete(record.userID)}>
              Delete
            </Button>
            <Button type="link">Ban</Button>
          </>
        ),
      },
    ];
  
	useEffect(( ) => { 
		 
	 	api.get('/user')
		.then(res => {
      setUsers(res.data.data) 
    })
		.catch(err => console.log(err));
	},[deleted])
  const [filterRole, setFilterRole] = useState("all");

  const handleFilterChange = (value) => {
    setFilterRole(value);
  };
  const handlesignup=()=>{
   navigate('/User-management/Create-account');
  }
  const filteredData = filterRole === "all" ? users : users.filter((item) => item.role === filterRole);
  return (
    <div>
      <TopBar>
        <SubHeader style={{marginLeft:'20%'}}>User Management</SubHeader>
      </TopBar>

      <FilterContainer>
      <WhiteBtn onClick={handlesignup} >Create account</WhiteBtn>

        <Select style={{ width: 200}} defaultValue="all" onChange={handleFilterChange}>
          <Option value="all">All</Option>
          <Option value="developer">Developer</Option>
          <Option value="instructor">Instructor</Option>
          <Option value="recruiter">Company Recruiter</Option>
        </Select>

      </FilterContainer>
      <TableContainer>
        <Table dataSource={filteredData} columns={columns} rowKey="userID"/>
      </TableContainer>
    </div>
  );
};

export default Usermanage;
