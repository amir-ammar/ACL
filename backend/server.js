require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// db
const connectDB = require('./db');

// middleware
const {
  errorHandlerMiddleware,
  notFoundMiddleware,
  authMiddleware,
} = require('./middlewares');

// Routes
const {
  authRouter,
  courseRouter,
  userRouter,
  paymentRouter,
  requestCourseRouter,
} = require('./routes');

//Michael
const examRouter = require('./routes/examRoutes');
const adminroutes = require('./routes/AdminRoutes');
const questionRouter = require('./routes/questionRoutes');
const notesRouter = require('./routes/NotesRoutes');
const refundRouter = require('./routes/refundRoutes');
const postRouter = require('./routes/PostRoutes');
const { getUserInfo } = require('./controllers/userController');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
// app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminroutes);
app.use('/api/v1/payment', paymentRouter);

//Michael
app.use('/api/v1/note', notesRouter);
app.use('/api/v1/exam', authMiddleware, examRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/refund', authMiddleware, refundRouter);
app.use('/api/v1/post', authMiddleware, postRouter);

app.use('/api/v1/request', requestCourseRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
