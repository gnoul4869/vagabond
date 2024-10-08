import axios from 'axios';
import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_REFRESH,
    ORDER_LIST_SUCCESS,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
} from '../constants/orderConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const listOrders = (status, page, isAdmin) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.get(`${process.env.REACT_APP_MAIN_SERVER}/api/v1/orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                status,
                page,
                isAdmin,
            },
        });
        const { total, orders } = data;
        dispatch({ type: ORDER_LIST_SUCCESS, payload: { total, orders } });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const refreshOrders = (target) => (dispatch) => {
    dispatch({ type: ORDER_LIST_REFRESH, payload: target });
};

export const updateOrder = (orderID, status) => async (dispatch, getState) => {
    dispatch({ type: ORDER_UPDATE_REQUEST });

    try {
        const { token } = getState().auth.userInfo;
        const { data } = await axios.patch(
            `${process.env.REACT_APP_MAIN_SERVER}/api/v1/orders`,
            { orderID, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { order } = data;
        dispatch({ type: ORDER_UPDATE_SUCCESS, payload: order });
    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};
