import styles from './app.module.css';
import { useState } from 'react';
import './index.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите новое значение:');
		console.log(promptValue);

		if (promptValue) {
			if (promptValue.length < 3) {
				setError('Значение должно содержать минимум 3 символа.');
				setValue('');
			} else {
				setValue(promptValue);
				setError('');
			}
		}
	};

	const isValueValid = value.length >= 3;

	const onAddButtonClick = () => {
		if (isValueValid) {
			const id = Date.now();
			setList((prevList) => [...prevList, { id, value }]);
			setValue('');
			setError('');
		}
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>{value}</code>: "
					<output className={styles['current-value']}></output>"
				</p>
				<div className={styles.error}>{error}</div>
				<div className={styles['buttons-container']}>
					<button onClick={onInputButtonClick} className={styles.button}>
						Ввести новое
					</button>
					<button
						onClick={onAddButtonClick}
						className={styles.button}
						disabled={!isValueValid}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
					<ul className={styles.list}>
						{list.length > 0 ? (
							list.map((item) => <li key={item.id}>{item.value}</li>)
						) : (
							<li className={styles['list-item']}>Первый элемент</li>
						)}
					</ul>
				</div>
			</div>
		</>
	);
};
