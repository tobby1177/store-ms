export const fetchOrders = access_token => {
	return dispatch => {
		dispatch(fetchOrdersBegin());
		fetch ('/api/orders', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`
			}
		})
		.then(response => response.json())
		.then(json => {
			json.orders ?
			dispatch(fetchOrdersSuccess(json.orders)) :
			json.error && dispatch(fetchOrdersError(json.error));
		});
	}
};

export const FETCH_ORDERS_BEGIN = 'FETCH_ORDERS_BEGIN';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const fetchOrdersBegin = () => ({
	type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersSuccess = orders => ({
	type: FETCH_ORDERS_SUCCESS,
	orders
});

export const fetchOrdersError = error => ({
	type: FETCH_ORDERS_ERROR,
	error
});

