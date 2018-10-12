import { combineReducers } from 'redux';
import auth from './auth';
import homeItems from './homeItems';
import user from './user';
import cart from './cart';
import orders from './orders';

export default combineReducers({
	auth,
	home: homeItems,
	user,
	cart,
	orders
});