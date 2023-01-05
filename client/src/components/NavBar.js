import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Search from './Search';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/App/appContext';
import { Box, Button, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  name: {
    borderRadius: '15px',
    padding: '5px 15px',
    color: 'white',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    lineHeight: '19px',
    textDecoration: 'none',
    '&:hover': {
      color: 'grey',
    },
  },
  nav: {
    display: 'block',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  profileIcon: {
    minWidth: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  profileList: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '12vh',
    right: '2rem',
    width: '15rem',
    backgroundColor: 'white',
    borderRadius: '3px',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    padding: '1rem',
  },
  profileListHeader: {
    display: 'flex',
  },
  profileListHeaderInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '1.5rem',
  },
  profileListBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& a': {
      textDecoration: 'none',
      fontFamily: 'sans-serif',
      color: 'black',
      fontSize: '1rem',
      fontWeight: '350',
      padding: '0.5rem 0',
      '&:hover': {
        color: 'rgba(0,0,0,0.5)',
      },
    },
    marginLeft: '1.5rem',
  },
  profileListItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem 0',
    '&:hover': {
      color: 'rgba(0,0,0,0.5)',
    },
  },

  identity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    lineHeight: '19px',
    textDecoration: 'none',
    '&:hover': {
      color: 'grey',
    },
    marginRight: '1rem',
    padding: '0.5rem 1rem',
  },
}));

const languages = [
  'Arabic',
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Russian',
  'Chinese',
  'Japanese',
  'Korean',
  'Other',
];

function NavBar() {
  const classes = useStyles();
  const { user, resetUser } = useAppContext();
  const profileList = useRef();
  const navigate = useNavigate();
  const [showProfileList, setShowProfileList] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    let mouseDownHandler = (e) => {
      if (profileList.current && !profileList.current.contains(e.target)) {
        setShowProfileList(false);
      }
    };
    document.addEventListener('mousedown', mouseDownHandler);

    return () => {
      document.removeEventListener('mousedown', mouseDownHandler);
    };
  });

  const handleLogout = () => {
    console.log('logout');
    resetUser();
    navigate('/landing');
  };

  const expand = 'xxl';
  return (
    <>
      <Navbar
        key={expand}
        bg='light'
        expand={expand}
        className={`py-2 bg-dark ${classes.nav}`}
        fixed='top'
        size='lg'
      >
        <Container fluid>
          <Link to='/' className={`${classes.name}`}>
            <i
              className='fa fa-graduation-cap'
              style={{ fontSize: '2rem', marginRight: '0.5rem' }}
            />
            Nerd Academy
          </Link>
          <Search />
          {user && (
            <>
              <div
                className={`${classes.profileIcon}`}
                onClick={() => setShowProfileList(!showProfileList)}
              >
                {user?.username.slice(0, 2).toUpperCase()}
              </div>
              {user && showProfileList && (
                <div className={`${classes.profileList}`} ref={profileList}>
                  <div className={`${classes.profileListHeader}`}>
                    <div
                      className={`${classes.profileIcon}`}
                      style={{ backgroundColor: 'black', color: 'white' }}
                    >
                      <Link to='/profile'>
                        {user?.username.slice(0, 2).toUpperCase()}
                      </Link>
                    </div>
                    <div className={`${classes.profileListHeaderInfo}`}>
                      <p
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          marginBottom: '0',
                        }}
                      >
                        {user?.username.slice(0, 10)}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          width: '10rem',
                          fontWeight: '300',
                          marginBottom: '0',
                          overflow: 'hidden',
                        }}
                      >
                        {user?.email.slice(0, 18)}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      margin: '1rem 0',
                    }}
                  ></div>
                  <div className={`${classes.profileListBody}`}>
                    <Link to='/profile'>
                      <span className={`${classes.profileListItem}`}>
                        <i
                          className='fas fa-user'
                          style={{ marginRight: '0.5rem' }}
                        ></i>

                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '350',
                            marginBottom: '0',
                            marginLeft: '0.5rem',
                          }}
                        >
                          Profile
                        </p>
                      </span>
                    </Link>
                    <Box
                      onClick={handleLogout}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <span className={`${classes.profileListItem}`}>
                        <i
                          className='fas fa-sign-out-alt'
                          style={{ marginRight: '0.5rem' }}
                        ></i>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: '350',
                            marginBottom: '0',
                            marginLeft: '0.5rem',
                          }}
                        >
                          Logout
                        </p>
                      </span>
                    </Box>
                  </div>
                </div>
              )}
            </>
          )}

          {!user && (
            <div className={classes.identity}>
              <Link to='/login' className={classes.btn}>
                Login
              </Link>
              <Link to='/register' className={classes.btn}>
                Signup
              </Link>
              <div
                className={classes.btn}
                onClick={() => setOpenLanguages(true)}
                style={{ cursor: 'pointer' }}
              >
                <i className='fas fa-globe'></i>
              </div>
              {openLanguages && (
                <Select
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  open={openLanguages}
                  onClose={() => setOpenLanguages(false)}
                  onOpen={() => setOpenLanguages(true)}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {languages.map((language) => (
                    <MenuItem value={language}>{language}</MenuItem>
                  ))}
                </Select>
              )}
            </div>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
