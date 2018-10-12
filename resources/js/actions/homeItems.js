export const fetchHomeItems = () => {
	return dispatch => {
		dispatch(fetchHomeItemsBegin());
		fetch ('/api/items?hidden=description', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then(response => response.json())
		.then(items => dispatch(fetchHomeItemsSuccess(items)))
	}
};

export const FETCH_HOME_ITEMS_BEGIN = 'FETCH_HOME_ITEMS_BEGIN';
export const FETCH_HOME_ITEMS_SUCCESS = 'FETCH_HOME_ITEMS_SUCCESS';
export const FETCH_HOME_ITEMS_ERROR = 'FETCH_HOME_ITEMS_ERROR';

export const fetchHomeItemsBegin = () => ({
	type: FETCH_HOME_ITEMS_BEGIN
});

export const fetchHomeItemsSuccess = items => ({
	type: FETCH_HOME_ITEMS_SUCCESS,
	items
});

export const fetchHomeItemsError = error => ({
	type: FETCH_HOME_ITEMS_ERROR,
	error
});
