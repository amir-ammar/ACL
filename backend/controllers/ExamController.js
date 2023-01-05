const Exam = require('../models/Exam');
const User = require('../models/User');
const Question = require('../models/Question');
const mongoose = require('mongoose');

// GET a single exercise
const getExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }

  const exam = await Exam.findById(id).populate('questions');
  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

// GET all exams
const getAllExams = async (req, res) => {
  const { courseId } = req.query;
  const exam = await Exam.find({ course: courseId }).select('_id title');
  res.status(200).json(exam);
};

// POST a new Exam

const createExam = async (req, res) => {
  const { userId, type } = req.user;
  console.log(req.body);
  const { courseId, duration, questions } = req.body;

  if (!courseId || !duration || !questions) {
    console.log('Missing fields');
    return res.status(400).json({ error: 'Missing fields' });
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    console.log('No such user');
    return res.status(400).json({ error: 'No such user' });
  }

  if (type !== 'Instructor') {
    console.log('Only Instructor can create exams');
    return res.status(400).json({ error: 'Only Instructor can create exams' });
  }

  if (
    !user.courses.find((c) => c.courseId.toString() === courseId.toString())
  ) {
    console.log('Instructor is not assigned to this course');
    return res
      .status(400)
      .json({ error: 'Instructor is not assigned to this course' });
  }

  for (let i = 0; i < questions.length; i++) {
    const question = await Question.create(questions[i]);
    questions[i] = question._id;
  }

  const exam = await Exam.create({
    course: courseId,
    duration,
    questions,
  });
  res.status(200).json(exam);
};

// DELETE an Exam

const deleteExam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }
  const exam = await Exam.findOneAndDelete({ _id: id });
  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

// UPDATE an Exam
const updateExam = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return req.status(404).json({ error: 'No such Exam' });
  }
  const exam = await Exam.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!exam) {
    return res.status(400).json({ error: 'No such Exam' });
  }
  res.status(200).json(exam);
};

module.exports = {
  getExam,
  createExam,
  deleteExam,
  updateExam,
  getAllExams,
};
