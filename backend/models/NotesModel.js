const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  subtitle: {
    type: Schema.Types.ObjectId,
    required: [true, 'please provide which subtitle'],
    ref: 'SubTitle',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide a user'],
  },
  description: {
    type: String,
    required: [true, 'please provide a description for video'],
  },
});

module.exports = mongoose.model('NotesModel', NotesSchema);
