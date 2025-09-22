import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import IndustryPortal from './components/portals/IndustryPortal';
import ApplicantPortal from './components/portals/ApplicantPortal';
import GovernmentPortal from './components/portals/GovernmentPortal';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/applicant-portal" element={<ApplicantPortal />} />
       
          <Route path="/industry-portal" element={<IndustryPortal />} />
          <Route path="/government-portal" element={<GovernmentPortal />} />
        
      </Routes>
    </Router>
  );
}

export default App;