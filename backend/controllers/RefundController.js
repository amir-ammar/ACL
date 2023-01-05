const Refund = require('../models/Refund');
const User = require('../models/User');
const Course = require('../models/Course');

const postRefund = async (req, res) => {
  const { courseId } = req.body;
  const { userId } = req.user;

  const user = await User.findById(userId);

  if (!user) {
    console.log('User not found');
    return res.status(404).json({ message: 'User not found' });
  }

  const course = await Course.findById(courseId);

  if (!course) {
    console.log('Course not found');
    return res.status(404).json({ message: 'Course not found' });
  }

  const enrolled = user.courses.find((course) => course._id == courseId);

  // if (!enrolled) {
  //   console.log('You are not enrolled in this course');
  //   return res
  //     .status(404)
  //     .json({ message: 'You are not enrolled in this course' });
  // }
  const alreadyRefunded = await Refund.findOne({
    course: courseId,
    user: userId,
  });

  if (alreadyRefunded) {
    console.log('You already requested a refund');
    return res.status(404).json({ message: 'You already requested a refund' });
  }

  const refund = await Refund({
    course: courseId,
    user: userId,
    state: 'pending',
    sended: true,
  });

  const savedRefund = await refund.save();
  res.status(200).json(savedRefund);
};

const getRefunds = async (req, res) => {
  const { myRefunds } = req.query;
  const { userId, type } = req.user;
  const { courseId } = req.body;

  if (type === 'Admin') {
    const refunds = await Refund.find()
      .populate('course', 'title')
      .populate('user', 'username');
    res.status(200).json(refunds);
  }

  if (type === 'Individual trainee') {
    if (myRefunds) {
      const refunds = await Refund.find({ user: userId })
        .populate('course', 'title')
        .populate('user', 'username');
      return res.status(200).json(refunds);
    }

    if (courseId) {
      const refund = await Refund.findOne({ course: courseId, user: userId });
      if (refund) {
        return res.status(200).json(refund);
      }
      return res.status(404).json({ message: 'No refund found' });
    }
  }
};

module.exports = {
  postRefund,
  getRefunds,
};
