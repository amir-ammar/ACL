import React, { useEffect, useRef, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { CourseCard } from '../components/course';
import { useAppContext } from '../context/App/appContext';
import { PageHeader } from '../components';
import Footer from '../components/Footer';
import { useCourseContext } from '../context/Course/courseContext';
import {CourseForm} from '../components';
import { Link } from 'react-router-dom';
import BioGraphy from '../components/instructor/BioGraphy';


export default function Instructor() {
  const { token, user } = useAppContext();
  if (!user) {
    Navigate('/');
  }
  const { myCourses } = useCourseContext();
  const [instCourses, setInstCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [filteredCourses, setFilterCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useSearchParams({ search: '' });
  const [search, setSearch] = useState(searchQuery.get('search') || "");
  const [uniqueSubject, setUniqueSubject] = useState([]);
  const [priceFrom, setPriceFrom] = useState(
    Number(searchQuery.get('priceFrom')) || 0
  );
  const [priceTo, setPriceTo] = useState(
    Number(searchQuery.get('priceTo')) || 100000
  );
  const courseCartRef = useRef();
  const coursesRef = useRef();
  console.log("search", search);
  useEffect(() => {
    let filtCourses = myCourses.filter(
      (course) => {
        return course.title.toLowerCase().startsWith(search) ||
          course.subject.toLowerCase().startsWith(search)
      }
    );
    filtCourses = filtCourses.filter(
      (course) => course.price >= priceFrom && course.price <= priceTo
    );
    setFilterCourses(filtCourses);
    setInstCourses(myCourses);
    handleUnique(myCourses);
    setIsLoading(false);
  }, [myCourses,priceFrom,priceTo,search]);

  console.log("courses", instCourses);
  let instId = user._id;
  function handleUnique(data) {
    let unique = ['all'];
    let lookUp = {};
    data.forEach((e) => {
      if (!(e.subject in lookUp)) {
        unique.push(e.subject);
        lookUp[e.subject] = 1;
      }
    });
    setUniqueSubject(unique);
  }
  let courseScroll = 0;
  async function leftScroll() {
    let courseCartWidth = courseCartRef.current.clientWidth;
    if (courseScroll - courseCartWidth >= 0) {
      courseScroll -= courseCartWidth;
    }
    coursesRef.current.scroll({ left: courseScroll, behavior: 'smooth' });
    console.log("left", coursesRef.current.scrollLeft);
    console.log(courseScroll);
  }
  async function rightScroll() {
    let coursesWidth = coursesRef.current.scrollWidth;
    let courseCartWidth = courseCartRef.current.clientWidth;
    if (courseScroll + courseCartWidth <= coursesWidth) {
      courseScroll += courseCartWidth;
    }
    coursesRef.current.scroll({ left: courseScroll, behavior: 'smooth' });
    console.log("left", coursesRef.current.scrollLeft);
    console.log(courseScroll);
  }

  function addCourseFront(courseData) {
    instCourses.unshift(courseData);
    setInstCourses([...instCourses]);
    setFilterCourses([...instCourses]);
    setTimeout(() => setShowCreateCourse(false), 3000);
  }
  function filter(filter, subject) {
    filter = filter.toLowerCase();
    let filteredCourses = [];
    console.log(subject);
    if (!subject) {
      filteredCourses = instCourses.filter(
        (course) =>
          course.title.toLowerCase().startsWith(filter) ||
          course.subject.toLowerCase().startsWith(filter)
      );
      console.log(filteredCourses);
    } else {
      if (filter === 'all') {
        filteredCourses = instCourses;
      } else {
        filteredCourses = instCourses.filter(
          (course) => course.subject.toLowerCase() === filter
        );
      }
    }
    filteredCourses = filteredCourses.filter(
      (course) => course.price >= priceFrom && course.price <= priceTo
    );
    setFilterCourses(filteredCourses);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery({ search: search });
  }
  function handleSubmitPrice(e) {
    e.preventDefault();
    setSearchQuery({ priceFrom: priceFrom, priceTo: priceTo });
    setSearch('');
    filter('all', true);
  }
  function enrolledCourses() {
    let filter = instCourses.filter((course)=>course.isEnrolled);
    setFilterCourses(filter);
  }
  function completedCourses() {
    let filter = instCourses.filter((course)=>course.isCompleted);
    setFilterCourses(filter);
  }
  console.log("user", user);
  return (
    <>
      <nav className='m-0  navbar navbar-light bg-light row p-0'>
        <div className='container-fluid col ms-5 ps-5'>
          {(user.type === "Instructor") &&   <Link to='/'><span className='navbar-brand mb-0 h1'>Home Page</span></Link>}
          {(user.type === 'Individual trainee') && <span className='navbar-brand mb-0 h1'>Individual trainee profile Page</span>}
          {(user.type === 'Admin') && <span className='navbar-brand mb-0 h1'>Admin profile Page</span>}
          {(user.type === 'Corporate trainee') && <span className='navbar-brand mb-0 h1'>Corporate trainee profile Page</span>}
        </div>
        <div className='container-fluid col me-2'>
          <form className='d-flex' onSubmit={handleSubmit}>
            <input
              className='form-control me-2'
              name='search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                filter(e.target.value, false);
              }}
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
        {!showCreateCourse && (
          <button
            className='btn btn-outline-primary m-3 col'
            onClick={() => setShowCreateCourse(true)}
          >
            Add Course
          </button>
        )}
        {showCreateCourse && (
          <button
            className='btn btn-outline-primary m-4 col'
            onClick={() => setShowCreateCourse(false)}
          >
            Hide Form{' '}
          </button>
        )}
      </nav>
      {showCreateCourse && (
        <CourseForm
          addCourseFront={addCourseFront}
          instId={instId}
        ></CourseForm>
      )}
      <div className="container m-5"> <BioGraphy></BioGraphy></div>
     
      <div className='container w-100 mb-5'>
        {isLoading && <div>is loading .......</div>}
        <div className='d-block'>
          {!showFilterPrice && (
            <button
              onClick={() => setShowFilterPrice(true)}
              className='btn btn-outline-primary'
            >
              filter with price
            </button>
          )}
          {showFilterPrice && (
            <button
              onClick={() => setShowFilterPrice(false)}
              className='btn btn-outline-primary'
            >
              hide filter
            </button>
          )}
          {showFilterPrice && (
            <form onSubmit={handleSubmitPrice}>
              <label for='from'>from</label>
              <input
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                id='from'
                type='number'
              ></input>
              <label for='from'>to</label>
              <input
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                id='to'
                type='number'
              ></input>
              <input
                className='btn btn-outline-primary m-2 py-1'
                type='submit'
                value='show courses'
              ></input>
              <button
                className='btn btn-outline-primary m-2 py-1'
                onClick={() => {
                  setPriceFrom(0);
                  setPriceTo(10000);
                }}
              >
                reset
              </button>
            </form>
          )}
        </div>
        {uniqueSubject &&
          uniqueSubject.map((sub) => (
            <button key={sub} onClick={() => filter(sub, true)} className='btn btn-link'>
              {sub}
            </button>
          ))}
        <section className='container m-2 p-2 w-100  border border-4 position-relative' >
          {user.type === "Instructor" && <h2 className="btn btn-primary btn-small">Your Courses</h2>}
          <h2 className='btn btn-primary btn-small ms-4' onClick={enrolledCourses}>Courses enrolled in</h2>
          <h2 className='btn btn-primary btn-small ms-4' onClick={completedCourses}>Completed Courses</h2>
          <div className='position-absolute my-auto' style={{ top: "40%", left: "2px", zIndex: 1 }}>
            <button className='rounded rounded-circle bg-dark p-1' onClick={leftScroll}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
          </div>
          <div className='position-absolute my-auto' style={{ top: "40%", right: "2px", zIndex: 1 }}>
            <button className='rounded rounded-circle bg-dark p-1' onClick={rightScroll}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
          {filteredCourses && (filteredCourses.length === 0) && <h3 className="text-center text-info">You have no courses</h3>}
          <div id="carousel" className='container d-flex flex-start w-100 overflow-hidden' ref={coursesRef}>
            {filteredCourses && (filteredCourses.length > 1) && filteredCourses.map((course, index) => {
              return (
                <div ref={courseCartRef} >
                  <CourseCard
                    isInstructorCourses={true}
                    courseId={course._id}
                    courseTitle={course.title}
                    courseDescription={course.description}
                    coursePrice={course.price}
                    courseSubject={course.subject}
                    courseSummary={course.summary}
                    key={course.title + index}
                  />
                </div>
              );
            })
            }
          </div>
        </section>
        {error && <div className='text-danger'>{error}</div>}
      </div>
      <Footer />
    </>
  );
}
