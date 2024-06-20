import { ChangeEvent } from 'react';

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<label className="form-control w-full max-w-full">
			<label className="label label-text"> {props.title} </label>
			<input
				{...props} // Spread all the props to the input element
				type={props.type || "text"}
				placeholder={props.placeholder || "Type here"}
				className={`input input-bordered w-full max-w-full ${props.className}`}
				value={props.value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange? props.onChange(e) : ""}
			/>
		</label>
	);
}
