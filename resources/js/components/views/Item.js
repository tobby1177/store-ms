import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar';
import { loginSuccess } from '../../actions/auth';
import { PageLoading } from '../Loader';
import { fetchCartSuccess } from '../../actions/cart';

class Item extends Component
{
	constructor(props) {
		super(props);

		this.state = {
			item: [],
			pageLoading: true,
			quantity: 1,
			item_id: Number(props.match.params.item_id),
			in_cart: false,
			updatedCart: false
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.handleUpdateInCart = this.handleUpdateInCart.bind(this);
		this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
	}

	handleInput (e) {
		const t = e.target;
		t.value > 0 &&
		this.setState({ [t.id]: t.value });
	}

	handleAddToCart (e) {
		e.preventDefault();
		const { item_id, quantity } = this.state;
		fetch(`/api/cart`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			},
			body: JSON.stringify({ item_id, quantity })
		})
		.then(response => response.json())
		.then(json => {
			this.props.dispatch(fetchCartSuccess(json.cart));
			this.setState({ updatedCart: true });
		});
	}

	handleUpdateInCart (e) {
		e.preventDefault();
		const { item_id, quantity } = this.state;
		fetch(`/api/cart/${item_id}`, {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			},
			body: JSON.stringify({ item_id, quantity })
		})
		.then(response => response.json())
		.then(json => {
			this.props.dispatch(fetchCartSuccess(json.cart));
			this.setState({ updatedCart: true });
		});
	}

	handleDeleteFromCart (e) {
		e.preventDefault();
		const { item_id } = this.state;
		fetch(`/api/cart/${item_id}`, {
			method: 'delete',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			},
			body: JSON.stringify({ item_id })
		})
		.then(response => response.json())
		.then(json => {
			this.props.dispatch(fetchCartSuccess(json.cart));
			this.setState({ updatedCart: true });
		});
	}

	fetchItemData () {
		const { item_id } = this.state;
		fetch(`/api/items/${item_id}`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.then(json => this.setState({
			item: json.item,
			quantity: json.quantity,
			in_cart: json.in_cart,
			pageLoading: false
		}));
	}

	componentDidMount()
	{
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
			this.fetchItemData();
		});
		login && this.fetchItemData();
	}

	render() {
		const { item, pageLoading, quantity, updatedCart, in_cart } = this.state;
		const { login } = this.props;
		return (
			pageLoading ? <PageLoading /> :
			updatedCart ? <Redirect to="/cart" /> :
			<main>
				<Navbar />
				<section className="container my-2 my-sm-4">
					<div className="row">
						<header className="col-12">
							<h1>{ item.name }</h1>
						</header>
						<section className="col-lg-9 mx-auto my-4">
							<div className="row">
								<section className="col-lg d-flex align-items-start justify-content-center">
									<img className="img-thumbnail" src={`/storage/${item.photo}`} />
								</section>
								<section className="col-lg my-4 my-lg-0">
									<p className="pre-wrap">{ item.description }</p>
									<hr />
									<span>{ item.category }</span>
									<h3 className="float-right font-weight-bold">&euro; { item.price.toFixed(2) }</h3>
									<hr />
									<form className="col-12 row">
										<div className="form-group row col-6">
											<label className="mt-2" htmlFor="quantity">Quantity</label>
											<input
												type="number"
												className="form-control"
												id="quantity"
												placeholder="Quantity"
												min="1"
												onChange={this.handleInput}
												value={quantity}
											/>
										</div>
										{ login &&
											<div className="col-6 d-flex align-items-center">
												<div className="row">
													{ !in_cart &&
														<div className="col-12 my-1">
															<button onClick={this.handleAddToCart} className="btn btn-dark mx-2">
																Add to cart
															</button>
														</div>
													}
													{ in_cart &&
														<div className="col-12 my-1">
															<button onClick={this.handleUpdateInCart} className="btn btn-dark mx-2">
																Update in cart
															</button>
														</div>
													}
													{ in_cart &&
														<div className="col-12 my-1">
															<button onClick={this.handleDeleteFromCart} className="btn btn-dark mx-2">
																Delete from cart
															</button>
														</div>
													}
												</div>
											</div>
										}
									</form>
								</section>
							</div>
						</section>
					</div>
				</section>
			</main>
		)
	}
}

const mapDispatchToProps = state => ({
	login: state.auth.login,
	cart: state.cart.cart
});

export default connect(mapDispatchToProps)(Item);
