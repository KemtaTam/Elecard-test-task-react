import { CategoryEl } from "./CategoryEl/CategoryEl";
import { useAppSelector } from "../../../hooks/redux";
import { useState } from "react";
import s from "./Category.module.css";

type PropsType = {
	category: string;
};
export const Category: React.FC<PropsType> = ({ category }) => {
	const { fullCardsData } = useAppSelector((state) => state.cards);
	const [isOpen, setIsOpen] = useState(false);

	const filteredData = fullCardsData.filter((card) => card.category === category);

	return (
		<div className={s.wrapper}>
			<div className={s.category} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "▼ " : "▷ "}
				{/* чтобы сделать первую букву заглавной */}
				{category.charAt(0).toUpperCase() + category.slice(1)}:
			</div>
			<div className={s.categoryEl_wrapper}>
				{isOpen && filteredData?.map((card) => <CategoryEl key={card.timestamp} card={card} />)}
			</div>
		</div>
	);
};
