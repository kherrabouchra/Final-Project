import React from 'react'
import HcktPrtcp from '../../components/Hackathon/dev/Participation/HcktPrtcp'

const HackathonParticipation = ({user, log}) => {
  return (
    <>
        <HcktPrtcp user={user} log={log} />
    </>
  )
}

export default HackathonParticipation