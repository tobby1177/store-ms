import {
	FETCH_HOME_ITEMS_BEGIN,
	FETCH_HOME_ITEMS_SUCCESS,
	FETCH_HOME_ITEMS_ERROR
} from '../actions/homeItems';

const initialState = {
	items: [],
	error: null,
	loading: false
}

const homeItems = ( state = initialState, action ) => {
	switch (action.type) {
		case FETCH_HOME_ITEMS_BEGIN:
			// Items fetch begins while loading
			// No item will be displayed
			// No error will be displayed
			return {
				...state,
				items: [],
				error: null,
				loading: true
			};
		case FETCH_HOME_ITEMS_SUCCESS:
			// Items fetch is successful
			// No error will be displayed
			// Loading will be stopped
			return {
				...state,
				items: action.items,
				error: null,
				loading: false
			};
		case FETCH_HOME_ITEMS_ERROR:
			// Items fetch fails
			// Error will be displayed to client
			// Loading will be stopped
			return {
				...state,
				items: [],
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
}

export default homeItems;
