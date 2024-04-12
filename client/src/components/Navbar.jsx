import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const TopNavbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear access token from sessionStorage
    sessionStorage.removeItem('accessToken');
    // Redirect to login page
    navigate('/');
  };

  // Get email from sessionStorage
  const userEmail = sessionStorage.getItem('email');

  return (
    < div className='navbar'>
    <nav className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
      <h3 className="text-2xl" style={{marginLeft: "75px"}}>Timesheet and Feedback Management System</h3>
      <div className="flex items-center space-x-4">
        {/* Display other navigation links */}
        <ul className="flex space-x-4" style={{listStyle: "none", display:"flex"}}>
          <li><a href="/home" style={{color:"white"}}>Home</a></li>&nbsp;&nbsp;&nbsp;&nbsp;
          <li><a href="/feedback"style={{color:"white"}}>Feedback</a></li>&nbsp;&nbsp;&nbsp;&nbsp;
        </ul>
        {/* Display email and logout button */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-300" style={{marginLeft: "25px"}}>{userEmail}</span>
          <button onClick={handleLogout} className="text-gray-300 hover:text-white" style={{marginLeft: "25px"}}>Logout</button>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default TopNavbar;
