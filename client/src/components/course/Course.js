import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import currencyConverter from '../../services/CurrencyConverter';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '2rem',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Course({ title, description, instructor, coursePrice, subject, courseId, numberOfHours, ratings, userCountry }) {
  const classes = useStyles();
  const [price,setPrice] = useState(coursePrice);
  const [currency,setCurrency] = useState("USD") 
  useEffect(()=>{
    const getPrice = async()=>{
      let {price,currency} =await currencyConverter(userCountry,coursePrice)
      setPrice(price);
      setCurrency(currency);
    }
    getPrice();
  },[])
  return (
    <div className={`${classes.root}`}>
      <Link
        to={`/course/${courseId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt='complex'
                src='https://www.patterns.dev/img/reactjs/react-logo@3x.svg'
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  {title || 'Course Title'}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {instructor || 'Course Instructor'}
                </Typography>
                <Typography gutterBottom variant='body2'>
                  {subject || 'Subject'}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {description || 'Course Description'}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {ratings || 'Course rating'}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {numberOfHours || 'Course hours'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' style={{ cursor: 'pointer' }}>
                  Add to Cart
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>${price} {currency}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <hr />
      </Link>
    </div>
  );
}

export default Course;
