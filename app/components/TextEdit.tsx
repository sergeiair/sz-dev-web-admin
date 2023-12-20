import React, { useState } from 'react';

interface TextEditProps {
	label: string;
	placeholder: string;
	type?: string;
	id: string;
	onChange: (value: string) => void;
	value?: string | null | undefined,
}

const TextEdit = ({label, value, placeholder, type, onChange, id}: TextEditProps) => {

	return (
		<div className="mb-3 py-3 flex flex-col items-start justify-start w-full ">
			<label className="block text-lg font-semibold mb-2" htmlFor={id}>
				{label}
			</label>
			<input
				className="w-full p-3 border-gray-200 rounded-md focus:outline-none  focus:border-gray-400"
				placeholder={placeholder}
				id={id}
				type={type ?? 'text'}
				value={value ?? ''}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default TextEdit;
