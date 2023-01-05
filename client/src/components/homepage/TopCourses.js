import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import img1 from './img/course-1.jpg';
import img2 from './img/course-2.jpg';
import img3 from './img/course-3.jpg';
import { useCourseContext } from '../../context/Course/courseContext';

function TopCourses() {
  const { courses } = useCourseContext();
  let sort = courses.sort((a, b) => {
    return b.rating - a.rating;
  });
  if (sort.length == 0) {
    sort = [
      {
        price: 'notavaible',
        rating: 'notavailbe',
        title: 'Notavaible',
        numberOfHours: 'notavaible',
        createdBy: { username: 'notyet' },
      },
      {
        price: 'notavaible',
        rating: 'notavailbe',
        title: 'Notavaible',
        numberOfHours: 'notavaible',
        createdBy: { username: 'notyet' },
      },
      {
        price: 'notavaible',
        rating: 'notavailbe',
        title: 'Notavaible',
        numberOfHours: 'notavaible',
        createdBy: { username: 'notyet' },
      },
    ];
  }

  const h1 = `/course/${sort[0]._id}`;
  const h2 = `/course/${sort[1]._id}`;
  const h3 = `/course/${sort[2]._id}`;

  const v1 = {
    border_radius: '30px 0 0 30px',
  };
  const v2 = {};
  return (
    <>
      <div className='container-xxl py-5'>
        <div className='container'>
          <div className='text-center wow fadeInUp' data-wow-delay='0.1s'>
            <h6 className='section-title bg-white text-center text-primary px-3'>
              Courses
            </h6>
            <h1 className='mb-5'>Popular Courses</h1>
          </div>
          <div className='row g-4 justify-content-center'>
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.1s'
            >
              <Link to={h1}>
                <div className='course-item bg-light'>
                  <div className='position-relative overflow-hidden'>
                    <img className='img-fluid' src={img1} alt='' />
                    <div className='w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4'></div>
                  </div>
                  <div className='text-center p-4 pb-0'>
                    <h3 className='mb-0'>${sort[0].price}</h3>
                    <div className='mb-3'>
                      {(() => {
                        const arr = [];
                        for (let i = 0; i < sort[0].rating; i++) {
                          arr.push(
                            <small className='fa fa-star text-primary'></small>
                          );
                        }
                        return arr;
                      })()}

                      <small>({sort[0].rating})</small>
                    </div>
                    <h5 className='mb-4'>{sort[0].title}</h5>
                  </div>
                  <div className='d-flex border-top'>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-user-tie text-primary me-2'></i>
                      {sort[0].createdBy.username}
                    </small>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-clock text-primary me-2'></i>
                      {sort[0].numberOfHours} Hrs
                    </small>
                    <small className='flex-fill text-center py-2'>
                      <i className='fa fa-user text-primary me-2'></i>30
                      Students
                    </small>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.3s'
            >
              <Link to={h2}>
                <div className='course-item bg-light'>
                  <div className='position-relative overflow-hidden'>
                    <img className='img-fluid' src={img2} alt='' />
                    <div className='w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4'></div>
                  </div>
                  <div className='text-center p-4 pb-0'>
                    <h3 className='mb-0'>${sort[1].price}</h3>
                    <div className='mb-3'>
                      {(() => {
                        const arr = [];
                        for (let i = 0; i < sort[1].rating; i++) {
                          arr.push(
                            <small className='fa fa-star text-primary'></small>
                          );
                        }
                        return arr;
                      })()}

                      <small>({sort[1].rating})</small>
                    </div>
                    <h5 className='mb-4'>{sort[1].title}</h5>
                  </div>
                  <div className='d-flex border-top'>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-user-tie text-primary me-2'></i>
                      {sort[1].createdBy.username}
                    </small>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-clock text-primary me-2'></i>
                      {sort[1].numberOfHours} Hrs
                    </small>
                    <small className='flex-fill text-center py-2'>
                      <i className='fa fa-user text-primary me-2'></i>30
                      Students
                    </small>
                  </div>
                </div>
              </Link>
            </div>

            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.5s'
            >
              <Link to={h3}>
                <div className='course-item bg-light'>
                  <div className='position-relative overflow-hidden'>
                    <img className='img-fluid' src={img3} alt='' />
                    <div className='w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4'></div>
                  </div>
                  <div className='text-center p-4 pb-0'>
                    <h3 className='mb-0'>${sort[2].price}</h3>
                    <div className='mb-3'>
                      {(() => {
                        const arr = [];
                        for (let i = 0; i < sort[2].rating; i++) {
                          arr.push(
                            <small className='fa fa-star text-primary'></small>
                          );
                        }
                        return arr;
                      })()}

                      <small>({sort[2].rating})</small>
                    </div>
                    <h5 className='mb-4'>{sort[2].title}</h5>
                  </div>
                  <div className='d-flex border-top'>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-user-tie text-primary me-2'></i>
                      {sort[2].createdBy.username}
                    </small>
                    <small className='flex-fill text-center border-end py-2'>
                      <i className='fa fa-clock text-primary me-2'></i>
                      {sort[2].numberOfHours} Hrs
                    </small>
                    <small className='flex-fill text-center py-2'>
                      <i className='fa fa-user text-primary me-2'></i>30
                      Students
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopCourses;
