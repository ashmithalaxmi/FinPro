const { feedbckModel } = require('../model/mongo_models');

const submitFeedback = async (req, res) => {
    try {
        // Extract form data from request body
        const { name, email, q1, q2, q3, q4, q5, comments } = req.body;
        console.log(req.body)
        // Create a new feedback instance
        const newFeedback = new feedbckModel({
          name,
          email,
          q1,
          q2,
          q3,
          q4,
          q5,
          comments
        });
    
        // Save the feedback to the database
        await newFeedback.save();
    
        // Respond with success message
        res.status(200).json({ message: 'Feedback submitted successfully' });
      } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {
    submitFeedback
};
