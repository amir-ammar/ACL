import { Box, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AiOutlineDown } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
  Box: {
    width: '20rem',
    height: '3.5rem',
    margin: '1rem',
    padding: '0.5rem',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  title: {
    fontSize: '2rem',
    display: 'inline-block',
  },
  list: {
    width: '15rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    margin: '2rem',
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
}));

const FilterField = ({
  title,
  options,
  onFilter,
  optionOnClick,
  titleStyle,
  checkedOptions,
}) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [checked, setChecked] = useState(checkedOptions ? checkedOptions : {});

  const handleCheck = async (e) => {
    onFilter(e.target.name, title, e.target.checked);
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  // useEffect(() => {
  //   const checkedOptions = JSON.parse(localStorage.getItem('checkedSubtitles'));
  //   const checkedOptionsObj = checkedOptions?.reduce((obj, item) => {
  //     obj[item] = true;
  //     return obj;
  //   }, {});

  //   setChecked(checkedOptionsObj ? checkedOptionsObj : {});
  // }, []);

  return (
    <>
      <Box
        component='aside'
        className={`${classes.Box}`}
        onClick={() => setVisible(!visible)}
      >
        <h1 className={`${classes.title}`} style={titleStyle}>
          {title}
        </h1>
        <AiOutlineDown
          style={{ transform: visible ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </Box>
      {visible && (
        <div className={`${classes.list}`}>
          {options
            .map((subject, index) => (
              <Box key={index}>
                <Checkbox
                  name={typeof subject === 'object' ? `${index + 1}` : subject}
                  onChange={handleCheck}
                  checked={
                    typeof subject === 'object'
                      ? checked[index + 1]
                        ? checked[index + 1]
                        : false
                      : checked[subject]
                      ? checked[subject]
                      : false
                  }
                />
                <label
                  onClick={optionOnClick}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {subject}
                </label>
              </Box>
            ))
            .slice(0, showMore ? options.length : 5)}

          {options.length > 5 && (
            <button
              className={`${classes.showMore}`}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FilterField;
