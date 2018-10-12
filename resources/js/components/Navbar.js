import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render () {
		const { login, cart } = this.props;
		return (
			<nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
				<div className='container'>
					<Link className="navbar-brand font-weight-bold" to="/">
						<img src='/storage/settings/September2018/Wk3zgKCxqWKgGKNrz5Ix.png' height="30" />
						<span className='position-relative ml-2' style={{ top: 3 }}>Store MS</span>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						{ login ?
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link className="nav-link" to="/cart">
										Cart
										{ cart && cart.length > 0 &&
											<span className="badge badge-light ml-2">{ cart.length }</span>
										}
									</Link>
								</li>
								<li className="nav-item dropdown">
									<span className="nav-link dropdown-toggle cursor-pointer" data-toggle="dropdown">
										{ login }&nbsp;
									</span>
									<div className="dropdown-menu">
											<Link className="dropdown-item" to="/dashboard">Dashboard</Link>
											<div className="dropdown-divider"></div>
											<Link className="dropdown-item" to="/logout">Logout</Link>
									</div>
								</li>
							</ul> :
							<ul className="navbar-nav ml-auto">
								<li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
									<Link className="nav-link" to="/login">Login</Link>
								</li>
								<li className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}>
									<Link className="nav-link" to="/register">Register</Link>
								</li>
							</ul>
						}
					</div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	login: state.auth.login,
	cart: state.cart.cart
});

export default connect(mapStateToProps)(Navbar);
