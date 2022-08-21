import { useSelector } from 'react-redux';
import cn from "classnames";

import s from './WordShield.module.css';

const wordLine = (numberLine, words, inputStyles, complexity) => {
	const result = [];


	for (let i = 0; i < complexity; i++) {
		const word = words[numberLine];
		let inputCheck = inputStyles[i];

		result.push(
			<div
				className={cn(s.inputLetter, {
					[s.inputTrue]: inputCheck === 'угадал',
					[s.inputFalse]: inputCheck === 'не угадал',
					[s.inputExist]: inputCheck === 'имеется'
				})}
				key={`input-${numberLine}-${i}`
				}
			>
				<span className={s.inputText}>
					{word[i]}
				</span>
			</div >

		);
	}

	return result;
};

const allWordLine = (words, inputStyles, complexity) => {

	const result = [];

	for (let i = 0; i < complexity; i++) {
		result.push(
			<div
				key={`wordLine-${i}`}
				className={s.inputString}>
				{wordLine(i, words, inputStyles[i], complexity)}
			</div>

		);
	}

	return result;
};

const WordShield = ({ words, inputStyles }) => {
	const { complexity } = useSelector(state => state.words);

	return (
		<div className={s.word}>
			{allWordLine(words, inputStyles, complexity)}
		</div>
	);
}

export default WordShield;