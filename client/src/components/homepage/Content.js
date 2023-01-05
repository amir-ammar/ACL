import { Link } from '@material-ui/core';
import React from 'react';
import img1 from './img/carousel-1.jpg';

function Content() {
  const v1 = {
    background: 'rgba(24, 29, 56, .7)',
  };
  return (
    <div>
      {' '}
      <div className='container-fluid p-0 top-0 start-0 w-100 h-100'>
        <div className=' header-carousel position-relative top-0 start-0 w-100 h-100'>
          <div className=' top-0 start-0 w-100 h-100  '>
            <img className='img-fluid w-100 h-100' src={img1} alt='' />
            <div
              className='position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center'
              style={v1}
            >
              <div className='container'>
                <div className='row justify-content-start'>
                  <div className='col-sm-10 col-lg-8'>
                    <h5 className='text-primary text-uppercase mb-3 animated slideInDown'>
                      Best Online Courses
                    </h5>
                    <h1 className='display-3 text-white animated slideInDown'>
                      The Best Online Learning Platform
                    </h1>
                    <p className='fs-5 text-white mb-4 pb-2'>
                      Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                      diam no. Kasd rebum ipsum et diam justo clita et kasd
                      rebum sea sanctus eirmod elitr.
                    </p>

                    <Link
                      onClick={() => {
                        window.location.href = '/register';
                      }}
                      className='btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft'
                    >
                      Join Now
                    </Link>
                    <h1 className='display-3 text-white animated slideInDown'>
                      Welcome
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
