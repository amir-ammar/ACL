const mongoose = require('mongoose');

const SubTitleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course lecture title'],
  },
  link: {
    type: String,
    required: [true, 'Please provide a course lecture link'],
  },
  duration: {
    type: Number,
    required: [true, 'Please provide a course duration'],
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Please provide a course id'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
  },
});

module.exports = mongoose.model('SubTitle', SubTitleSchema);
