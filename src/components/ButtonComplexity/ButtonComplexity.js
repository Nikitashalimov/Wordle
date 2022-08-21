import s from './ButtonComplexity.module.css';

const ButtonComplexity = ({ index, complexity, handleClick }) => {

	return (
		<button
			className={s.button_complexity}
			index={index}
			onClick={() => handleClick(index)}
		>
			{complexity}
		</button>
	);
}

export default ButtonComplexity;