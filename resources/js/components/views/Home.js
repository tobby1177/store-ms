import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Navbar from '../Navbar';
import { loginSuccess } from '../../actions/auth';
import { fetchHomeItems } from '../../actions/homeItems';
import PostCard from '../PostCard';
import { PageLoading } from '../Loader';

class Home extends Component
{
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
		.then(json => json.login && this.props.dispatch(loginSuccess(json.login)));
		this.props.dispatch(fetchHomeItems());
	}

	render () {
		const { items, pageLoading } = this.props;
		return (
			pageLoading ? <PageLoading /> :
			<main>
				<Navbar />
				<section className="container my-1 my-sm-2 my-lg-4">
					<div className="row">
						{ items.map(
							item => (
								<PostCard
									key = { item.id }
									id = { item.id }
									name = { item.name }
									photo = { item.photo }
									category = { item.category }
									price = { item.price }
								/>
							)
						)}
					</div>
				</section>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	login: state.auth.login,
	items: state.home.items,
	pageLoading: state.home.loading
});

export default connect(mapStateToProps)(Home);
