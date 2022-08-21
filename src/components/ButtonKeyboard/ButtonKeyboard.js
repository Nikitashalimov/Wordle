import cn from "classnames";

import s from './ButtonKeyboard.module.css';

const ButtonKeyboard = ({ text, onClick, buttonsKeyboard, buttonIndex }) => {
	let buttonKeyboardCheck = buttonsKeyboard[buttonIndex];

	return (
		<button
			className={cn(s.buttonKeyboard, {
				[s.buttonKeyboardTrue]: buttonKeyboardCheck === 'угадал',
				[s.buttonKeyboardFalse]: buttonKeyboardCheck === 'не угадал'
			})}
			onClick={() => onClick(text, buttonIndex)}
		>
			{text}
		</button>
	);
}

export default ButtonKeyboard;