import React from 'react';
import '../layouts/FooterNav.css';

const FooterNav = () => (
	<div className="FooterNav">
		<span>SpotDB © 2019</span>
		<a href="/terms"><span>Terms of Use</span></a>
		<a href="/privacy"><span>Privacy Policy</span></a>
		<a href="mailto:spotdb@outlook.com"><span>Leave Feedback</span></a>
	</div>
);

export default FooterNav;