import { Dropdown,Popover, Button, Avatar, Text, Grid, User, StyledButton } from "@nextui-org/react";
import {  Header, UserIcon } from "./GlobalComponents";
import { NavLink,Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Badge } from "@nextui-org/react";
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-mdi-light/magnify';
import notificationIcon from '@iconify/icons-mdi-light/bell'; 
import api from "../../api/api";
import { HorizontalSeparator , P} from "./GlobalComponents";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
color:black;`;

const ProfileImg = styled.img`
  height: 2rem;
  margin: 0 1rem;
  cursor: pointer;
`;

const NotificationIcon = styled.span`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
  ;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 1px 4px;
  border-radius: 50%;
`;

const Dropdownn = styled.div`
  position: absolute;
  top: 35px;
  right: -10px;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 1rem;
  width: 340px;
  &:hover {
    display: block;
  }
`;

const NotificationList = styled.div`
  overflow-y: auto;
  max-height: 200px;
  
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => (props.read ? '#f6f6f6' : 'white')};
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
  }
`;

const NotificationIconWrapper = styled.div`
  margin-right: 0.5rem;
`;

const NotificationText = styled.div`
  flex-grow: 1;
  margin-right: 0.5rem;
`;

const NotificationDate = styled.div`
  font-size: 12px;
  color: #888;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 30px;
  padding: 0.2rem 0.7rem;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  border: none;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;

  width: 100%;
  &.focus{
    border:none;
  }
`;
 

 
 
export default function App(props) {
  const [notifications, setNotifications] = useState([]);
  const notificationsExist = notifications &&  notifications.length > 0;
  const navigate = useNavigate();
  const [isInvisible, setIsInvisible] =  useState(false);
  // onChange={(ev) => setIsInvisible(!ev.target.checked)}
  const [notificationCount, setNotificationCount] = useState('');
   
  const [showDropdown, setShowDropdown] = useState(false);
const{id}=useParams();
const location=useLocation()
const user=location.state;
  useEffect(()=>{

    api.get(`/notifications/dev/${location.state?.userID}`)
  .then(res => {console.log(res.data);
      if(res.data.status === 'success') {
       setNotifications(res.data.data);
       setNotificationCount(res.data.length) ;
      }  
  }, [])
  .catch(err => console.log(err));

  }, [location])
  const timeAgo = (t) => {
    const currentTime = new Date();
    const previousTime = new Date(t);
  
    const timeDiff = Math.abs(currentTime - previousTime); // Get the time difference in milliseconds
    const seconds = Math.floor(timeDiff / (1000 )); // Convert milliseconds to minutes
    const minutes = Math.floor(timeDiff / (1000 * 60)); // Convert milliseconds to minutes
    const hours = Math.floor(minutes / 60); // Convert minutes to hours
    const days = Math.floor(hours / 24); // Convert hours to days
  
    if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    // else{
    //   return `${seconds} seconds${seconds> 1 ? 's': '' } ago`;
    // }
  };
  
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setNotificationCount(0);
  };
  
  const markAsRead = (index) => {
    const updatedNotifications = notifications.map((n) => {
      if (index) {
        return { ...n, read: true };
      }
      return n;
    });
    setNotifications(updatedNotifications);
  };



  api.defaults.withCredentials= true;
  const handleLogout=()=>{


    api.get(`/logout`)
    .then(res=>{ 
      console.log('logged out!');
      window.location.reload();
      navigate('');
         
   } )
   .catch(err => console.log(err));
  }
  const handleRedirect = () => {
    window.location.href = 'https://discord.com/invite/GgjdvtNBRD'; // Replace with your desired external URL
  };

  const handleMenu=(k)=>{
if(k==="claims")  navigate ('/claims/new');
if(k==="logout") handleLogout();
 if (k==="account") navigate('/account')
 if(k==="community")  handleRedirect();
  }

  const handleCourse=(n)=>{
   navigate(`/instdash/courses/new/${n}`, {state:user})
  console.log("notif");
  }
  return (
    <Grid.Container alignItems="center " gap={1}>
    
    <Grid gap = {4}>
        
    <NotificationIcon onClick={toggleDropdown}>
        <Icon icon={notificationIcon}  color="white" stroke="10" fontSize={'30px'}/>
        {notificationCount > 0 && <NotificationCount>{notificationCount}</NotificationCount>}
        {showDropdown && (
          <Dropdownn style={{zIndex:"100", borderRadius:"15px", height:"300px", margin:"10px"}}>
            <h3 style={{margin:'10px'}}>Notifications</h3>
            
            <NotificationList>
              {notifications.length > 0 ? (
                notifications.map((n, index) => (
                  <Notification onClick={()=>handleCourse(n.content)} key={index} read={n.isSeen} >
                    <NotificationIconWrapper>
                      <Icon icon={notificationIcon} />
                    </NotificationIconWrapper>
                    <NotificationText>{n.title}: {JSON.parse(n.description).name}</NotificationText>
                    <NotificationDate>{timeAgo(n.date_time)}</NotificationDate>
                  </Notification>
                )).reverse()
              ) : (
                <div style={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img alt='my courses' style={{ width: "150px", margin: "auto" }} src="../images/mynotification.png" />
                  <p>No Notifications.</p>
                </div>
              )
              }
 
            </NotificationList>
          </Dropdownn>
        )}
      </NotificationIcon>
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
          <Dropdown.Menu  onAction={(key)=>handleMenu(key)}  color="none" aria-label="Avatar Actions">
            <Dropdown.Item  key="as" css={{ height: "$18" }}>
              <Text  color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text  color="inherit" css={{ d: "flex" }}>  {props.data?.email && props.data.email}
              </Text>
            </Dropdown.Item>
         
            <Dropdown.Item key="account" withDivider>Account settings</Dropdown.Item>
           
            <Dropdown.Item key="claims">Claims</Dropdown.Item>  
             <Dropdown.Item key="community"   >
              Community
            </Dropdown.Item>
            <Dropdown.Item  color="none" key="logout" withDivider>  Logout 
            </Dropdown.Item>  
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );

}
