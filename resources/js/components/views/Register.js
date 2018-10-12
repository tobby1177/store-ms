import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar';
import { loginBegin, loginSuccess } from '../../actions/auth';

class Register extends Component
{
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			error: null,
			loading: false
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
		this.setState({ loading: true });
		const { name, email, password } = this.state;
		this.props.dispatch(loginBegin());
		fetch(`/api/register`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		})
		.then(response => response.json())
		.then(json => {
			json.login && this.props.dispatch(loginSuccess(json.login));
			json.error && this.setState({ error: json.error, loading: false });
		});
	}

	render () {
		const { name, email, password, error, loading } = this.state;
		const { login } = this.props;
		return (
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
							<h1 className="font-weight-bold text-center">Register</h1>
							<hr />
							<div className="form-group">
								<label htmlFor="name">Fullname</label>
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="Fullname"
									onChange={this.handleInput}
									value={name}
								/>
								{ error && error.name &&
									<small className="form-text text-danger">{ error.name[0] }</small>
								}
							</div>
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
								{ error && error.email &&
									<small className="form-text text-danger">{ error.email[0] }</small>
								}
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
								{ error && error.password &&
									<small className="form-text text-danger">{ error.password[0] }</small>
								}
							</div>
							<button
								type="submit"
								className="mt-3 btn btn-dark"
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Register'}
							</button>
						</form>
					</div>
				</div>
			</main>
		)
	}
}

const mapDispatchToProps = state => ({
	login: state.auth.login,
	loading: state.auth.loading
});

export default connect(mapDispatchToProps)(Register);
