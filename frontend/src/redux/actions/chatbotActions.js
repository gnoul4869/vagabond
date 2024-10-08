import {} from 'dotenv/config';
import axios from 'axios';
import {
    CHATBOT_GET_RESPONSE_FAIL,
    CHATBOT_GET_RESPONSE_REQUEST,
    CHATBOT_GET_RESPONSE_SUCCESS,
} from '../constants/chatbotConstants';

export const getChatbotResponse = (message) => async (dispatch) => {
    dispatch({ type: CHATBOT_GET_RESPONSE_REQUEST, payload: message });

    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_VAGABOT_SERVER}/api/v1/vagabot`,
            {
                message,
            }
        );

        const { response } = data;

        dispatch({ type: CHATBOT_GET_RESPONSE_SUCCESS, payload: response });
    } catch (error) {
        dispatch({
            type: CHATBOT_GET_RESPONSE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Tôi hiện tại đang gặp sự cố. Mong quý khách quay lại sao :(',
        });
    }
};
