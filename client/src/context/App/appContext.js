import React, { useContext, useState } from 'react';
import axios from 'axios';
import { backendApi } from '../../projectConfig';
import { useEffect } from 'react';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  alert: false,
  alertType: '',
  alertText: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => initialState);

  useEffect(() => {
    console.log('AppContext useEffect');
    const fetchState = async () => {
      const userFromLocalStorage = localStorage.getItem('user');
      const tokenFromLocalStorage = localStorage.getItem('token');

      setState({
        ...state,
        user: JSON.parse(userFromLocalStorage),
        token: tokenFromLocalStorage,
      });
    };
    fetchState();
  }, []);

  const setAlert = (type, text) => {
    setState({
      ...state,
      alert: true,
      alertText: text,
      alertType: type,
    });
  };

  function clearAlert() {
    setTimeout(
      () =>
        setState((prevState) => {
          return {
            ...prevState,
            alert: false,
            alertText: '',
            alertType: '',
          };
        }),
      3000
    );
  }

  const addToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const setup = async ({
    email,
    password,
    username,
    country,
    type,
    endPoint,
  }) => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    const url = `http://localhost:8080/api/v1/auth/${endPoint}`;

    try {
      let body = {
        email,
        password,
        country,
      };

      if (endPoint === 'register')
        body = {
          ...body,
          type,
          username,
        };

      const response = await axios.post(url, body);

      const { data } = response;
      const { token, user } = data;

      addToLocalStorage({ user, token });

      setState((prevState) => {
        return {
          ...prevState,
          user,
          token,
        };
      });

      return {
        msg: 'Successfully! Redirecting to home page...',
        type: true,
        admin: user?.type === 'Admin',
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        type: false,
      };
    }
  };

  const resetUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setState({
      ...state,
      user: null,
      token: null,
    });
  };

  const updateUser = async (user) => {
    try {
      const response = await axios.patch(
        'http://localhost:8080/api/v1/user/',
        {
          ...user,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const { data } = response;
      setState((prevState) => {
        return {
          ...prevState,
          user: data,
        };
      });
      addToLocalStorage({ user: data, token: state.token });
      return {
        type: true,
        msg: 'Profile Updated successfully',
      };
    } catch (error) {
      console.log(error);
      return {
        type: false,
        msg: error.response.data.msg,
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAlert,
        clearAlert,
        setup,
        resetUser,
        addToLocalStorage,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
