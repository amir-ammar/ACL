import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#1a1a1a',
    padding: theme.spacing(6),
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem',
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className={classes.list}>
            <p>Nerd Business</p>
            <p>Teach on Nerd</p>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
          <div className={classes.list}>
            <p>Courses</p>
            <p>Help and support</p>
            <p>Blog</p>
            <p>Investors</p>
          </div>
          <div className={classes.list}>
            <p>Terms</p>
            <p>Privacy Policy</p>
            <p>Cookie settings</p>
            <p>Sitemap</p>
            <p>Accessibility</p>
          </div>
        </div>
        {/* Inc */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: '300',
          }}
        >
          <p>© 2021 Nerd Business Inc.</p>
        </div>
      </footer>
      <Outlet />
    </>
  );
}

export default Footer;
