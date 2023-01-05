const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String },
  },
  replies: [
    {
      user: {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        name: { type: String },
      },
      reply: {
        type: String,
        required: true,
      },
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('Post', PostSchema);
