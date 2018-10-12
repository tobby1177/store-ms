import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom';

import Navbar from '../Navbar';
import { loginSuccess } from '../../actions/auth';
import { fetchOrders } from '../../actions/orders';
import { PageLoading } from '../Loader';
import PostCard from '../PostCard';

class Orders extends Component
{
	constructor () {
		super();

		this.state = {
			loginCheckComplete: false,
			userFetchComplete: false,
			ordersFetchComplete: false
		}
	}

	componentDidMount () {
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
		this.props.dispatch(fetchOrders(Cookies.get('access_token')));
		this.setState({ userFetchComplete: true });
	}

	render () {
		const { loginCheckComplete, userFetchComplete, ordersFetchComplete } = this.state;
		const { login, orders, pageLoading } = this.props;
		return (
			loginCheckComplete &&
			!login ? <Redirect to="/" /> :
			pageLoading ? <PageLoading /> :
			ordersFetchComplete ? <Redirect to="/orders" /> :
			userFetchComplete &&
			<main>
				<Navbar />
				{ orders && orders.length > 0 ?
					<section className="container mt-1 mt-sm-2 mt-lg-4 mb-4">
						<h2 className="font-weight-bold mt-4">Orders</h2>
						<hr />
						<div className="row">
							{ orders.map(
								order => (
									<PostCard
										key = { order.item.id }
										id = { order.item.id }
										name = { order.item.name }
										photo = { order.item.photo }
										category = { order.item.category }
										price = { order.item.price }
										quantity = { order.quantity }
										orderStatus = { order.status }
										orderedAt = { order.created_at }
									/>
								)
							)}
							<div className="col-12 d-flex justify-content-center mt-2">
								<Link to="/" className='btn btn-dark'>Continue shopping</Link>
							</div>
						</div>
					</section> :
					<section className="container d-flex align-items-center justify-content-center flex-column" style={{ height: 'calc(100vh - 60px)' }}>
						<h2 className="font-weight-bold mt-4">You haven't placed any order.</h2>
						<Link to="/" className='btn btn-dark'>Start shopping</Link>
					</section>
				}
			</main>
		)
	}
}

const mapDispatchToProps = state => ({
	login: state.auth.login,
	orders: state.orders.orders,
	pageLoading: state.orders.loading
});

export default connect(mapDispatchToProps)(Orders);
