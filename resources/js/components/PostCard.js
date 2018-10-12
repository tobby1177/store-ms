import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ id, name, photo, category, price, quantity, orderStatus, orderedAt }) => (
	<div className="col-6 col-md-4 col-lg-3 p-1 p-sm-2">
		<Link to={`/items/${id}`} className="card no-decoration h-100">
			
			<div className="thumbnail">
				<img className="mx-auto p-3" src={`storage/${ photo }`} alt={ name } />
			</div>
			{ quantity &&
				<span
					className="badge badge-danger ml-2 mt-2 p-2 position-absolute"
					style={{ fontSize: 12 }}
				>
					x {quantity}
				</span>
			}
			{ orderStatus &&
				<span
					className={`badge badge-${
							orderStatus == 'pending' ? 'secondary' :
							orderStatus == 'confirmed' ? 'dark' :
							orderStatus == 'on-delivery' ? 'primary' :
							orderStatus == 'delivered' ? 'success' : 'danger'
						} mr-2 mt-2 p-2 position-absolute`
					}
					style={{ fontSize: 12, right: 0 }}
				>
					{orderStatus[0].toUpperCase() + orderStatus.slice(1)}
				</span>
			}
			<div className="card-body pt-0">
				<p className="card-title ellipsis clamp-2 font-weight-bold mb-0">{ name }</p>
				{ orderedAt &&
					<p className="card-text text-muted small mt-2 mb-0">
						<strong>Ordered on:</strong> { orderedAt }
					</p>
				}
			</div>
			<div className="card-footer text-muted">
				<small className="float-left">{ category }</small>
				<small className="float-right font-weight-bold">
					&euro; { price.toFixed(2) }
				</small>
			</div>
		</Link>
	</div>
	
);

export default PostCard;
