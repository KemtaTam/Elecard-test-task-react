import { useActions } from "../../../hooks/actions";
import { ICard } from "../../../models/models";
import { getName } from "../../../utils/utils";
import s from "./CardEl.module.css";

export const CardEl: React.FC<ICard> = ({ image, category, timestamp, filesize }) => {
	const imgURL = "http://contest.elecard.ru/frontend_data/" + image;
	const date = new Date(timestamp).toLocaleDateString("ru-RU");

	const name = getName(image);
	const { removeCard } = useActions();

	const removeCardHandler = () => {
		removeCard(timestamp);
	};

	return (
		<div className={s.wrapper}>
			<button className={s.button} onClick={removeCardHandler}>
				X
			</button>
			<div className={s.img} style={{ backgroundImage: "url(" + imgURL + ")" }}></div>
			<div className={s.disk}>
				<p className={s.name}>
					<b>{name}</b>
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
