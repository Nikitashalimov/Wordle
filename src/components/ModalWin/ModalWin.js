import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { addSecretWord, addStartState } from '../../store/wordSlice';

import s from './ModalWin.module.css';



const ModalWin = ({ win, complexity, noWin, setButtonsKeyboard }) => {

	const { baseWords, secretWord } = useSelector(state => state.words)

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const restart = () => {
		let index;
		if (complexity === 6) {
			let state = [[], [], [], [], [], []];
			index = 2;
			dispatch(addStartState(state));
		} else if (complexity === 5) {
			let state = [[], [], [], [], []];
			index = 1;
			dispatch(addStartState(state));
		} else {
			let state = [[], [], [], []];
			index = 0;
			dispatch(addStartState(state));
		}

		const rand = Math.floor(Math.random() * baseWords[index].array.length);
		const arr = baseWords[index].array;
		const secretWord = arr[rand];

		dispatch(addSecretWord(secretWord));
		setButtonsKeyboard([]);
		noWin();
	}

	return (
		<div className={s.modal}>
			<div className={s.modalBody}>

				{win === "победа" &&
					<div className={s.textBox}>
						<p className={s.text}>
							Вы выйграли
						</p>
						<p className={s.text}>
							Это слово: {secretWord}
						</p>
					</div>

				}

				{win === "проигрыш" &&
					<div className={s.textBox}>
						<p className={s.text}>
							Вы проиграли!
						</p>
						<p className={s.text}>
							Загаданым словом было: {secretWord}
						</p>
					</div>
				}

				<div className={s.buttonBox}>
					<button
						className={s.button}
						onClick={() => navigate('https://github.com/Nikitashalimov/Wordle/')}
					>
						Поменять сложность
					</button>
					<button
						className={s.button}
						onClick={restart}
					>
						Попробовать еще
					</button>
				</div>
			</div>
		</div>

	);
}

export default ModalWin;