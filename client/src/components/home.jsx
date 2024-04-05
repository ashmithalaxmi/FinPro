import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Addproject from './AddProject';
import AllocateProjects from './AllocateProjects';
import RegisterUser from './register';
import { Link } from 'react-router-dom';
import TopNavbar from './Navbar';

function HomePage() {
  const [role, setRole] = useState(sessionStorage.getItem('role')); // Assume user is not an admin by default
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      // If role is not defined, redirect to the login page
      navigate('/');
    }
  }, []);

  return (

    <div>
      <TopNavbar />

      {role === 'admin' && (
        <div>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello Admin!</h2>
          <Addproject />
          <AllocateProjects />
          <RegisterUser />
        </div>
      )}
      {role === 'architect' && (
        <div>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello Architect!</h2>
          <br></br>
          <button><Link to='/timesheet'>Create Timesheet</Link></button>
          {/* <TimeSheetParent /> */}
        </div>
      )}
      {role === 'intern' && (
        <div>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello intern!</h2>
          <br></br>
        </div>
      )}
    </div>

  );
}

export default HomePage;
