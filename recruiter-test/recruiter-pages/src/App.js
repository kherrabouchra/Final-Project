import React from 'react'
import CreateInterview from './pages/createInterview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateJobeOffer from './component/CreateJobeOffer';

import DetaillsChallenge from './component/DetaillsChallenge';
import DashboardRuc from './pages/DashboardRuc';

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
       <Route exact path="/Details" element={<DetaillsChallenge/>} />
       <Route exact path="/CreateInterview" element={<CreateInterview />} />
       <Route exact path="/CreateJobe" element={<CreateJobeOffer/>} />
       <Route exact path="/Dashboard" element={<DashboardRuc/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
