import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { makeStyles } from '@material-ui/core';
import certificate from '../assets/images/certificate.svg';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  certificate: {
    width: '45rem',
    height: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: '#fff',
    border: '1px solid #000',
    backgroundImage: `url(${certificate})`,
    '& span': {
      display: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'grey',
      '& span': {
        display: 'block',
        position: 'absolute',

        top: '50%',
        left: '46%',
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#fff',
      },
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12rem',
    marginRight: '3rem',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      fontSize: '1rem',
      fontWeight: '300',
      color: '#000',
    },
    '& strong': {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#000',
    },
  },

  footer: {
    textAlign: 'center',
  },
}));

const Certificate = () => {
  const inputRef = useRef(null);
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const downloadCertificate = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/svg');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <div className={classes.root}>
      <div
        ref={inputRef}
        className={`${classes.certificate}`}
        onClick={downloadCertificate}
      >
        <header className={`${classes.header}`}>
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: '#000',
            }}
          >
            Certificate of completion
          </h1>
        </header>
        <main className={`${classes.main}`}>
          <p>Awarded to</p>
          <p>
            <strong>{searchParams.get('username')}</strong>
          </p>
          <p>for successfully completing</p>
          <p>
            <strong>{searchParams.get('course')}</strong>
          </p>
        </main>
        <footer className={`${classes.footer}`}>
          <p>
            <strong>Issued by</strong>
          </p>
          <p>Nerd academy</p>
        </footer>
        <span>Download</span>
      </div>
    </div>
  );
};
export default Certificate;
