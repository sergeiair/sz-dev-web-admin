import { ClientStorage, ClientStorageKeys } from '~/storage/client-storage';

interface ButtonProps {
	label: string;
	color: ButtonColor;
	onClick: () => void;
}

export enum ButtonColor {
	RED = 'red',
	GREEN = 'green',
	YELLOW = 'yellow',
	BLUE = 'blue',
}

const Button = ({label, onClick, color}: ButtonProps) => {

	const baseClasses = 'mx-auto mt-6 w-full text-white font-bold py-2 px-6 border-b-4 rounded';
	const colorClasses = `bg-${color}-500 hover:bg-${color}-400  border-${color}-700 hover:border-${color}-500`;

	return (
		<button
			className={`${baseClasses} ${colorClasses}`}
			onClick={onClick}>
				{label}
		</button>
	);
}

export default Button
