export const fetchUser = access_token => {
	return dispatch => {
		dispatch(fetchUserBegin());
		fetch ('/api/user', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`
			},
		})
		.then(response => response.json())
		.then(json => {
			json.info ?
			dispatch(fetchUserSuccess(json.info)) :
			json.error && dispatch(fetchUserError(json.error));
		})
	}
};

export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const fetchUserBegin = () => ({
	type: FETCH_USER_BEGIN
});

export const fetchUserSuccess = info => ({
	type: FETCH_USER_SUCCESS,
	info
});

export const fetchUserError = error => ({
	type: FETCH_USER_ERROR,
	error
});

