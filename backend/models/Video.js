const mongoose = require('mongoose');

const VideoSchame = mongoose.Schema({
  Title: {
    type: String,
    require: true,
  },
  related_Course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    require: true,
  },
  Video_Description: {
    type: String,
    require: true,
  },
  Link: {
    type: String,
  },
  viewed: {
    type: Boolean,
  },
  VideoNode: {
    type: Schema.Types.ObjectId,
    ref: 'VideoNotesModel',
  },
});

module.exports = mongoose.model('Video', VideoSchame);
