import s from './ButtonOk.module.css';

const ButtonOk = ({ onClickEnter }) => {

	return (
		<button
			className={s.buttonOk}
			onClick={onClickEnter}
		>
			Enter
		</button>
	);
}

export default ButtonOk;