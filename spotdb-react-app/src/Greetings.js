import React from 'react';

const Greetings = ({firstName, lastName}) => (
	<div>
		Greetings <span className="stateful">{firstName} {lastName}</span>!
	</div>
);

export default Greetings;