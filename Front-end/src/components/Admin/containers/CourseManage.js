import React, { Children, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Button, Select } from "antd";
import api from '../../../api/api';
import axios from "axios";
import { BlackBtn, Header, P, PinkBtn, SubHeader, VerticalSeparator, WhiteBtn, WhiteBtn2 } from "../../Global/GlobalComponents";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
 import { CheckBox } from "../../Global/GlobalComponents";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Dropdown, Grid, Textarea } from "@nextui-org/react";
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
  font-weight: 450;
  margin-top:20px;
  margin-left: 350px;
`;

const Coursemanage = () => {
    const [selected,setSelected]=useState('');
    const[paths,setPaths]=useState("")
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate(); 
  const [instructors, setInstructors]=useState('')
const [data,setData]=useState({
    recipientID:'', 
    creationDate: '',
    title: 'New course creation request',
      content:''}

)
     const [visible, setVisible] = React.useState(false);
  const [success, setsuccess]=useState('')
const [selectedInst, setSelectedInst]=useState('');
const [courseinfo, setCourseinfo] = useState({
    name:'', description:'', points:'',content:[]
});const [edit , setEdit]= useState('')
const[editable, setEditable]= useState('')
const[error, setError]= useState('')


useEffect(( ) => { 
		 
  api.get('/courses')
 .then(res => { 
   if(res.data.status==="success"){
   setCourses(res.data.data) 
   console.log(courses);
   }
 })
 .catch(err => console.log(err));

  
  api.get('/paths')
      .then(res => {console.log(res.data.data);
    setPaths(res.data.data) 
   paths.map((p, index) => {
    api.get(`/paths/${p.learningPathID}/badge`)
      .then((res) => {
  
        if (res.data.status === 'success') {
          paths[index].badgeColor = res.data.data[0].color;
          setPaths([...paths]); // Update the state with the modified array
        }
      })
      .catch((err) => console.log(err));
  });
  
   

  })
  api.get('/instructor')
  .then(res => {console.log(res.data);
setInstructors(res.data.data) 
console.log(instructors);

})
      .catch(err => console.log(err));
},[]) 


  console.log(courseinfo);

  const handleDelete=(id)=>{
    
	 	api.delete(`/courses/${id}`)
     .then(res => { console.log(res.data);
       if(res.data.status="success"){ 
      console.log(res.data.message);}
     })
     .catch(err => console.log(err));
  
  }

  const handleDeletePath=(id)=>{
    
    api.delete(`/paths/${id}`)
    .then(res => { console.log(res.data);
      if(res.data.status="success"){ 
     console.log(res.data.message);
    
    
    }
    })
    .catch(err => console.log(err));
 
 }

  const handleSelectionChange = (selectedKeys) => {
    setSelected(selectedKeys);
    
    setData({ ...data, recipientID: selectedKeys.currentKey });
  
    const selectedInstructors = instructors.filter((instructor) => instructor.userID === selectedKeys.currentKey);
    const selectedInstructor = selectedInstructors.length > 0 ? selectedInstructors[0] : null;
    setSelectedInst(selectedInstructor ? selectedInstructor.username : '');
  
    console.log(data, selectedInst, selectedKeys.currentKey,selectedInstructors);
  };
  
  
  const columns = [
    {
      title: "Course",
      dataIndex: "name",
      key: "course",
    },
     
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Instructor",
      dataIndex: "instructorID",
      key: "instructor",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <> 
          <Button type="link" onClick={()=>handleEdit(record.courseID)}>Edit</Button>

          <Button type="link" danger value="action" onClick={()=>handleDelete(record.courseID)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  const columns2 = [
    {
      title: "Learning path",
      dataIndex: "name",
      key: "path",
    },
     
    
    {
      title: "Badge",
      dataIndex: "badgeColor",
      key: "badge",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <> 
          <Button type="link" onClick={()=>handleEdit(record.courseID)}>Edit</Button>

          <Button type="link" danger value="action" onClick={()=>handleDelete(record.courseID)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

    const [chapterNames, setChapterNames]=useState('')


    const handleEdit=(id)=>{
const c = courses.filter((course) => course.courseID === id);
setEditable(c[0]);
 
setEdit(true);
   
      
console.log(edit, c, editable);
    }
  

    
      const closeHandler = () => {
       
       if (visible){
        setVisible(false);
        console.log("closed");
        setData('');
        setsuccess(false)

        setCourseinfo({
          name:'', content:[]
        })
        setSelected('')
        setError('')
        setChapterNames('')
       } 
       if(edit){
        setEdit(false);
       }
      };
    


      const checkFields = () => {
        if(  !data.content ||
           !data.recipientID){   setError("Please fill all the required fields");
           return false;}
         else{return true;}}
  
         

         useEffect(()=>{
          console.log(chapterNames);
    setCourseinfo({...courseinfo, content:chapterNames})
      
         setData(
       {  ...data, 
       content: JSON.stringify(courseinfo),   
     }  )  

         },[chapterNames])
     
         
  const handlecreate=(event)=>{
     
  event.preventDefault();
    
     if(!checkFields()){return;} 
  api.post('/courses', {name: courseinfo.name, description:courseinfo.description, points: courseinfo.points, instructorID: data.recipientID})
  .then( (result)=>{ console.log(result.data);
    if(result.data.status=== 'success'){
      console.log(result.data.message);


      api.post('/notifications', {data: data, id: result.data.courseID} )
   .then( (res)=>{ console.log(res.data);
    if(res.data.status=== 'success'){
        console.log(res.data.message);
    }}
   )
   .catch(err=>console.log(err));
  

   api.post('/courses/chapters/create', { chapterNames:chapterNames, courseID:result.data.courseID} )
   .then( (res)=>{ console.log(res.data);
    if(res.data.status=== 'success'){
        console.log(res.data.message);
    }}
   )
   .catch(err=>console.log(err));

    setsuccess(true);

  }})

   .catch(error=>console.log(error));
    
    }

const handleupdate=()=>{
  api.put('/notifications', courseinfo)
  .then((res)=>{
    if(res.data.status==="success"){

      console.log(res.data);
    }
  })
}

  const handlecourse=()=>{
    setVisible(true)
  } 

  const addChapter = () => {
    setChapterNames((prevChapterName) => [...prevChapterName, ""]);
  };

  const handleChapterNameChange = (index, event) => {
    const newChapterName = [...chapterNames];
    newChapterName[index] = event.target.value;
    setChapterNames(newChapterName);
  };


  const handlepath =()=>{
    navigate('/Course-management/learning_path')
  }

  return (
    <div>
      <TopBar>
        <SubHeader style={{marginLeft:'20%'}}>Course Management</SubHeader>
      </TopBar>

      <FilterContainer>

       
      <WhiteBtn onClick={handlecourse} >Create course</WhiteBtn>
      <WhiteBtn onClick={handlepath} >Create learning path</WhiteBtn>
      </FilterContainer>
      <div    style={{  width: '1000px' }}  > 
           
          <Modal
            closeButton 
            aria-labelledby="modal-title" width="800px" 
            open={visible}
            onClose={closeHandler}    
       
          >


            {!success ? <>  <Modal.Header>
              <Text id="modal-title" size={18}>
            
                <Text b size={18}>
                 New course
                </Text>
              </Text>
            </Modal.Header>
        <Modal.Body> 
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <div style={{margin:'30px'}}>
              <Grid.Container gap={1}>
              <Grid >
            <Input value={courseinfo.name} onChange={(e)=>setCourseinfo({...courseinfo, name:e.target.value})}
             bordered label="Name:"></Input> 
                  </Grid>
             <Grid ><Input value={courseinfo.points} onChange={(e)=>setCourseinfo({...courseinfo, points:e.target.value})}
             bordered type="number"  label="Points:"></Input></Grid>
            </Grid.Container>

            <Textarea fullwidth value={courseinfo.description}  style={{width:'200%'}}  onChange={(e)=>setCourseinfo({...courseinfo, description:e.target.value})}
             bordered label="Description:"/>
               <Text for='inst'> instructor: </Text>


<Dropdown > 

<Dropdown.Button color="none" bordered css={{ tt: "capitalize" , width:"100%"}}>
  { selected && selectedInst} 
</Dropdown.Button>
<Dropdown.Menu  css={{width:'100%'}}
  aria-label="Single selection actions"
  color="none" name='inst'
  disallowEmptySelection
  selectionMode="single" 
  selectedKeys={selected}
  onSelectionChange={handleSelectionChange}
>

{instructors  && 
  instructors.map((n)=>{
  return (<Dropdown.Item  key={n.userID}>{n.username}</Dropdown.Item>) }) } 
</Dropdown.Menu>
</Dropdown>
                </div>
            <VerticalSeparator/>
            <div style={{margin:'auto'}}><div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  {chapterNames.length !== 0 && (
                    <BlackBtn onClick={() => setChapterNames([])}>reset</BlackBtn>
                  )}
                  {chapterNames.length === 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column", 
                      }}
                    >
                      <h3 style={{ color: "#F989E6", margin: "0px" }}>
                        Click to add a chapter.
                      </h3>
                    </div>
                  )}
                  <BlackBtn onClick={addChapter}>+ Chapter</BlackBtn>
                </div>

                {chapterNames && chapterNames.map((chapterName, index) => (
                    <div key={index}> 
                      <Input
                        fullWidth bordered  label={`Chapter: ${index + 1}`}
                        id={`chaptername-${index}`}
                        onChange={(event) =>
                          handleChapterNameChange(index, event)
                        }
                        value={chapterName} 
                      />
                    </div>
               
                  ))}        </div></div>

      
        </Modal.Body>
        {error && <div className="errmsg"> {error}</div>}
            <Modal.Footer>
              <WhiteBtn2 auto flat color="error" onClick={()=>closeHandler}>
                Close
              </WhiteBtn2>
              <PinkBtn  onClick={(e)=>handlecreate(e)}>
               Create
              </PinkBtn>
            </Modal.Footer></>:
            <>
            <Modal.Body>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', paddin:"20px"}}>
       
       <SubHeader>Course created successfully !</SubHeader>
       <CheckBox></CheckBox> 
       </div>
              </Modal.Body></>}
          
          </Modal>
        </div>

        <div>
           
           <Modal
             closeButton
             aria-labelledby="modal-title"
             open={edit}
             onClose={closeHandler}
           >
             <Modal.Header>
               <Text id="modal-title" size={18}>
             
                 <Text b size={18}>
                  Edit course
                 </Text>
               </Text>
             </Modal.Header>
         <Modal.Body> 
             <Input    clearable placeholder={editable.name} value={courseinfo.name} onChange={(e)=>setCourseinfo({...courseinfo, name:e.target.value})}
              bordered label="Course name:"></Input>
             
            
             <Textarea  bordered value={courseinfo.content}  
             onChange={(e)=>setCourseinfo({...courseinfo, content:e.target.value})} 
             label="Syllabus:"/> 
 
         <Text for='inst'> instructor: </Text>
 
 
          <Dropdown > 
          
          <Dropdown.Button color="none" bordered css={{ tt: "capitalize" }}>
            { selected && selectedInst} 
          </Dropdown.Button>
          <Dropdown.Menu  css={{width:'100%'}} initialValue={editable.evaluators}
            aria-label="Single selection actions"
            color="none" name='inst'
            disallowEmptySelection 
            selectionMode="single"
            selectedKeys={selected}
            onSelectionChange={handleSelectionChange}
          >
    
    {instructors  && 
            instructors.map((n)=>{
            return (<Dropdown.Item  key={n.userID}>{n.username}</Dropdown.Item>) }) } 
          </Dropdown.Menu>
        </Dropdown>
         </Modal.Body>
        {error && <div className="errmsg"> {error}</div>}

             <Modal.Footer>
               <WhiteBtn2 auto flat color="error" onClick={()=>closeHandler}>
                 Close
               </WhiteBtn2>
               <PinkBtn   auto onClick={handleupdate}>
                Edit
               </PinkBtn>
             </Modal.Footer>
           </Modal>
         </div>

      <UserManageTitle>All courses:</UserManageTitle>
      {courses &&
      <TableContainer>
        <Table dataSource={courses} columns={columns} rowKey="courseID"/>
      </TableContainer>
 }

 
      <UserManageTitle>All learning paths:</UserManageTitle>
      {paths &&
      <TableContainer>
        <Table dataSource={paths} columns={columns2} rowKey="learningPathID"/>
      </TableContainer>
 }
    </div>
  );
};

export default Coursemanage;
