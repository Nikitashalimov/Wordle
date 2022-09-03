import ButtonComplexity from '../../components/ButtonComplexity/ButtonComplexity';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { addBaseIndex, addSecretWord, addComplexity, addStartState, addStartInputStyleState, fetchWords } from '../../store/wordSlice';

import s from './StartPage.module.css'

const StartPage = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchWords());
	}, [dispatch]);

	const navigate = useNavigate();

	const { baseWords, status, error } = useSelector(state => state.words)

	const handlePushClick = (index) => {
		const rand = Math.floor(Math.random() * baseWords[index].array.length);
		const arr = baseWords[index].array;
		const secretWord = arr[rand];

		if (secretWord.length === 6) {
			let state = [[], [], [], [], [], []];
			let stateStyle = [
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', ''],
				['', '', '', '', '', '']
			];
			dispatch(addStartState(state));
			dispatch(addStartInputStyleState(stateStyle));
		} else if (secretWord.length === 5) {
			let state = [[], [], [], [], []];
			let stateStyle = [
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', ''],
				['', '', '', '', '']
			];
			dispatch(addStartState(state));
			dispatch(addStartInputStyleState(stateStyle));
		} else {
			let state = [[], [], [], []];
			let stateStyle = [
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', '']
			];
			dispatch(addStartState(state));
			dispatch(addStartInputStyleState(stateStyle));
		}

		dispatch(addBaseIndex(index));
		dispatch(addSecretWord(secretWord));
		dispatch(addComplexity(secretWord.length));

		navigate('/game');
	}

	return (
		<div className={s.main_page}>
			<div className={s.block_option}>
				{status === 'loading' &&
					<div className={s.spinner}></div>
				}

				{status === 'resolved' &&
					baseWords.map((item, index) => (
						<ButtonComplexity
							key={index}
							index={index}
							complexity={item.complexity}
							handleClick={handlePushClick}
						/>)
					)
				}

				{error && <h1 className={s.errorText}>Произошла ошибка, попробуйте зайти чуть позже</h1>}

			</div>
		</div>
	);
}

export default StartPage;