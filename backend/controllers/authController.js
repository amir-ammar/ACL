const { User,Wallet } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../utils');
const { BadRequestError, UnauthorizedError } = require('../Errors');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils');
const { JsonWebTokenError } = require('jsonwebtoken');


const register = async (req, res) => {
  const { username, password, email, type} = req.body;
  console.log(type);
  if (!username || !password || !email || !type)
    throw new BadRequestError('please provide all values');
  console.log(req.body);
  
  const user = await User.create(req.body);
  console.log(user);
  const wallet=await Wallet.create({owner:user._id});

  const token = generateToken({
    userId: user._id,
    type,
  });
  user.password = '';
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError('please provide all values');

  const user = await User.findOne({ email });

  if (!user) throw new UnauthorizedError('Invalid credentials');

  const isMatch = await user.comparePassword(password.toString());

  if (!isMatch) throw new UnauthorizedError('Invalid credentials');

  const token = await generateToken({
    userId: user._id,
    type: user.type,
  });

  user.type = {};
  user.password = '';

  res.status(StatusCodes.OK).json({ user, token });
};

const logout = async (req, res) => {
  console.log('logout');
};

// for instructors only (email, biography)

const updateUser = async (req, res) => {
  const { email, biography } = req.body;
  const { userId, type } = req.user;

  if (!email && !biography) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide email or biography or both ' });
  }

  if (type !== 'Instructor')
    throw new UnauthorizedError(
      'You are not allowed to change email or biography'
    );

  // update user with biography if it exists and the email if it exists and return the new user

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { biography: biography || '', email: email || user.email },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ user });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(email);
  if (!user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'There is no user with this email' });

  const token = await jwt.sign(
    { email: user.email, userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const link = `http://localhost:3000/resetPassword/${token}`;
  await sendEmail({
    email: user.email,
    subject: 'Reset Password',
    text: `Hi ${user.username}, We received a request to reset your password. If you did not make this request, please ignore this email. Otherwise, please click the link below to reset your password.`,
    html: `<p>Please click on the link to reset your password <a href="${link}">${link}</a></p>`,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Email Sent Successfully, Check your inbox' });
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { authorization } = req.headers;

  const token = authorization.split(' ')[1];

  const payload = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: payload.userId });

  user.password = password;

  await user.save();

  const newToken = await generateToken({
    userId: user._id,
    type: user.type,
  });
  console.log(newToken);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Password Updated Successfully', token: newToken });
};

module.exports = {
  register,
  login,
  logout,
  updateUser,
  forgetPassword,
  resetPassword,
};
