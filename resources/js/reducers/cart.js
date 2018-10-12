import {
	FETCH_CART_BEGIN,
	FETCH_CART_SUCCESS,
	FETCH_CART_ERROR
} from '../actions/cart';

const initialState = {
	cart: [],
	error: null,
	loading: false
};

const cart = ( state = initialState, action ) => {
	switch (action.type) {
		case FETCH_CART_BEGIN:
			// Login authentication begins while loading
			// A fresh login authentication begins
			// Error and access token will become unknown
			return {
				...state,
				cart: initialState.cart,
				error: initialState.error,
				loading: true
			};
		case FETCH_CART_SUCCESS:
			// Login authentication is successful
			// No error will be displayed
			// Access token will be made known and stored
			// Loading will be stopped
			// Also logs in a "no user" upon logout
			return {
				...state,
				cart: action.cart,
				error: initialState.error,
				loading: initialState.loading
			};
		case FETCH_CART_ERROR:
			// Login authentication fails
			// Error will be displayed to client
			// Access token becomes unknown
			// Loading will be stopped
			return {
				...state,
				cart: initialState.cart,
				error: action.error,
				loading: initialState.loading
			};
		default:
			return state;
	}
}

export default cart;
