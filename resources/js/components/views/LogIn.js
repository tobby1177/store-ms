import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { PageLoading } from '../Loader';
import Navbar from '../Navbar';
import { login, loginSuccess } from '../../actions/auth';

class LogIn extends Component
{
	constructor () {
		super();
		
		this.state = {
			email: '',
			password: '',
			pageLoading: true
		}

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput (e) {
		const t = e.target;
		this.setState({ [t.id]: t.value });
	}

	handleSubmit (e) {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.dispatch(login(email, password));
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
			this.setState({ pageLoading: false });
		});
		login && this.setState({ pageLoading: false });
	}

	render () {
		const { email, password, pageLoading } = this.state;
		const { login, error, loading } = this.props;
		return (
			pageLoading ? <PageLoading /> :
			login ? <Redirect to="/" /> :
			<main>
				<Navbar />
				<div className="container">
					<div className="row">
						<form
							method="post"
							onSubmit={this.handleSubmit}
							className="col-md-6 col-lg-4 my-4 mx-auto"
						>
							<h1 className="font-weight-bold text-center">Login</h1>
							<hr />
							<div className="form-group">
								<label htmlFor="email">Email address</label>
								<input
									type="text"
									className="form-control"
									id="email"
									placeholder="Email address"
									onChange={this.handleInput}
									value={email}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Password"
									onChange={this.handleInput}
									value={password}
								/>
							</div>
							<button
								type="submit"
								className="mt-3 btn btn-dark"
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Login'}
							</button>
							<div className="text-center">
								<small className="badge badge-danger p-2 mt-3 align-self-center">{ error }</small>
							</div>
						</form>
					</div>
				</div>
			</main>
		)
	}
}

const mapStateToProps = state => ({
	login: state.auth.login,
	error: state.auth.error,
	loading: state.auth.loading
});

export default connect(mapStateToProps)(LogIn);
