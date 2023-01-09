const User = require('../models/User');
const { Report } = require('../models');

const updateUserProgress = async (req, res) => {
  const { userId } = req.user;
  const { completedSubtitles, completedExams, progress } = req.body;
  const user = await User.findOne({
    _id: userId,
  });

  const course = user.courses.find(
    (course) => course.courseId.toString() === req.params.courseId
  );
  console.log(completedSubtitles);
  if (completedExams) course.completedExams = completedExams;
  if (completedSubtitles) course.completedSubtitles = completedSubtitles;
  if (progress) course.progress = progress;

  console.log(course);
  await user.save();
  res.status(200).json({
    message: 'course progress updated successfully',
  });
};

const updateUserInfo = async (req, res) => {
  const { userId } = req.user;
  const {
    instructorId,
    username,
    oldPassword,
    newPassword,
    email,
    biography,
    country,
    rating,
    contracted,
  } = req.body;

  console.log(req.body);

  const user = await User.findOne({ _id: userId });

  if (!user) throw new UnauthorizedError('Invalid credentials');
  if (username) user.username = username;
  if (email) user.email = email;
  if (biography) user.biography = biography;
  if (country) user.country = country;
  if (oldPassword && newPassword) {
    const isMatch = await user.comparePassword(oldPassword.toString());
    if (!isMatch) throw new UnauthorizedError('Invalid credentials');
    user.password = newPassword;
  }
  if (contracted) user.contracted = contracted;

  let instructor;
  if (rating && instructorId) {
    const numRating = parseInt(rating);
    instructor = await User.findOne({ _id: instructorId });
    instructor.ratings.push({ user: userId, rate: numRating });
    const sum = instructor.ratings.reduce((acc, curr) => {
      return acc + curr.rate;
    }, 0);
    const avg = sum / instructor.ratings.length || 0;
    instructor.averageRating = avg;
  }

  if (instructorId) {
    await instructor.save();
  } else {
    await user.save();
  }
  console.log(user);
  res.status(200).json(instructor ? instructor : user);
};

const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({
    _id: userId,
  });
  res.status(200).json(user);
};

const getUserProgress = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.params;
  if (courseId) {
    const user = await User.findOne({
      _id: userId,
    });

    const courseProgress = user.courses.find(
      (course) => course.courseId.toString() === courseId
    );
    console.log(courseProgress);
    return res.status(200).json(courseProgress);
  }
  res.status(200).json({
    msg: 'Error',
  });
};
// create problem
const createreport = async (req, res) => {
  const { title, type, course } = req.body;
  console.log(req.body);
  const { userId } = req.user;
  console.log(req.user);
  // console.log('req.body ' + username,email,password,type);
  if (!title || !type) {
    throw new BadRequestError('Please provide all report values');
  }
  //req.body.createdBy = userId;

  const report = await Report.create({
    course: course,
    title,
    status: 'unseen',
    type,
    createdBy: userId,
  });
  res.status(200).json({ report });
};
///get specific report
const getreport = async (req, res) => {
  const { course } = req.query.id;
  const { userId } = req.user;
  console.log(req.body, req.query.id);
  // console.log('req.body ' + username,email,password,type);

  //req.body.createdBy = userId;

  const report = await Report.find({
    createdBy: userId,
    course: req.query.id,
  }).populate('createdBy', 'username');
  res.status(200).json(report);
};

module.exports = {
  updateUserProgress,
  getUserProgress,
  createreport,
  getreport,
  updateUserInfo,
  getUserInfo,
};
