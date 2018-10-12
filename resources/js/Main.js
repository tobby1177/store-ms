import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import * as View from './components/views';

const store = createStore(rootReducer, applyMiddleware(thunk));

const ScrollToTop =  withRouter(
	class ScrollToTop extends Component {
		componentDidUpdate(prevProps) {
		  if (this.props.location !== prevProps.location) {
			 window.scrollTo(0, 0);
		  }
		}
	 
		render() {
		  return this.props.children;
		}
	}
);

const Main = () => (	
	<Provider store={store}>
		<BrowserRouter>
			<ScrollToTop>
				<Switch>
					<Route exact path='/' component={View.Home} />
					<Route exact path='/login' component={View.LogIn} />
					<Route exact path='/register' component={View.Register} />
					<Route exact path='/logout' component={View.Logout} />
					<Route exact path='/dashboard' component={View.Dashboard} />
					<Route exact path="/cart" component={View.Cart} />
					<Route exact path="/orders" component={View.Orders} />
					<Route path='/items/:item_id' component={View.Item} />
					<Route component={View.NotFound} />
				</Switch>
			</ScrollToTop>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
