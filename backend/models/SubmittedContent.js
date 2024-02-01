const mongoose = require('mongoose');

const submittedContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  mockFileLink: String,
});

const SubmittedContent = mongoose.model('SubmittedContent', submittedContentSchema);

module.exports = SubmittedContent;
