import React, { useContext, useState } from 'react';

const initialState = {
  queriedCourses: [],
};

const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const setQueriedCourses = (courses) => {
    setState({
      ...state,
      queriedCourses: courses,
    });
  };

  return (
    <SearchContext.Provider
      value={{
        ...state,
        setQueriedCourses,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  return useContext(SearchContext);
};

export { useSearchContext, SearchProvider };
