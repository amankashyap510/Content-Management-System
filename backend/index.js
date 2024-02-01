const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const Content = require('./models/Content');
const SubmittedContent = require('./models/SubmittedContent');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// API endpoint for handling content submission
app.post('/api/content', async (req, res) => {
  try {
    const { title, description, mockFileLink } = req.body;
    const newContent = new Content({ title, description, mockFileLink });
    await newContent.save();
    res.status(201).json({ message: 'Content submitted successfully' });
  } catch (error) {
    console.error('Error submitting content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint for retrieving all submitted content
app.get('/api/content', async (req, res) => {
  try {
    const allContent = await Content.find();
    res.status(200).json({ content: allContent });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/submitted', async (req, res) => {
  try {
    // Fetch submitted content from the database
    const submittedContent = await SubmittedContent.find();
    res.json(submittedContent);
  } catch (error) {
    console.error('Error fetching submitted content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
