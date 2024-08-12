import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate,Link } from 'react-router-dom';
// import Home from './components/Home';
// import AdminDashboard from './components/AdminDashboard';
import AdminDashboard from './Component/AdminDashBoard';
import Home from './Component/Home';
import axios from 'axios';
import styled from 'styled-components';

axios.defaults.baseURL = 'https://flash-card-tuf-server.vercel.app';

const SwitchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SwitchButton = styled(Link)`
  background-color: #800080; /* Purple color */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a0dad; /* Darker purple */
  }
`;
function App() {
  const [isAdmin,setIsAdmin] =useState(false);
    return (
      <>
     
        <Router>
        <SwitchButtonContainer>
      <SwitchButton onClick={()=>setIsAdmin(!isAdmin)} to={isAdmin ? '/' : '/admin'}>
        Switch To: {isAdmin ? 'Home' : 'Admin'}
      </SwitchButton>
    </SwitchButtonContainer>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
        </>
    );
}

export default App;
