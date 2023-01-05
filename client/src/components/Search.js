import React, { useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Wrapper from '../assets/Wrappers/SearchWrapper';
import { Box } from '@material-ui/core';
// import { useSearchContext } from '../context/Search/searchContext';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
  },
}));

const Search = () => {
  const { courses } = useCourseContext();
  const classes = useStyles();
  const [state, setState] = useState({
    query: '',
    filteredCourses: [],
  });

  const navigate = useNavigate();
  const dataResult = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/results?query=${e.target.innerText}`);
    dataResult.current.style.display = 'none';
  };

  useEffect(() => {
    let mouseDownHandler = (e) => {
      if (dataResult.current && !dataResult.current.contains(e.target)) {
        dataResult.current.style.display = 'none';
      }
    };
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);

  const search = (term) => {
    const searchResults = {};

    const filteredCourses = [];
    courses.forEach((course) => {
      const title = course.title.toLowerCase().includes(term.toLowerCase());
      const subject = course.subject.toLowerCase().includes(term.toLowerCase());
      const createdBy = course.createdBy?.username;

      if (title && !searchResults[title]) {
        searchResults[title] = true;
        filteredCourses.push(course.title);
      }
      if (subject && !searchResults[subject]) {
        searchResults[subject] = true;
        filteredCourses.push(course.subject);
      }
      if (createdBy && !searchResults[createdBy]) {
        searchResults[createdBy] = true;
        filteredCourses.push(course.createdBy.username);
      }
    });
    console.log(filteredCourses);
    setState({
      query: term,
      filteredCourses,
    });
    // setQueriedCourses(filteredCourses);
  };

  const clearInput = () => {
    setState({
      query: '',
      filteredCourses: [],
    });
  };
  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/results?query=${e.target.searchInput.value}`);
    dataResult.current.style.display = 'none';
  }

  return (
    <Wrapper className='w-50' style={{ maxWidth: '500px' }}>
      <div className='search'>
        <div className='searchInputs position-relative'>
          <form onSubmit={handleSearchSubmit} className='w-100 d-block'>
            <input
              type='text'
              className='rounded rounded-5 w-100 px-2'
              placeholder='Search for a courses'
              value={state.query}
              name='searchInput'
              onChange={(e) => search(e.target.value)}
              onFocus={(e) => {
                if (dataResult.current)
                  dataResult.current.style.display =
                    state.filteredCourses.length > 0 ? 'block' : 'none';
              }}
            />
          </form>
          <div
            className='searchIcon position-absolute rounded rounded-5'
            style={{ right: '0px' }}
          >
            {courses.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id='clearBtn' onClick={clearInput} />
            )}
          </div>
        </div>
        {state.query !== '' && state.filteredCourses.length !== 0 && (
          <div className='dataResult' ref={dataResult}>
            {state.filteredCourses.slice(0, 15).map((value, idx) => {
              return (
                <Box
                  className={`${classes.item} dataItem`}
                  onClick={handleClick}
                  key={idx}
                >
                  <AiOutlineSearch
                    style={{
                      marginRight: '.7rem',
                      fontSize: '1.5rem',
                    }}
                  />
                  <p
                    style={{
                      marginTop: '1rem',
                      fontSize: '1.2rem',
                      fontWeight: '300',
                    }}
                  >
                    {value}
                  </p>
                </Box>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Search;
