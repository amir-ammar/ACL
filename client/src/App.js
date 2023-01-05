import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  SubtitlesPage,
  SuccessResetPassword,
  SearchResult,
  ResetPassword,
  Landing,
  ForgetPassword,
  Login,
  Register,
  CoursePage,
  Home,
  ProtectedRoute,
  Instructor,
  Admin,
  Payment,
  SuccessPayment,
  FailedPayment,
} from './pages';
import { NavBar, CourseForm, Courses } from './components';
import {
  UserforAdmin,
  GetCourse,
  Report,
  DataGridDemo,
  CourseRequest,
  RefundRequest,
  Accessrequest,
} from './components/admin';

import SubtitleForm from './components/subtitle/SubtitleForm';
import { CourseProvider } from './context/Course/courseContext';
import { SearchProvider } from './context/Search/searchContext';
import Filter from './components/Filter';
import { CourseComponent } from './components/course';
import Certificate from './components/Certificate';
import AlertDialog from './components/AlertDialog';
import Test from './components/Test';
import RatingForm from './components/RatingForm';
import Question from './components/Question';
import Exam from './components/Exam';
import LinearProgressBar from './components/LinearProgressBar';
import Footer from './components/Footer';
import Review from './components/Review';
import RatingStars from './components/RatingStars';
import Instructorprofile from './components/instructor/Instructorprofile';
import BioGraphy from './components/instructor/BioGraphy';
import Setting from './components/instructor/Setting';
import ExamForm from './components/ExamForm';
import HomeV2 from './components/homepage/HomeV2';
import PromotionForm from './components/PromotionForm';
import Profile from './pages/Profile';
import Post from './components/Post';
import InstructorRating from './components/InstructorRating';
import { AppProvider } from './context/App/appContext';
import NotFound from './pages/NotFound';
import InstructorProfile from './pages/InstructorProfile';
import NotAllowed from './pages/NotAllowed';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CourseProvider>
          <SearchProvider>
            <Routes>
              <Route path='/landing' element={<Landing />} />
              <Route
                path='admin'
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              >
                <Route path='' element={<UserforAdmin />} />
                <Route path='users' element={<UserforAdmin />} />
                <Route path='Report' element={<Report></Report>} />
                <Route path='Access Request' element={<Accessrequest />} />
                <Route path='Refund' element={<RefundRequest />} />
                <Route
                  path='courserequest'
                  element={<CourseRequest></CourseRequest>}
                />
                <Route path='course' element={<GetCourse></GetCourse>} />
                <Route path='test' element={<DataGridDemo />} />
              </Route>
              <Route path='/resetPassword' element={<SuccessResetPassword />} />
              <Route path='/forgetPassword' element={<ForgetPassword />} />
              <Route path='/resetPassword/:token' element={<ResetPassword />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/SuccessPayment' element={<SuccessPayment />} />
              <Route path='/FailedPayment' element={<FailedPayment />} />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path='' element={<Instructor></Instructor>}></Route>
              <Route path='BioGraphy' element={<BioGraphy></BioGraphy>} />
              <Route path='myCourses' element={<Instructor></Instructor>} />
              <Route path='/post' element={<Post></Post>} />
              <Route path='gg' element={<Setting></Setting>} />
              <Route
                element={
                  <>
                    <NavBar />
                  </>
                }
              >
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route path='/addCourse' element={<CourseForm />} />
                <Route
                  path='/updateCourse/:courseId'
                  element={<CourseForm />}
                />
                <Route
                  path='/course/:courseId/subtitle'
                  element={<SubtitleForm />}
                />
                <Route
                  path='/course/:courseId/content'
                  element={<SubtitlesPage />}
                />
                <Route path='/course/:courseId' element={<CoursePage />} />
                <Route
                  path='/instructor/:instructorId'
                  element={<InstructorProfile />}
                />

                <Route path='/results' element={<SearchResult />} />
              </Route>
              <Route path='/rating' element={<RatingForm />} />
              <Route path='/filter' element={<Filter />} />
              <Route path='/certificate' element={<Certificate />} />
              <Route path='/dialog' element={<AlertDialog />} />
              <Route path='/test' element={<Test />} />
              <Route path='/question' element={<Question />} />
              <Route path='/exam' element={<Exam />} />
              <Route path='/courseComponent' element={<CourseComponent />} />
              <Route path='/progress' element={<LinearProgressBar />} />
              <Route path='/footer' element={<Footer />} />
              <Route path='/review' element={<Review />} />
              <Route path='/rate' element={<RatingStars />} />
              <Route path='/ins' element={<Instructor />} />
              <Route path='/not-allowed' element={<NotAllowed />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </SearchProvider>
        </CourseProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
