import api from '../utils/api';
import { setAlert } from './alert';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

// Login User
export const login = (login, password) => async dispatch => {
    const body = { login, password };
  
    try {
      const res = await api.put('/user', body);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      // dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
  
  // Logout
  export const logout = () => ({ type: LOGOUT });