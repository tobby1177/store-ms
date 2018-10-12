export const fetchCart = access_token => {
	return dispatch => {
		dispatch(fetchCartBegin());
		fetch ('/api/cart', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`
			}
		})
		.then(response => response.json())
		.then(json => {
			json.cart ?
			dispatch(fetchCartSuccess(json.cart)) :
			json.error && dispatch(fetchCartError(json.error));
		});
	}
};

export const FETCH_CART_BEGIN = 'FETCH_CART_BEGIN';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_ERROR = 'FETCH_CART_ERROR';

export const fetchCartBegin = () => ({
	type: FETCH_CART_BEGIN
});

export const fetchCartSuccess = cart => ({
	type: FETCH_CART_SUCCESS,
	cart
});

export const fetchCartError = error => ({
	type: FETCH_CART_ERROR,
	error
});

