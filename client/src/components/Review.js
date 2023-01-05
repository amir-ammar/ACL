import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import RatingStars from './RatingStars';

const useStyles = makeStyles((theme) => ({
  review: {
    minWidth: '20rem',
    minHeight: '10rem',
    padding: '1rem',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'wrap',
    marginRight: '1rem',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '& p': {
      fontSize: '1rem',
      margin: '0',
    },
    '& h2': {
      fontSize: '1.5rem',
      margin: '0',
    },
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  pic: {
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#2D3331',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    marginRight: '1rem',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0',
  },
  upper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0',
  },
}));

const Review = ({ username, reviewText, rate }) => {
  const classes = useStyles();
  const name = username || 'Anonymous';
  const text =
    reviewText ||
    'loremRev iewlor emRe viewlorem loremRev iewlor emRe viewlorem loremRev iewlor emRe viewlorem loremRev iewlor emRe viewlorem loremRev iewlor emRe viewlorem loremRev iewlor emRe viewlorem ';

  const [showMore, setShowMore] = useState(false);

  return (
    <Box className={`${classes.review}`}>
      <span className={`${classes.upper}`}>
        <span className={`${classes.pic}`}>{name.charAt(0).toUpperCase()}</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span className={`${classes.name}`}>{name}</span>
          <RatingStars rate={rate} />
        </div>
      </span>
      <p
        style={{
          paddingLeft: '1rem',
          paddingTop: '1rem',
        }}
      >
        {text.slice(0, showMore ? text.length : 100)}
        {text.length > 100 && (
          <span
            onClick={() => setShowMore(!showMore)}
            className={`${classes.showMore}`}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </span>
        )}
      </p>
    </Box>
  );
};

export default Review;
