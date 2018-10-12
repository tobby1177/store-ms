import {
	FETCH_ORDERS_BEGIN,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_ERROR
} from '../actions/orders';

const initialState = {
	orders: [],
	error: null,
	loading: false
};

const orders = ( state = initialState, action ) => {
	switch (action.type) {
		case FETCH_ORDERS_BEGIN:
			// Login authentication begins while loading
			// A fresh login authentication begins
			// Error and access token will become unknown
			return {
				...state,
				orders: initialState.orders,
				error: initialState.error,
				loading: true
			};
		case FETCH_ORDERS_SUCCESS:
			// Login authentication is successful
			// No error will be displayed
			// Access token will be made known and stored
			// Loading will be stopped
			// Also logs in a "no user" upon logout
			return {
				...state,
				orders: action.orders,
				error: initialState.error,
				loading: initialState.loading
			};
		case FETCH_ORDERS_ERROR:
			// Login authentication fails
			// Error will be displayed to client
			// Access token becomes unknown
			// Loading will be stopped
			return {
				...state,
				orders: initialState.orders,
				error: action.error,
				loading: initialState.loading
			};
		default:
			return state;
	}
}

export default orders;
