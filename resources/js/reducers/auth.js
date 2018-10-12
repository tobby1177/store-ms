import {
	LOGIN_BEGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR
} from '../actions/auth';

const initialState = {
	login: null,
	error: null,
	loading: false
};

const auth = ( state = initialState, action ) => {
	switch (action.type) {
		case LOGIN_BEGIN:
			// Login authentication begins while loading
			// A fresh login authentication begins
			// Error and access token will become unknown
			return {
				...state,
				login: initialState.login,
				error: initialState.error,
				loading: true
			};
		case LOGIN_SUCCESS:
			// Login authentication is successful
			// No error will be displayed
			// Access token will be made known and stored
			// Loading will be stopped
			// Also logs in a "no user" upon logout
			return {
				...state,
				login: action.login,
				error: initialState.error,
				loading: initialState.loading
			};
		case LOGIN_ERROR:
			// Login authentication fails
			// Error will be displayed to client
			// Access token becomes unknown
			// Loading will be stopped
			return {
				...state,
				login: initialState.login,
				error: action.error,
				loading: initialState.loading
			};
		default:
			return state;
	}
}

export default auth;
