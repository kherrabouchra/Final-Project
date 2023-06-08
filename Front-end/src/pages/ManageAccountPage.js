import React from 'react'
import AccountSettings from '../components/ProfileManagement/index'
import { NavBarDev } from '../components/NavBar/index-2'
import { Banner } from '../components/Global/GlobalComponents'

const ManageAccountPage = () => {
  return (
    <div>
        <NavBarDev />
      <AccountSettings/>
    </div>
  )
}

export default ManageAccountPage
