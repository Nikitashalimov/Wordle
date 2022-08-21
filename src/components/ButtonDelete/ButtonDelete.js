import s from './ButtonDelete.module.css';

const ButtonDelete = ({ onClickBackSpace }) => {

	return (
		<button
			onClick={onClickBackSpace}
			className={s.buttonDelete}>
			Back
		</button>
	);
}

export default ButtonDelete;