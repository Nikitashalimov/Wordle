import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ButtonDelete from '../../components/ButtonDelete/ButtonDelete';
import ButtonOk from '../../components/ButtonOk/ButtonOk';
import Keyboard from '../../components/Keyboard/Keyboard';
import WordShield from '../../components/WordShield/WordShield';
import ModalWin from '../../components/ModalWin/ModalWin';
import s from './GamePage.module.css'

const GamePage = () => {

	// Запрос данных из Redux
	const { baseIndex, baseWords, secretWord, complexity, startState, startInputStyleState } = useSelector(state => state.words);

	// Переменная с массивами слов
	const wordsArray = baseWords[baseIndex].array

	// Переменная введенных букв на экране
	const [words, setWord] = useState(startState);
	// Переменная для обновления words
	let copyWords = [...words];
	// Переменная для рендера стилей введенных букв
	const [inputStyles, setInputStyles] = useState(startInputStyleState);
	// Переменная для обновления inputStyles
	let copyInputStyles = [...inputStyles];
	// Переменная для рендера стилей кнопок на клавиатуре
	const [buttonsKeyboard, setButtonsKeyboard] = useState([]);
	// Переменная для обновления inputStyles
	let copyButtonsKeyboard = [...buttonsKeyboard];
	// Переменная для фиксации индексов кнопок клавиатуры
	const [buttonsIndex, setButtonsIndex] = useState([]);
	// Переменная для обновления buttonsIndex
	let copyButtonsIndex = [...buttonsIndex];
	// Переменная номера строки для ввода
	const [numberString, setNumberString] = useState(0);
	// Переменная для объявление победы
	const [win, setWin] = useState();
	// Переменная для оповещения
	const [notification, setNotification] = useState('');

	const navigate = useNavigate();

	// Оповещение о наличии слова в базе
	const changeNotification = (message) => {
		setNotification(message);
		setTimeout(
			() => {
				setNotification('');
			}, 1000)
	}

	// Рендерим начальный массив строчек со словами, начальный массив со стилями для кнопок, инпутов и т.д
	const renderWord = () => {
		if (complexity === 6) {
			setWord([[], [], [], [], [], []]);
			setInputStyles([
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', '']
			]);
		} else if (complexity === 5) {
			setWord([[], [], [], [], []]);
			setInputStyles([
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', '']
			]);
		} else {
			setWord([[], [], [], []]);
			setInputStyles([
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', '']
			]);
		}
		setButtonsIndex([]);
		setButtonsKeyboard(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
		console.log(`Секретное слово: ${secretWord}`);
		console.log(wordsArray);
	}
	useEffect(() => {
		renderWord();
	}, [startState]);

	// Функция сброса победы
	const noWin = () => {
		setWin();
		setNumberString(0);
	}

	// Проверка правильности введенных букв
	const inputIsItTrue = () => {
		// Секретное слово разбиваем на массив
		let arrSecret = secretWord.split('');
		// Создаем массив для индексов
		let arrIndex = [];

		// Наполняем массив индексами
		for (let i = 0; i < arrSecret.length; i++) {
			arrIndex.push(i);
		}

		// Проверка на точное совпадение буквы
		for (let i = 0; i < arrIndex.length; i++) {
			if (words[numberString][i] === arrSecret[i]) {
				copyInputStyles[numberString][i] = 'угадал';
				setInputStyles(copyInputStyles);
				delete arrIndex[i];
				delete arrSecret[i];
			}
		}

		// Проверка остаточных букв
		for (let i = 0; i < arrIndex.length; i++) {
			let item = arrIndex[i];

			if (arrSecret.includes(words[numberString][item])) {
				copyInputStyles[numberString][item] = 'имеется';
				setInputStyles(copyInputStyles);
				delete arrIndex[i];
			} else {
				copyInputStyles[numberString][item] = 'не угадал';
				setInputStyles(copyInputStyles);
			}
		}
	}

	// Проверка правильности введенного слова
	const wordIsItTrue = () => {
		if (words[numberString].join('') === secretWord) {
			setWin('победа');
		} else if (numberString === complexity - 1) {
			setWin('проигрыш');
		} else {
			setNumberString(numberString + 1);
			setButtonsIndex([]);
		}
	}

	// Проверка кнопок клавиатуры
	const buttonIsItTrue = () => {
		let array = inputStyles[numberString];
		
		for (let i = 0; i < array.length; i++) {
			let buttonIndex = copyButtonsIndex[i];
			if (array[i] === 'угадал') {
				copyButtonsKeyboard[buttonIndex] = 'угадал';
			} else if (array[i] === 'имеется') {
				copyButtonsKeyboard[buttonIndex] = 'угадал';
			} else if (array[i] === 'не угадал') {
				copyButtonsKeyboard[buttonIndex] = 'не угадал';
			}
		}
		setButtonsKeyboard(copyButtonsKeyboard);
	}

	// Клик на букву
	const onClick = (text, buttonIndex) => {
		if ((numberString < complexity) && (words[numberString].length < complexity)) {
			copyWords[numberString].push(text.toLowerCase());
			copyButtonsIndex.push(buttonIndex);
			setButtonsIndex(copyButtonsIndex);
			setWord(copyWords);
		}
	}

	//Клик на BackSpace
	const onClickBackSpace = () => {
		copyWords[numberString].pop();
		copyButtonsIndex.pop();
		setWord(copyWords);
		setButtonsIndex(copyButtonsIndex);
	}

	//Клик на Enter
	const onClickEnter = () => {
		if ((numberString < complexity) && (words[numberString].length < complexity)) {
			// Если недостаточно букв
			changeNotification('Недостаточно букв');
		} else if (!wordsArray.includes(words[numberString].join(''))) {
			// Если нет такого слова в базе
			changeNotification('Нет такого слова в базе');
		} else if (
			// Если слово есть в базе, если не кончились попытки и если длина слова соответствует
			(wordsArray.includes(words[numberString].join('')))
			&& (numberString < complexity)
			&& (words[numberString].length === complexity)) {
			inputIsItTrue();
			wordIsItTrue();
			buttonIsItTrue();
		}
	}

	return (
		<div className={s.main_page}>

			<button
				className={s.button_menu}
				onClick={() => navigate('https://github.com/Nikitashalimov/Wordle/')}
			>
				Menu
			</button>

			<div className={s.game}>
				<WordShield words={words} inputStyles={inputStyles} />

				<div className={s.notification}>
					{notification}
				</div>

				<div className={s.keyboard}>
					<Keyboard buttonsKeyboard={buttonsKeyboard} onClick={onClick} />
					<div className={s.menuActive}>
						<ButtonDelete onClickBackSpace={onClickBackSpace} />
						<ButtonOk onClickEnter={onClickEnter} />
					</div>
				</div>

			</div>

			{win === "победа" &&
				<ModalWin win={win} complexity={complexity} noWin={noWin} setButtonsKeyboard={setButtonsKeyboard} />}

			{win === "проигрыш" &&
				<ModalWin win={win} complexity={complexity} noWin={noWin} setButtonsKeyboard={setButtonsKeyboard} />}

		</div>
	);
}

export default GamePage;