import { Modal } from "antd";
import { useState } from "react";
import { ICard } from "../../../../models/models";
import s from "./CategoryEl.module.css";

type PropsType = {
	card: ICard;
};

export const CategoryEl: React.FC<PropsType> = ({ card }) => {
	const imgURL = "http://contest.elecard.ru/frontend_data/" + card.image;
	const date = new Date(card.timestamp).toLocaleDateString("ru-RU");

	const [open, setOpen] = useState(false);

	return (
		<div className={s.wrapper}>
			<Modal open={open} onCancel={() => setOpen(false)} footer={null} >
				<img className={s.img_modale} src={imgURL} alt="img" />
			</Modal>
			<img className={s.img} src={imgURL} onClick={() => setOpen(true)} alt="img" />
			<div className={s.information}>
				<p className={s.name}>{card.image}</p>
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
