const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const courseRouter = require('./courseRoutes');
const paymentRouter = require('./PaymentRouter');
const examRouter = require('./examRoutes');
const questionRouter = require('./questionRoutes');
const notesRouter = require('./NotesRoutes');
const requestCourseRouter = require('./RequestRouter');

module.exports = {
  authRouter,
  userRouter,
  courseRouter,
  paymentRouter,
  notesRouter,
  requestCourseRouter
};
