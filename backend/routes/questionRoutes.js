const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestion,
} = require('../controllers/QuestionController');

// GET Question
router.get('/:id', getQuestion);

// GET All Questions
router.get('/', getAllQuestion);

// POST a new Question
router.post('/', createQuestion);

// DELETE an Question
router.delete('/:id', deleteQuestion);

// UPDATE an Question
router.patch('/:id', updateQuestion);

module.exports = router;
