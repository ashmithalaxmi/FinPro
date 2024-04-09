import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './login.css'

function ForgetPasswordEmailPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/generateOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:email }), // Send email in the request body
        });
        
        const res = await response.json();

        if (res.message !== "Mail Sent") {
          alert('Failed to generate OTP');
        }
        
        else{
            sessionStorage.setItem('email',email);
            navigate(`/forget-password/otp?email=${encodeURIComponent(email)}`);
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle error, show error message to the user, etc.
      }
    
  };

  return (
    <div>
       <div className='navbar'>
           Timesheet and Feedback System  
       </div>  
       <center>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <br/>
        <button type="submit">Send OTP</button>
      </form>
      </center>
    </div>
  );
}

export default ForgetPasswordEmailPage;
