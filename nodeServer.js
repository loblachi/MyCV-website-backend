
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package
require('dotenv').config();
// Create an Express app
const app = express();
const port = 3000;

// Enable CORS for all routes, allowing only specific origin (your frontend)
app.use(cors({
  origin: 'https://my-cv-website-ten.vercel.app/',  // Replace with the URL of your frontend (if needed)
}));

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Set up Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,   // Your Gmail address from .env
    pass: process.env.GMAIL_PASS,   // Your app-specific password from .env
  },
});

// POST route to handle feedback submission
app.post('/submit-feedback', (req, res) => {
  const { feedback } = req.body;

  // Set up email options
  const mailOptions = {
    from: process.env.GMAIL_USER,    // Sender address
    to: "trevlinnaicker404@gmail.com",      // Recipient address (same as sender for testing)
    subject: 'Feedback from MyCv Website', // Email subject
    text: feedback,                  // Email body (the feedback text)
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Feedback submitted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at https://my-cv-website-ten.vercel.app/${port}`);
});
