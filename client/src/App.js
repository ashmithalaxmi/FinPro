import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register'
import Login from './components/login';
import ForgetPasswordEmailPage from './components/forgetPassword';
import ForgetPasswordOTPPage from './components/enterOtp';
import HomePage from './components/home';
import FeedbackModule from './components/FeedbackPage';
import FeedbackDashModule from './components/FeedbackDash';
import TimeSheetParent from './components/Timesheet';

function App() {
 
 
  return (
    <>
      <Router>
        <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/forget-password/email" element={<ForgetPasswordEmailPage/>}/>
        <Route path="/forget-password/otp" element={<ForgetPasswordOTPPage/>}/>
        <Route path="/feedback/newfeedback" element={<FeedbackModule/>}/>
        <Route path="/feedback" element={<FeedbackDashModule/>}/>
        <Route path="/timesheet" element={<TimeSheetParent/>}/>
        <Route path="/home" element={<HomePage/>}/>
        </Routes>
      </Router>
    </>
  )
}
 
export default App
 