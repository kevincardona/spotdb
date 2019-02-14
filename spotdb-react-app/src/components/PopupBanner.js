import React from 'react';
import '../layouts/PopupBanner.css';
import shortid from 'shortid';

const PopupBanner = ({ text }) => {
	const custom_id = shortid.generate();

	const onClosed = () => {
		var x = document.getElementById(custom_id); 
		x.classList.add("closed");
	};

	return (
		<div id={custom_id} className="warning">
			<div className="warning-text">
				{text}
			</div>
			<button onClick={onClosed} className="warning-close"></button>
		</div>
	);
};

export default PopupBanner;