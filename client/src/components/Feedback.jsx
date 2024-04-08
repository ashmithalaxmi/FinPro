import React, { useState } from 'react';

export const Feedback = () => {
  // State to hold user responses
  const [formData, setFormData] = useState({
    name: '', // Assuming name is part of formData
    email: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    comments: ''
  });

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch currently logged-in user's data
      const currentUserResponse = await fetch('/getCurrentUser');
      console.log(currentUserResponse.ok);
      const currentUserData = await currentUserResponse.json();
  
      if (currentUserResponse.ok) {
        // Add user's name and email to the feedback data
        const feedbackData = {
          name: currentUserData.name,
          email: currentUserData.email,
          q1: formData.q1,
          q2: formData.q2,
          q3: formData.q3,
          q4: formData.q4,
          q5: formData.q5,
          comments: formData.comments
        };
  
        // Make a POST request to the backend API to store feedback
        const response = await fetch('/submitFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(feedbackData) // Send feedback data with user's name and email
        });
  
        // Check if the request was successful
        if (response.ok) {
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
      } else {
        console.error('Failed to fetch current user data');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  

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
