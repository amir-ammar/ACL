const { NotesModel } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { SubTitle } = require('../models');
const { User } = require('../models');

// need authentication allowed for req owner
const getNote = async (req, res) => {};

// allowed only for admin
const addNote = async (req, res) => {
  const { subtitleId, userId, description } = req.body;

  if (!subtitleId || !userId || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('please provide all fields');
  }

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('please provide a valid user');
  }

  console.log(subtitleId);
  const subtitle = await SubTitle.findById(subtitleId);
  if (!subtitle) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('please provide a valid subtitle');
  }

  const note = await NotesModel.create({
    subtitle: subtitleId,
    user: userId,
    description,
  });

  const response = {
    id: note._id,
    description: note.description,
  };

  res.status(StatusCodes.CREATED).json({ msg: 'Note added', response });
};

const updateNote = async (req, res) => {
  const { userId, description } = req.body;
  const { noteId } = req.params;
  if (!userId || !description) {
    res.status(StatusCodes.BAD_REQUEST).send('please provide all fields');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).send('please provide a valid user');
  }

  const note = await NotesModel.findById(noteId);

  if (!note) {
    res.status(StatusCodes.NOT_FOUND).send('Note not found');
  }

  if (note.user.toString() !== userId) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send('You are not authorized to update this note');
  }

  note.description = description;

  await note.save();

  res.status(StatusCodes.OK).json({ msg: 'Note updated', note });
};

const getAllNotes = async (req, res) => {
  const { subtitleId, userId } = req.query;

  if (!subtitleId || !userId) {
    res.status(StatusCodes.BAD_REQUEST).send('please provide all fields');
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).send('please provide a valid user');
  }

  const subtitle = await SubTitle.findById(subtitleId);

  if (!subtitle) {
    res.status(StatusCodes.BAD_REQUEST).send('please provide a valid subtitle');
  }

  const notes = await NotesModel.find({
    subtitle: subtitleId,
    user: userId,
  });

  const response = [];

  notes.map((note, idx) => {
    response.push({
      id: note._id,
      description: note.description,
    });
  }),
    console.log(response);
  res.status(StatusCodes.OK).json(response);
};

const deleteNote = async (req, res) => {
  const { userId } = req.query;
  const { noteId } = req.params;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('please provide all fields');
  }

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('please provide a valid user');
  }
  const note = await NotesModel.findOne({
    _id: noteId,
    user: userId,
  });

  if (!note) {
    return res.status(StatusCodes.NOT_FOUND).send('Note not found');
  }

  if (note.user.toString() !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('You are not authorized to update this note');
  }

  await note.remove();

  res.status(StatusCodes.OK).json({ msg: 'Note deleted' });
};

module.exports = {
  getNote,
  addNote,
  updateNote,
  getAllNotes,
  deleteNote,
};
