import React from 'react';

import Navbar from './Navbar';

const Loader = () => (
	<div className="lds-ellipsis">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

const PageLoading = () => (
	<main>
		<Navbar />
		<div
			className="d-flex align-items-center justify-content-center flex-column"
			style={{ height: 'calc(100vh - 57px)' }}
		>
			<Loader />
		</div>
	</main>
);

export { Loader, PageLoading };
