import React from 'react';
import FilterField from './FilterField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
  price: {
    marginBottom: '5rem',
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  width: {
    width: '10rem',
  },
}));

const subjects = [
  'Machine Learning',
  'Web Development',
  'Data Science',
  'AI',
  'Programming',
  'Software Engineering',
  'Computer Science',
  'Cyber Security',
  'Cloud Computing',
  'Data Analysis',
  'Data Engineering',
  'Data Visualization',
  'Deep Learning',
  'Game Development',
  'Mobile Development',
  'Network Security',
  'Python',
  'React',
  'React Native',
  'Ruby on Rails',
  'SQL',
  'Statistics',
  'UI/UX',
  'Web Design',
  'Web Scraping',
  'Web Security',
  'Web Services',
  'Web Technologies',
  'Web Testing',
  'Web Tools',
];

export default function Filter({ onFilter }) {
  const classes = useStyles();

  const filter = (fields) => {
    console.log(fields);
  };

  return (
    <div>
      {/* <Paper elevation={3} className={`${classes.filter}`}> */}
      {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Subject</InputLabel>
          <Select
            native
            className={`${classes.width}`}
            onChange={onFilter}
            inputProps={{
              name: 'age',
              id: 'subject',
            }}
          >
            <option aria-label='None' value='' />
            {subjects.map((subject) => {
              return <option value={subject}>{subject}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Min rating</InputLabel>
          <Select
            native
            onChange={onFilter}
            className={`${classes.width}`}
            inputProps={{
              name: 'age',
              id: 'minRating',
            }}
          >
            <option aria-label='None' value='' />
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Max rating</InputLabel>
          <Select
            native
            onChange={onFilter}
            className={`${classes.width}`}
            inputProps={{
              name: 'age',
              id: 'maxRating',
            }}
          >
            <option aria-label='None' value='' />
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Min Price</InputLabel>
          <Select
            native
            className={`${classes.width}`}
            onChange={onFilter}
            inputProps={{
              name: 'age',
              id: 'minPrice',
            }}
          >
            <option aria-label='None' value='' />
            <option value={0}>free</option>
            <option value={10}>10</option>
            <option value={100}>100</option>
            <option value={1000}>1000</option>
            <option value={10000}>10000</option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='age-native-simple'>Max Price</InputLabel>
          <Select
            native
            onChange={onFilter}
            className={`${classes.width}`}
            inputProps={{
              name: 'age',
              id: 'maxPrice',
            }}
          >
            <option aria-label='None' value='' />
            <option value={0}>free</option>
            <option value={10}>10</option>
            <option value={100}>100</option>
            <option value={1000}>1000</option>
            <option value={10000}>10000</option>
          </Select>
        </FormControl> */}
      <FilterField title='Topic' options={subjects} onFilter={filter} />
      {/* </Paper> */}
    </div>
  );
}
