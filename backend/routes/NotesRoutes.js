const express = require('express');
const router = express.Router();

const {
  getNote,
  addNote,
  updateNote,
  getAllNotes,
  deleteNote,
} = require('../controllers/NotesController');

router.get('/:id', getNote);
router.post('/', addNote);
router.patch('/:noteId', updateNote);
router.get('/', getAllNotes);
router.delete('/:noteId', deleteNote);

module.exports = router;
