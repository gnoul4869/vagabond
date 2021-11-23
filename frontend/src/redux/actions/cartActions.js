import axios from 'axios';
import {
    CART_ADD_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_REMOVE_ITEM,
    CART_STATE_REFRESH,
    CART_UPDATE_FAIL,
    CART_UPDATE_REQUEST,
    CART_UPDATE_SUCCESS,
} from '../constants/cartConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const addToCart = (productID, qty, history) => async (dispatch, getState) => {
    dispatch({ type: CART_ADD_ITEM_REQUEST, payload: productID });

    const loadingItems = getState().cart.loadingItems;
    if (loadingItems.includes(productID)) {
        try {
            const { data } = await axios.get(`/api/v1/products/${productID}`);
            const { product } = data;

            dispatch({
                type: CART_ADD_ITEM_SUCCESS,
                payload: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    countInStock: product.countInStock,
                    weight: product.weight,
                    images: product.images,
                    qty,
                },
            });

            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

            if (history) {
                history.push('/cart');
            }
        } catch (error) {
            dispatch({
                type: CART_ADD_ITEM_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : errorMessage,
            });
        }
    }

    dispatch({ type: CART_STATE_REFRESH });
};

export const updateCart = () => async (dispatch, getState) => {
    dispatch({ type: CART_UPDATE_REQUEST });

    try {
        const cartItems = getState().cart.cartItems;
        const productIDs = cartItems.map((item) => item._id);
        if (productIDs.length !== 0) {
            const { data } = await axios.get('/api/v1/products', { params: { productIDs } });
            const { products } = data;
            dispatch({ type: CART_UPDATE_SUCCESS, payload: products });
        } else {
            dispatch({
                type: CART_UPDATE_FAIL,
                payload: 'Giỏ hàng của bạn còn trống',
            });
        }
    } catch (error) {
        dispatch({
            type: CART_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : errorMessage,
        });
    }
};

export const removeFromCart = (productID) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productID });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
