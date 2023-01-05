import React from 'react';
import './style.css';
import './bootstrap.min.css';
import Content from './Content';
import Courses from './Courses';
import TopCourses from './TopCourses';
import About from './About';
import Service from './Service';

function HomeV2() {
  return (
    <>
      <div>
        <Content />
        <Service />
        <About />
        <Courses></Courses>
        <TopCourses />
      </div>
    </>
  );
}

export default HomeV2;
