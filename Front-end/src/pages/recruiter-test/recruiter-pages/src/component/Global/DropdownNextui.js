import { Dropdown,Popover, Button, Avatar, Text, Grid, User, StyledButton } from "@nextui-org/react";
import { HorizontalSeparator, NotificationIcon, Header, UserIcon } from "./GlobalComponents";
import { NavLink,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Badge } from "@nextui-org/react";
 
export default function App(props) {
  const [notifications, setNotifications] = useState([]);
  const notificationsExist = notifications &&  notifications.length > 0;
  const navigate = useNavigate();
  const [isInvisible, setIsInvisible] =  useState(false);
  // onChange={(ev) => setIsInvisible(!ev.target.checked)}

  const handleLogout=()=>{

    axios.get(`http://localhost:3000/logout`)
    .then(res=>{ 
      navigate('/');
      console.log('logged out!');
   } )
   .catch(err => console.log(err));
  }
  return (
    <Grid.Container alignItems="center " gap={1}>
    
    <Grid gap = {4}>
        
           
          <Popover>  
      <Popover.Trigger>
        
      <Badge color="error"
          content={5} 
          isInvisible={isInvisible}
          shape="circle">
        <Avatar  
               
              size="md"
              icon={<NotificationIcon color={"white"} />}
              color="0"
           bordered="false" 
               pointer="true"
             /></Badge>
      </Popover.Trigger>
      <Popover.Content css={{ p: "$6", size:"300px" , marginRight:"8%"}}>
        <h2 style={{ padding: "8px" }} >Notifications</h2>
        <HorizontalSeparator/> <Text css={{p: "$20"}}>No notifications.</Text>
       
      </Popover.Content>
    </Popover>
          {/* <Dropdown.Menu color="primary" aria-label="Avatar Actions">
  <Dropdown.Item  command="Notifications" description="Notifications"  >
           <Text>Notifications</Text></Dropdown.Item> 
           
            {notificationsExist? <Dropdown.Item withDivider></Dropdown.Item>: <Dropdown.Item withDivider></Dropdown.Item>}
             
            </Dropdown.Menu> */}
        
      </Grid>
      <Grid gap = {4} >
        <Dropdown   placement="bottom-left">
          <Dropdown.Trigger>
            <Avatar sx={{color:"black"}}
       bordered="false" 
       pointer="true"
       color="0"
              size="md"
              icon={<UserIcon color={"white"}/>}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu   color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text  color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text  color="inherit" css={{ d: "flex" }}>  {props.data?.email && props.data.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider >
              My Settings
            </Dropdown.Item>
           
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item  color="none" withDivider><Button onClick={handleLogout} color="secondary" size= 'md'> Logout</Button>
            </Dropdown.Item>  
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );

}
