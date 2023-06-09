import React from 'react'
import { NavBarDev } from '../../components/NavBar/index-2'
import Leaderboard from '../../components/Admin/containers/LeaderBoard'
import { useLocation } from 'react-router-dom'

const LeaderboardPage = () => {

    const loc=useLocation();
const user= loc.state;
console.log(user);
  return (
    <div>
        <NavBarDev /> 
         <Leaderboard></Leaderboard>
    </div>
  )
}

export default LeaderboardPage
