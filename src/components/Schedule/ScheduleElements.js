import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, TextField } from '@material-ui/core';
import { Popover, Button, Box } from '@mantine/core';
import { Input, Spacer, Text } from "@nextui-org/react";
import { Table, Grid, Radio } from "@nextui-org/react";
import { ColorInput } from '@mantine/core';
 import {BlackBtn, P, PurpleBtn, SubHeader, TextSub, WhiteBtn} from '../Global/GlobalComponents'
 import BasicDateCalendar from './SideCalendar';
import dayjs from 'dayjs';
 
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Dropdown } from "@nextui-org/react";
 import api from '../../api/api';
import { FlatTree } from 'framer-motion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

 

  const columns = [
    {
      key: "username",
      label: "Evaluator(s)",
    },
     
  ];
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
 
const localizer = momentLocalizer(moment);

const Demo = (props) => {const capitalize = (str) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };
  const [value, setValue] =  useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selected, setSelected] = useState("Challenge");
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

   
  const [selectedColor, setSelectedColor] =  useState("primary");
  const colors = ["primary", "secondary", "success", "warning", "error"];
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [color, setColor] = useState('');
  const [evaluator, setEvaluator] = useState(''); 
  const [data, setData]= useState('');
   const[currentDate, setCurrentDate]= useState( dayjs(new Date())) 
  const [schedule, setSchedule]= useState('')
  const [edit , setEdit]= useState(false)
  const [error, setError]= useState('');
  const [notifications, setNotifications]= useState('');
  const [instructors, setInstructors]= useState('');
  useEffect(()=>{
    api.get('/notifications/90')
    .then(res => {
        if(res.data.status === 'success') {
         setNotifications(res.data.data) ;
        }  
    }, [])
    .catch(err => console.log(err));
   api.get('/instructor')
      .then(res => {
          if(res.data.status === 'success') {
           setInstructors(res.data.data) 
           console.log(res.data.data);
          }  
      })
      .catch(err => console.log(err));
    
    }, [open])

  const handleDateSelect = ({ start, end }) => {
    setOpen(true);
    setDate(moment(start).format('YYYY-MM-DD'));
    setEndDate(moment(end).format('YYYY-MM-DD'));
    setStartTime(moment(start).format('HH:mm'));
    setEndTime(moment(end).format('HH:mm'));
  };

  const handleEventSelect = (event) => {
    setOpen(true);
    setName(event.title);
    setStartTime(moment(event.start).format('HH:mm'));
    setEndTime(moment(event.end).format('HH:mm'));
    setDate(moment(event.start).format('YYYY-MM-DD'));
    setColor(event.color);
    setEvaluator(event.evaluator);
  };


  
useEffect(()=>{
   
  api.get(`/schedule?date=${currentDate.format('YYYY-MM-DD')}`)
    .then( 
    (res=>{
      if(res.data.status === 'success') {
        setSchedule(res.data.data) 
    }})
    )
    .catch(err => console.log(err));

  }, [currentDate,data]
)





const fetchUpdate= () => {
  // Send API request after setting the data
  api
    .put('/schedule', data)
    .then((res) => {
      if (res.data.status === 'success') {
    console.log(res.data.message); 
    
 

        setData('');
        setEdit(false);
  setDate(' ') ;
  setEndDate('');
  setStartTime('');
    // Delay of 1000 milliseconds (adjust as needed)
    setEndTime('');
        // setSchedule(res.data.result) 
        // console.log(schedule);
      }
    })
    .catch((err) => console.log(err));
}
const handleUpdate = (s) => { 
  setData({ ...data, s: s, date: date, enddate: enddate, startTime: startTime, endTime: endTime });
  
  fetchUpdate();
  // Delay of 1000 milliseconds (adjust as needed)

};


const checkFields =()=>{
  
  if (!data.name) {
    setError("Please select a challenge");
    return false;
  }if (!data.date) {
    setError("Please select start date");
    return false;
  }if (!data.start) {
    setError("Please select start time");
    return false;
  }if (!data.endDate) {
    setError("Please select end date ");
    return false;
  }
  if (!data.end) {
    setError("Please select end time");
    return false;
  }if (!data.evaluator) {
    setError("Please select evaluator");
    return false;
  } if (data.date>data.endDate){
    setError('start time should not be after end time')
    return false;
  }
  
  setError("");
  return true;
}


  const handleSubmit = () => {
     
  
    setData({...data, name: name, 
    start: startTime,
  end: endTime,
   date: date, 
  endDate: enddate ,
   evaluator: evaluator, }) 
  

    if(!checkFields())
    {return;}
 
    api.post('/schedule', data)
    .then(res => {
      console.log(res.data);
      if(res.data.status === 'success') {
     console.log("schedule added !");  
    console.log(open); 
    setOpen(false); 

    }  
  }).catch(err => console.log(err));
 
 
  
  };
 // Define custom event styles
const eventStyleGetter = (event, start, end, isSelected) => {
  const backgroundColor = event.color; // Specify the color property on your event object
  const style = {
    backgroundColor,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'white',
    border: 'black solid 2px', 
    // You can add more styles as per your requirements
  }} 
  const handleSelectionChange = (selectedKeys ) => {
    setSelected(selectedKeys);
    
    setName(notifications[selectedKeys.currentKey].name ); // Update the name state with the selected item's name, or set it to an empty string if no item is selected
  };

const handleSelection=(selectedKeys)=>{
  setEvaluator(selectedKeys.currentKey)
  
} 

 
    console.log(data, data.name);

 console.log(open);

  return (

     
    <div style={{display:'flex' , background:'white', height:'600px', 
     backgroundColor:'#fafafa',flexDirection:"column", alignItems:"flex-end", margin:"0px 40px"}}>

      <SubHeader style={{padding:"0 80px", margin:"0 -60px"}} >Schedule</SubHeader>
       <Popover opened={open}   withArrow radius={25}  onClose={() => {
           setSelected(new Set([" challenge "]));
           setName('');
           setDate('');
           setEndDate('');
           setStartTime('');
           setEndTime('');
           setEvaluator('');
            setData('');   
            setError('');
           }}>
      <Popover.Target    >
        <WhiteBtn style={{margin:" 10px 40px"}} onClick={()=>setOpen(!open)} >+ Add schedule</WhiteBtn>
      </Popover.Target>

      <Popover.Dropdown  className='shadow'>
    
        <Box  sx={{width:"350px", display:'flex', flexDirection:'column', padding:'20px'}}>
        
         <Dropdown> 
         
      <Dropdown.Button  color="none" bordered css={{ tt: "capitalize" }}>
       select a challenge 
      </Dropdown.Button>
      <Dropdown.Menu  css={{width:'100%'}}
        aria-label="Single selection actions"
        color="none"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={handleSelectionChange}
      >

        {notifications  ? notifications.map((n, index)=>{
        return (<Dropdown.Item   key={index}>{n.name}</Dropdown.Item>) }): ( <Dropdown.Item key='1'>
          <P>No challenge available.</P></Dropdown.Item>)} 
      </Dropdown.Menu>
    </Dropdown>
         
         
      
          {/* <TextField
            label="Start Time"
           
          /> */}

        <div style={{display:'flex', justifyContent:'space-between' , margin:'20PX 0 '}}>
             <Text>start</Text> 
             <Input  bordered
          
          type="date"      value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input bordered
         
          type="time"  value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
        /></div>
        <div style={{display:'flex', justifyContent:'space-between', margin:'20PX 0'}}>
        <Text>End</Text>

        <Input 
        bordered
          type="date"  value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
        /><Input 
        bordered
        type="time" value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
      /> 
      </div> 
           <Grid.Container gap={2}>
      <Grid xs={12}>
        <Table
          aria-label="Example dynamic collection table with color selection"
          color="primary"
          selectionMode="multiple"
          defaultSelectedKeys={' '}
          onSelectionChange={handleSelection}
     

          containerCss={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={instructors}>
            {(item) => (
              <Table.Row key={item.userID}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </Grid.Container>
    {error && <span  style={{width:'100%', margin:0}} className='errmsg'>{error}</span>}
   
          <BlackBtn  style={{width:'50%', margin:'auto'}} onClick={handleSubmit} type="submit">Save</BlackBtn>
          </Box> 
      </Popover.Dropdown>
    </Popover> 
     <div className='shadow' style={{  margin:'auto 40px auto auto', borderRadius:"20px", height:"100%",
     display:'flex', padding: "90px", alignItems:"flex-start"}}>
    <BasicDateCalendar currentDate={currentDate} setCurrentDate={setCurrentDate}  edit={edit} setEdit={setEdit}/>
    <div style={{  }}>
   
    <div style={{ height: '43vh', width:'30vw', display:"flex", flexDirection:"column", alignItems:'center' }}>
    <SubHeader style={{margin:'O', padding:0}}>
  {currentDate.isSame(dayjs(), 'day')
    ? 'Today'
    : currentDate.isSame(dayjs().subtract(1, 'day'), 'day')
    ? 'Yesterday'
    : currentDate.isSame(dayjs().add(1, 'day'), 'day')
    ? 'Tomorrow'
    : currentDate.format('DD/MM/YYYY')}
</SubHeader>

      <Box 
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 324, gap:24, alignItems: 'space-between',  justifyContent:'center'}}
    > {schedule.length !==0 &&
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
   
      {schedule.length && schedule.map((s,index)=>{
      
        return ( <Tab label={s.name} {...a11yProps(index)} />)
     
      })}


         

      </Tabs>
 }


 

      {schedule.length ? schedule.map((s,index)=>{
     
          
        const startDate = dayjs(s.startDate).format('DD/MM/YYYY');

        const endDate = dayjs(s.endDate).format('DD/MM/YYYY');
        return(
<TabPanel value={value} index={index}>
   
 { !edit ? ( <><Text>Starts: {startDate}</Text>
  <Text> at: {s.start}</Text>

  <Text>Ends: {endDate} </Text>
  <Text> at: {s.end}</Text>

  <BlackBtn onClick={()=>setEdit(true)} style={{margin:'60% 0% 0% auto', width:'170Px'}}>Edit</BlackBtn>

     </> ):(<>
        <Text>Start</Text>
          
      <div style={{display:'flex', justifyContent:'space-between', margin:'auto'}}>
     
          <Input  bordered
           size='sm'
          
          type="date"      value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
        <Input bordered
           size='sm' 
          type="time"  value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
        /></div>
        <Text>End</Text>
        <div style={{display:'flex', justifyContent:'space-between', margin:'auto'}}>

        <Input 
           size='sm'
           bordered   
          
          type="date"  value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
        /><Input 
           size='sm'
           bordered  
        type="time" value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
      /> 
      </div>
    
      <BlackBtn onClick={()=> handleUpdate(s)} style={{margin:"40px "}}>Save   
       </BlackBtn></>)}
     </TabPanel> )})
      :( <div style={{display:'flex', flexDirection:'column' , alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
        <img style={{width:'200px'}} src='../images/calendar.png' alt='no schedule'/> <P>No schedule available.</P></div> )}
  

     
      
    </Box>
      </div>
      
      </div>
      
     </div>
  </div>
  );
};

export default Demo;






// export const DayCalendar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({});

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewEvent({ ...newEvent, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Add logic to save new event to database or state
//     handleCloseModal();
//   };

//   const events = [
//     {
//       start: moment().toDate(),
//       end: moment().add(2, "hours").toDate(),
//       title: "Example Event",
//     },
//   ];

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleOpenModal}>
//         Add
//       </Button>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         views={{ day: true }}
//         style={{ height: "100vh" }}
//       />
//       <Modal open={showModal} onClose={handleCloseModal}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Name"
//             name="title"
//             value={newEvent.title || ""}
//             onChange={handleInputChange}
//           />
//           <br />
//           <TextField
//             label="Start Time"
//             name="start"
//             type="datetime-local"
//             value={newEvent.start || ""}
//             onChange={handleInputChange}
//           />
//           <br />
//           <TextField
//             label="End Time"
//             name="end"
//             type="datetime-local"
//             value={newEvent.end || ""}
//             onChange={handleInputChange}
//           />
//           <br />
//           <Button type="submit" variant="contained" color="primary">
//             Save
//           </Button>
//         </form>
//       </Modal>
//     </div>
//   );
// };
 
