import React, { useState, useEffect } from 'react';
import axios from 'axios'

export const Feedback = () => {
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    comments: ''
  });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')


  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/getCurrentUser')
          setEmail(response.data.email)
          setName(response.data.name)
          console.log("User feteched")
        } catch (error) {
          console.log('Error fetching current user data:', error);
        }
      };

      fetchCurrentUser();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Send form data, name, and email to the backend
        const response = await axios.post('http://localhost:5000/api/submitFeedback', {
          ...formData,
          name: name,
          email: email
        });
        
        if (response.status === 200) {
          console.log('Feedback submitted successfully');
          // Reset form data after successful submission
          setFormData({
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            comments: ''
          });
        } else {
          console.error('Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
  }
  

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit}>
        <p>1. What is the difficulty level of the project?</p>
        <select name="q1" value={formData.q1} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p> 2. Rate the ability for you to meet the deadline of this week?</p>
        <select name="q2" value={formData.q2} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p> 3. Was the workload efficiently balanced in this project?</p>
        <select name="q3" value={formData.q3} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p> 4. Rate the quality of work delivered by your team this week.</p>
        <select name="q4" value={formData.q4} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>  5. Is there any additional support or resources needed to improve the performance?</p>
        <select name="q5" value={formData.q5} onChange={handleChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p>Any other Comments</p>
        <input
          type='text'
          name='comments'
          value={formData.comments}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
