import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CourseComponent from '../components/course/CourseComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
}));

export default function Courses({ courses, page, completed }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        {courses
          .slice(page * 3, Math.min(page * 3 + 3, courses.length))
          .map((course) => {
            return (
              <CourseComponent
                key={course?._id}
                title={course?.title}
                subject={course?.subject}
                description={course?.summary}
                instructor={course?.createdBy.username}
                price={course?.price}
                courseId={course?._id}
                horizontal={true}
                rating={course?.rating}
                progress={course?.progress}
                demo={true}
                currency={course?.currency}
              />
            );
          })}
      </div>
    </>
  );
}
