const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../Errors');
const { Course } = require('../models');
const SubTitle = require('../models/SubTitle');

const createSubTitle = async (req, res) => {
  const { courseId } = req.params;

  const subTitles = req.body;
  console.log(subTitles);

  subTitles.map(async (item) => {
    const { title, link, duration, description } = item;
    const newSubtitle = new SubTitle({
      title,
      link,
      duration: Number(duration),
      description,
      course: courseId,
    });
    await newSubtitle.save();
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Subtitles created successfully' });
};

const getAllSubTitles = async (req, res) => {
  const { courseId } = req.params;
  const subTitles = await SubTitle.find({ course: courseId });
  res.status(StatusCodes.OK).json({ subTitles });
};

const getSubTitle = async (req, res) => {
  const { subtitleId } = req.params;
  const subTitle = await SubTitle.findOne({ _id: subtitleId });
  res.status(StatusCodes.OK).json({ subTitle });
};

const updateSubTitle = async (req, res) => {
  const { type } = req.user;
  if (type !== 'Instructor') {
    throw new UnauthorizedError('You are not allowed to add exercise');
  }
  const { subTitle } = req.body;
  const { subtitleId } = req.params;
  const newSubtitle = await SubTitle.findOneAndUpdate(
    { _id: subtitleId },
    { ...subTitle },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ newSubtitle });
};

module.exports = {
  updateSubTitle,
  getSubTitle,
  getAllSubTitles,
  createSubTitle,
};
