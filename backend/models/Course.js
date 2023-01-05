const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a course subject'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a course price'],
    },
    summary: {
      type: String,
      required: [true, 'Please provide a course summary'],
    },
    previewLink: {
      type: String,
      required: [true, 'Please provide a course preview link'],
    },
    numberOfHours: {
      type: Number,
      required: [true, 'Please provide number of hours'],
    },
    rating: {
      type: Number,
    },
    reviews: [
      {
        username: { type: String },
        review: { type: String },
        rate: { type: Number },
      },
    ],
    numberOfStudents: {
      type: Number,
    },
    promotion: {
      promotionPercentage: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide the creator'],
      ref: 'User',
    },
    stripeProductId: {
      type: String,
      required: false,
    },
    stripePriceId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
