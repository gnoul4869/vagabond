import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productList, productDetails } from './reducers/productReducers';

const initialState = {
    productList: {
        loading: false,
        products: null,
    },
    productDetails: {
        loading: false,
        product: null,
    },
};

const reducer = combineReducers({
    productList,
    productDetails,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
