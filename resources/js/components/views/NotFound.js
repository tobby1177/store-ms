import React from 'react';

import Navbar from '../Navbar';
import { Loader } from '../Loader';

const NotFound = () => (
	<main>
		<Navbar />
		<div
			className="d-flex align-items-center justify-content-center flex-column"
			style={{ height: 'calc(100vh - 57px)' }}
		>
			<Loader />
			<h1 className="display-3">404</h1>
			<p className="font-weight-bold">Page Not Found</p>
			<Loader />
		</div>
	</main>
);

export default NotFound;
