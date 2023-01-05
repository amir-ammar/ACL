import { Link } from 'react-router-dom';
import React from 'react'
import img from './img/cat-1.png'
import img1 from './img/cat-2.png'
import img2 from './img/cat-3.png'
import img3 from './img/cat-4.png'

function Courses() {
    const v1={
    margin: '1px'
    }
    const v2={
        object_fit: 'cover'
    }
    const v3={
        min_height: '350px'
    }
  return (
    <> 
       <div className="container-xxl py-5 category">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Categories</h6>
                <h1 className="mb-5">Courses Categories</h1>
            </div>
            <div className="row g-3">
                <div className="col-lg-7 col-md-6">
                    <div className="row g-3">
                        <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                            <Link className="position-relative d-block overflow-hidden" to="/results?query=software">
                                <img className="img-fluid" src={img} alt=""/>
                                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={v1}>
                                    <h5 className="m-0">Software</h5>
                                    <small className="text-primary"> Courses</small>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                            <Link className="position-relative d-block overflow-hidden" to="/results?query=Deep learning">
                                <img className="img-fluid" src={img1} alt=""/>  
                                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={v1}>
                                    <h5 className="m-0">Deep Learning</h5>
                                    <small className="text-primary"> Courses</small>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                            <Link className="position-relative d-block overflow-hidden" to="/results?query=Voideo Editing">
                                <img className="img-fluid" src={img2} alt=""/>
                                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={v1}>
                                    <h5 className="m-0">Video Editing</h5>
                                    <small className="text-primary"> Courses</small>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={v3}>
                    <Link className="position-relative d-block h-100 overflow-hidden" to="/results?query=Online Marketing">
                        <img className="img-fluid position-absolute w-100 h-100" src={img3} alt="" style={v2}/>
                        <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={v1}>
                            <h5 className="m-0">Online Marketing</h5>
                            <small className="text-primary"> Courses</small>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div> 
</>
  )
}

export default Courses