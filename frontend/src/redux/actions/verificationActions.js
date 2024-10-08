import axios from 'axios';
import {
    VERIFICATION_CONFIRM_FAIL,
    VERIFICATION_CONFIRM_REQUEST,
    VERIFICATION_CONFIRM_SUCCESS,
    VERIFICATION_SEND_FAIL,
    VERIFICATION_SEND_REQUEST,
    VERIFICATION_SEND_SUCCESS,
    VERIFICATION_STATE_REFRESH,
} from '../constants/verificationConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const verifyEmail = (name, email, setStep) => async (dispatch) => {
    dispatch({ type: VERIFICATION_SEND_REQUEST });
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_MAIN_SERVER}/api/v1/verifications/verifyemail`,
            {
                name,
                email,
            }
        );
        dispatch({
            type: VERIFICATION_SEND_SUCCESS,
            payload: { message: data.message, status: data.status },
        });

        setStep(1);
    } catch (error) {
        dispatch({
            type: VERIFICATION_SEND_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const confirmEmail = (email, otp) => async (dispatch) => {
    dispatch({ type: VERIFICATION_CONFIRM_REQUEST });
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_MAIN_SERVER}/api/v1/verifications/confirmemail`,
            { email, otp }
        );
        dispatch({ type: VERIFICATION_CONFIRM_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: VERIFICATION_CONFIRM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const refreshVerification = (target) => (dispatch) => {
    dispatch({ type: VERIFICATION_STATE_REFRESH, payload: target });
};
