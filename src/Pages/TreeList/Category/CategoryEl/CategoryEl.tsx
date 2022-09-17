import { ICard } from "../../../../models/models";
import { getName } from "../../../../utils/utils";
import s from "./CategoryEl.module.css";

type PropsType = {
	card: ICard;
};
export const CategoryEl: React.FC<PropsType> = ({ card }) => {
	const imgURL = "http://contest.elecard.ru/frontend_data/" + card.image;
	const date = new Date(card.timestamp).toLocaleDateString("ru-RU");
	const name = getName(card.image);

	return (
		<div className={s.wrapper}>
			<a href={imgURL} target="_blank" rel="noreferrer">
				<img className={s.img} src={imgURL} alt="img" />
			</a>
			<div className={s.information}>
				<p className={s.name}>{name}</p>
				<div className={s.disk_wrapper}>
					<p>
						<span className={s.card_title}>Category: </span>
						{card.category}
					</p>
					<p>
						<span className={s.card_title}>Filesize: </span>
						{(card.filesize / 1024).toFixed(1)} kB
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
