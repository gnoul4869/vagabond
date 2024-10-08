import {} from 'dotenv/config';
import axios from 'axios';
import { INTEREST_ADD_FAIL, INTEREST_ADD_SUCCESS } from '../constants/interestConstants';

const errorMessage = 'Đã có lỗi xảy ra. Bạn vui lòng thử lại sau ít phút nữa';

export const addInterest = (productID) => async (dispatch, getState) => {
    const { userInfo } = getState().auth;

    let userInterests = getState().interest.userInterests;

    if (userInfo) {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_MAIN_SERVER}/api/v1/interests`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            if (data?.userInterests.length !== 0) {
                userInterests = data.userInterests;
            }
        } catch (error) {
            dispatch({
                type: INTEREST_ADD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : errorMessage,
            });
        }
    }

    const existInterest =
        userInterests.length !== 0 && userInterests.find((item) => item.product === productID);

    if (existInterest) {
        existInterest.points++;

        userInterests.forEach((element) => {
            if (element !== existInterest) {
                element.points--;
                if (element.points <= 0) {
                    userInterests = userInterests.filter((item) => item !== element);
                }
            }
        });

        userInterests = userInterests.map((item) =>
            item === existInterest ? existInterest : item
        );
    } else {
        if (userInterests.length !== 0) {
            userInterests.forEach((element) => {
                element.points--;
                if (element.points <= 0) {
                    userInterests = userInterests.filter((item) => item !== element);
                }
            });
        }

        const newInterest = {
            product: productID,
            points: Number(process.env.REACT_APP_DEFAULT_INTEREST_POINTS),
        };
        userInterests = [...userInterests, newInterest];
    }

    if (userInfo) {
        try {
            await axios.post(
                `${process.env.REACT_APP_MAIN_SERVER}/api/v1/interests`,
                { products: userInterests },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
        } catch (error) {
            dispatch({
                type: INTEREST_ADD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : errorMessage,
            });
        }
    }

    dispatch({ type: INTEREST_ADD_SUCCESS, payload: userInterests });

    localStorage.setItem('userInterests', JSON.stringify(getState().interest.userInterests));
};
