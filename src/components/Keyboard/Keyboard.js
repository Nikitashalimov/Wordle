import ButtonKeyboard from '../ButtonKeyboard/ButtonKeyboard';
import s from './Keyboard.module.css';

const keyboardArray = (numStart, numEnd, buttonsKeyboard, onClick) => {
	const keyboard = ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"];
	let result = [];

	for (let i = numStart; i < numEnd + 1; i++) {
		result.push(
			<ButtonKeyboard
				key={`keyboard${i}`}
				buttonIndex = {i}
				buttonsKeyboard = {buttonsKeyboard}
				text={keyboard[i]}
				onClick={onClick}
			/>
		)
	}

	return result;
}


const Keyboard = ({ buttonsKeyboard, onClick }) => {

	return (
		<div className={s.keyboard}>
			<div className={s.keyboardString}>
				{keyboardArray(0, 11, buttonsKeyboard, onClick)}
			</div>
			<div className={s.keyboardString}>
				{keyboardArray(12, 22, buttonsKeyboard, onClick)}
			</div>
			<div className={s.keyboardString}>
				{keyboardArray(23, 31, buttonsKeyboard, onClick)}
			</div>
		</div>
	);
}

export default Keyboard;