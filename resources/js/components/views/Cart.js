import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Navbar from '../Navbar';
import { PageLoading } from '../Loader';
import { loginSuccess } from '../../actions/auth';
import { fetchCart, fetchCartSuccess } from '../../actions/cart';
import { fetchOrdersSuccess } from '../../actions/orders';
import PostCard from '../PostCard';

class Cart extends Component
{
	constructor () {
		super();

		this.state = {
			loginCheckComplete: false,
			userFetchComplete: false,
			ordersFetchComplete: false
		}

		this.cartTotal = this.cartTotal.bind(this);
		this.handleCheckOut = this.handleCheckOut.bind(this);
	}

	componentDidMount() {
		const { login } = this.props;
		!login &&
		fetch ('/api/login/verify', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			}
		})
		.then(response => response.json())
		.then(json => {
			json.login && this.props.dispatch(loginSuccess(json.login));
			this.setState({ loginCheckComplete: true });
		});
		this.props.dispatch(fetchCart(Cookies.get('access_token')));
		this.setState({ userFetchComplete: true });
	}

	cartTotal () {
		const { cart } = this.props;
		let sum = 0;
		if ( cart && cart.length > 0 ) {
			for (let i = 0; i < cart.length; i++) {
				sum += cart[i].quantity * cart[i].price;
			}
		}
		return sum.toFixed(2);
	}

	handleCheckOut () {
		fetch(`/api/orders`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			}
		})
		.then(response => response.json())
		.then(json => {
			this.props.dispatch(fetchOrdersSuccess(json.orders));
			this.props.dispatch(fetchCartSuccess(null));
			this.setState({ ordersFetchComplete: true });
		});
	}

	render () {
		const { loginCheckComplete, userFetchComplete, ordersFetchComplete } = this.state;
		const { login, cart, pageLoading } = this.props;
		return (
			loginCheckComplete &&
			!login ? <Redirect to="/" /> :
			pageLoading ? <PageLoading /> :
			ordersFetchComplete ? <Redirect to="/orders" /> :
			userFetchComplete &&
			<main>
				<Navbar />
				{ cart && cart.length > 0 ?
					<section className="container my-1 my-sm-2 my-lg-4">
						<h2 className="font-weight-bold mt-4">Cart</h2>
						<hr />
						<div className="row">
							{ cart.map(
								item => (
									<PostCard
										key = { item.id }
										id = { item.id }
										name = { item.name }
										photo = { item.photo }
										category = { item.category }
										price = { item.price }
										quantity = { item.quantity }
									/>
								)
							)}
							<div className="col-12 d-flex justify-content-center mt-2">
								<Link to="/" className='btn btn-dark'>Continue shopping</Link>
							</div>
							<section className="col-12 text-center mb-4">
								<hr />
								<h1 className="font-weight-bold">
									Total: &nbsp;
									<span className="text-danger">
										&euro; { this.cartTotal() }
									</span>
								</h1>
								<button className="btn btn-dark" onClick={this.handleCheckOut}>Checkout</button>
							</section>
						</div>
					</section> :
					<section className="container d-flex align-items-center justify-content-center flex-column" style={{ height: 'calc(100vh - 60px)' }}>
						<h2 className="font-weight-bold mt-4">You have nothing in cart.</h2>
						<Link to="/" className='btn btn-dark'>Start shopping</Link>
					</section>
				}
			</main>
		)
	}
}

const mapDispatchToProps = state =>({
	login: state.auth.login,
	cart: state.cart.cart,
	pageLoading: state.cart.loading
});

export default connect(mapDispatchToProps)(Cart);
