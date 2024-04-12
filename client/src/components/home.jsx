import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Addproject from './AddProject';
import AllocateProjects from './AllocateProjects';
import RegisterUser from './register';
import { Link } from 'react-router-dom';
import TopNavbar from './Navbar';
import './login.css'

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
          <center>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello Admin!</h2>
          </center>
          <div className='adminb'>
          <div className='center-b'>
          <Addproject />
          </div>
          <div className='center-b'>
          <AllocateProjects />
          </div>
          <div className='center-b'>
          <RegisterUser />
          </div>
          </div>
        </div>
      )}
      {role === 'architect' && (
        <div>
          <center>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello Architect!</h2>
          <br></br>
          <button><Link to='/timesheet'>Create Timesheet</Link></button>
          </center>
          {/* <TimeSheetParent /> */}
        </div>
      )}
      {role === 'intern' && (
        <div>
          <center>
          <h1>Welcome to the Home Page</h1>
          <h2>Hello intern!</h2>
          </center>
          <br></br>
        </div>
      )}
    </div>

  );
}

export default HomePage;
