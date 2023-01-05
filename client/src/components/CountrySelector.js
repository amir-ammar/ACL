import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list';
import Select from 'react-select';

function CountrySelector({country,setCountry }) {
  const [value, setValue] = useState('Country');
  const options = useMemo(() => countryList().getData(), []);
  options.forEach((element, index) => {
    if (element.label === 'Israel') {
      element.label = 'Israel do you mean Palestine';
    }
  });

  const changeHandler = (value) => {
    setValue(value);
    setCountry(value);
  };
  return (
    <Select
      width={'100%'}
      options={options}
      value={value}
      onChange={changeHandler}
    />
  );
}

export default CountrySelector;
