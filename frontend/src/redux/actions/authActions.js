import axios from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const { data } = await axios.post('/api/v1/auth/login', { email, password });
        const { userInfo } = data;
        dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (email, password, name, phoneNumber, address) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        await axios.post('/api/v1/users/register', {
            email,
            password,
            name,
            phoneNumber,
            address,
        });
        dispatch({
            type: REGISTER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: LOGOUT });
};
