import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { loginSuccess } from '../../actions/auth';
import { PageLoading } from '../Loader';

class Logout extends Component
{
	constructor() {
		super();

		this.state = {
			pageLoading: true
		};
	}

	componentDidMount() {
		const { login } = this.props;
		login &&
		fetch(`/api/logout`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': `Bearer ${Cookies.get('access_token')}`
			}
		})
		.then(response => response.json())
		.then(json => {
			this.props.dispatch(loginSuccess(json.login));
			this.setState({ pageLoading: false });
		});
		!login && this.setState({ pageLoading: false });
	}

	render() {
		const { pageLoading } = this.state;
		const { login } = this.props;
		return (
			pageLoading ? <PageLoading /> :
			!login && <Redirect to="/" />
		)
	}
}

const mapDispatchtoProps = state => ({
	login: state.auth.login
});

export default connect(mapDispatchtoProps)(Logout);
