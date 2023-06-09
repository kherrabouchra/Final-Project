import React from 'react'
import { NavBarDev2 } from '../../components/NavBar/index-3'
import JobsDetails from '../../components/Job/JobsDetails/JobsDetails'
import Footer from '../../components/Footer'
import { UserProvider } from '../../hooks/userContext'
// import { useParams } from 'react-router-dom'
// import { useState , useEffect} from 'react'
// import api from '../../api/api'
// import axios from 'axios'

const JobsDetailsPage = ({ data }) => {

    return (
        <UserProvider>
            <NavBarDev2 data={data} />
            <JobsDetails />
            <Footer />
        </UserProvider>
    )
}

export default JobsDetailsPage
