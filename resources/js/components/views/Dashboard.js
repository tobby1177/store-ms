import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom';

import Navbar from '../Navbar';
import { loginSuccess } from '../../actions/auth';
import { fetchUser } from '../../actions/user';
import { PageLoading } from '../Loader';

class Dashboard extends Component {
	constructor () {
		super();

		this.state = {
			loginCheckComplete: false,
			userFetchComplete: false
		}
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
		this.props.dispatch(fetchUser(Cookies.get('access_token')));
		this.setState({ userFetchComplete: true });
	}

	render () {
		const { loginCheckComplete, userFetchComplete } = this.state;
		const { login, user, pageLoading } = this.props;
		return (
			loginCheckComplete &&
			!login ? <Redirect to="/" /> :
			pageLoading ? <PageLoading /> :
			userFetchComplete &&
			<main>
				<Navbar />
				<section className="container my-4">
					<div className="col-12 mb-sm-0">
						<img className="img-thumbnail mb-2 mx-auto mx-sm-0 d-block d-sm-inline-block mb-sm-4" src={`/storage/${user.avatar}`} style={{ width: 80, borderRadius: 40 }} />
						<h1 className="mx-3 d-sm-inline-block text-center">
							{ user.name }
						</h1>
					</div>
					<div className="col-12 d-flex justify-content-center align-items-center">
						<Link to='/orders' className="btn btn-dark mx-2">View Orders</Link>
					</div>
					<section className="col-sm-10 col-md-8 col-lg-6 mt-3 mt-sm-4 mx-auto">
						{ user.email &&
							<div className="card my-3">
								<div className="card-header">
									Email address
								</div>
								<div className="card-body">
									<p className="card-text">{ user.email }</p>
								</div>
							</div>
						}
						{ user.address && user.postal_code && user.city &&
							<div className="card my-3">
								<div className="card-header">
									Address
								</div>
								<div className="card-body">
									<p className="card-text">{ user.address }, { user.postal_code }, { user.city }</p>
								</div>
							</div>
						}
						{ user.card_number &&
							<div className="card my-3">
								<div className="card-header">
									Card number
								</div>
								<div className="card-body">
									<p className="card-text">{ user.card_number }</p>
								</div>
							</div>
						}
						{ user.card_number &&
							<div className="card my-3">
								<div className="card-header">
									CVV
								</div>
								<div className="card-body">
									<p className="card-text">{ user.cvv }</p>
								</div>
							</div>
						}
					</section>
				</section>
			</main>		
		)
	}
}

const mapDispatchToProps = state => ({
	login: state.auth.login,
	user: state.user.info,
	pageLoading: state.user.loading
});

export default connect(mapDispatchToProps)(Dashboard);
