import React from 'react';

const TextField = ({ name, onChange, onBlur, error, label, placeholder, autoCapitalize }) => (
	<div className="TextField">
		<label className="form">
			{label}
			<input
				className="form-field"
				type="text"
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder ? placeholder : name}
				autoCapitalize={autoCapitalize}
			/>
			{error && <div className="error">{error}</div>}
		</label>
	</div>
);

export default TextField;