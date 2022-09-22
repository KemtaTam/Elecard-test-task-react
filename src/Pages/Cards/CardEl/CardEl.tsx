import { useActions } from "../../../hooks/actions";
import { useAppSelector } from "../../../hooks/redux";
import { ICard } from "../../../models/models";
import s from "./CardEl.module.css";

export const CardEl: React.FC<ICard> = ({ image, category, timestamp, filesize }) => {
	const imgURL = "http://contest.elecard.ru/frontend_data/" + image;
	const date = new Date(timestamp).toLocaleDateString("ru-RU");

	const { removeCard, setMinIndex, setMaxIndex } = useActions();
	const { cardsData, minIndex, maxIndex, defaultPageSize } = useAppSelector((state) => state.cards);

	const removeCardHandler = () => {
		removeCard(timestamp);

		// если я ищу по текущим индексам элементы и их нет, то уменьшить текущие индексы
		if (!cardsData[minIndex+1]) {
			setMinIndex(minIndex - defaultPageSize);
			setMaxIndex(maxIndex - defaultPageSize);
		}
	};

	return (
		<div className={s.wrapper}>
			<button className={s.button} onClick={removeCardHandler}>
				X
			</button>
			<div className={s.img} style={{ backgroundImage: "url(" + imgURL + ")" }}></div>
			<div className={s.disk}>
				<p className={s.name}>
					<b>{image}</b>
				</p>
				<div className={s.disk_wrapper}>
					<p>
						<span className={s.card_title}>Category: </span>
						{category}
					</p>
					<p>
						<span className={s.card_title}>Filesize: </span>
						{(filesize / 1024).toFixed(1)} kB
					</p>
					<p>
						<span className={s.card_title}>Date: </span>
						{date}
					</p>
				</div>
			</div>
		</div>
	);
};
