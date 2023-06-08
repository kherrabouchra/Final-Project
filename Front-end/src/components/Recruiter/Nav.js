import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-mdi-light/magnify';
import notificationIcon from '@iconify/icons-mdi-light/bell';
import DropdownNextui  from '../Global/DropdownNextui'
import axios from 'axios';
import api from'../../api/api'
import { HorizontalSeparator, P } from '../Global/GlobalComponents';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  background-color: rgb(21 21 21);

  color: white;

`;

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
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -12px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 50%;
`;

const Dropdown = styled.div`
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
  border-radius:10px;
  
`;

const Notification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => (props.read ? '#f6f6f6' : 'white')};
  cursor: pointer; color:black;
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
  background-color: rgb(21 21 21); 
  border: 2px solid #ccc;
  border-radius: 30px;
  padding: 0.2rem 0.7rem;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  border: none;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(21 21 21);
  
  width: 100%;
  &.focus{
    border:none;
  }
`;

const Nav = () => {
  const [notificationCount, setNotificationCount] = useState('');
  const [notifications, setNotifications] = useState('')
   
  const [showDropdown, setShowDropdown] = useState(false);
   const location=useLocation()
 
  useEffect(()=>{

    api.get(`/notifications/${location.state.userID}`)
  .then(res => {
      if(res.data.status === 'success') {
       setNotifications(res.data.data);
       setNotificationCount(res.data.length) ;
      }  
  }, [showDropdown])
  .catch(err => console.log(err));

  })
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
  return (
    <Container>
      <SearchBar>
        <Icon icon={searchIcon} />
        <SearchInput type="text" placeholder="Search" style={{borderRadius: '30px'}} />
      </SearchBar>
      <NotificationIcon onClick={toggleDropdown}>
        <Icon icon={notificationIcon}  fontSize={'24px'}/>
        {notificationCount > 0 && <NotificationCount>{notificationCount}</NotificationCount>}
        {showDropdown && (
          <Dropdown style={{zIndex:"100", borderRadius:"15px", height:"300px", margin:"10px"}}>
            <h3 style={{margin:'10px', color:'black'}}>Notifications</h3>
            
            <NotificationList>
              {notifications.length > 0 ? (
                notifications.map((n, index) => (
                  <Notification key={index} read={n.isSeen} onClick={() => markAsRead(index)}>
                    <NotificationIconWrapper>
                      <Icon icon={notificationIcon} />
                    </NotificationIconWrapper>
                    <NotificationText>{n.title} {n.name}</NotificationText>
                    <NotificationDate>{timeAgo(n.date_time)}</NotificationDate>
                  </Notification>
                ))
              ) : (
                <div style={{ margin: "auto", display: "flex", flexDirection: "column", alignItems: "center" , color:'black'}}>
                  <img alt='my courses' style={{ width: "150px", margin: "auto" }} src="../images/mynotification.png" />
                  <p>No Notifications.</p>
                </div>
              )
              }
 
            </NotificationList>
          </Dropdown>
        )}
      </NotificationIcon>
    </Container>
  );
};

export default Nav;
