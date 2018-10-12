import {
	FETCH_USER_BEGIN,
	FETCH_USER_SUCCESS,
	FETCH_USER_ERROR
} from '../actions/user';

const initialState = {
	info: [],
	loading: false,
	error: null
}

const user = ( state = initialState, action ) => {
	switch (action.type) {
		case FETCH_USER_BEGIN:
			// User fetch begins while loading
			// A fresh login authentication begins
			// Errors will become unknown
			return {
				...state,
				info: initialState.info,
				loading: true,
				error: initialState.error
			};
		case FETCH_USER_SUCCESS:
			// User fetch is successful
			// No error will be displayed
			// Loading will be stopped
			return {
				...state,
				info: action.info,
				loading: initialState.loading,
				error: initialState.error
			};
		case FETCH_USER_ERROR:
			// User fetch fails
			// Error will be displayed to client
			// Loading will be stopped
			return {
				...state,
				info: initialState.info,
				error: action.error,
				loading: initialState.loading
			};
		default:
			return state;
	}
}

export default user;
