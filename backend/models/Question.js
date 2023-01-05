const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'What is the Question'],
  },
  imageURL: {
    type: String,
    contentType: String,
  },

  choices: [String],

  answer: {
    type: Number,
    min: [0, 'Please choose at least 1 answer'],
    max: 4,
    hideJSON: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
