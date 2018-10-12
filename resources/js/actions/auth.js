export const login = (email, password) => {
	return dispatch => {
		dispatch(loginBegin());
		email && password ?
		fetch ('/api/login', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
		.then(response => response.json())
		.then(json => {
			json.login ?
			dispatch(loginSuccess(json.login)) :
			json.error && dispatch(loginError(json.error));
		}) :
		dispatch(loginError('Input login credentials.'));
	}
};

export const LOGIN_BEGIN = 'LOGIN_BEGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const loginBegin = () => ({
	type: LOGIN_BEGIN
});

export const loginSuccess = login => ({
	type: LOGIN_SUCCESS,
	login
});

export const loginError = error => ({
	type: LOGIN_ERROR,
	error
});

