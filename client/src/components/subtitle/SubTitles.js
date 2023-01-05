import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  Box: {
    width: '60rem',
    height: '3.5rem',
    marginLeft: '2rem',
    padding: '0.5rem',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  title: {
    fontSize: '2rem',
    display: 'inline-block',
  },
  list: {
    width: '60rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2rem',
    // animate the opening and closing of the list
    animation: `$myEffect 0.5s`,
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  listItem: {
    width: '100%',
    height: 'auto',
    margin: '.5rem 0',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '& p': {
      fontSize: '1rem',
      margin: '0',
    },
  },
  subtitleIcon: {
    fontSize: '2rem',
    display: 'inline-block',
  },
  iconWithTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
    display: 'inline-block',
    color: '#3f51b5',
    textDecoration: 'none',
    '&:hover': {
      color: '#3f51b5',
    },
  },
}));

const SubTitles = ({ data }) => {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);

  const handleContent = () => {
    if (showContent) {
      setShowContent(false);
      setShowMore(false);
      setShowMoreText(false);
    } else setShowContent(true);
  };

  return (
    <section>
      <Box
        component='aside'
        className={`${classes.Box}`}
        onClick={handleContent}
      >
        <h1 className={`${classes.title}`}>Subtitles</h1>
        <span className={`${classes.subtitleIcon}`}>
          {showContent ? '-' : '+'}
        </span>
      </Box>
      {showContent && (
        <div className={`${classes.list}`}>
          {data &&
            data.length > 0 &&
            data.slice(0, showMore ? data.length : 3).map((subtitle, idx) => {
              return (
                <div className={`${classes.listItem}`} key={idx}>
                  <span className={`${classes.iconWithTitle}`}>
                    {/* make video icon before the title */}
                    <FaVideo />
                    <Link to={subtitle.link} className={`${classes.subtitle}`}>
                      {subtitle.title}
                    </Link>
                  </span>
                  <p>
                    {subtitle.description.slice(
                      0,
                      showMoreText ? subtitle.description.length : 100
                    )}
                    {subtitle.description.length > 100 && (
                      <span
                        className={`${classes.showMore}`}
                        onClick={() => setShowMoreText(!showMoreText)}
                      >
                        {showMoreText ? 'Show Less' : 'Show More'}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          <button
            className={`${classes.showMore}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default SubTitles;
