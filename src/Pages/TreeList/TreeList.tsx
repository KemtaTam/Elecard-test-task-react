import { useEffect, useState } from "react";
import { Category } from "./Category/Category";
import { useGetCardsQuery } from "../../redux/cards/cards.api";
import { useActions } from "../../hooks/actions";
import s from "./TreeList.module.css";
import { Preloader } from "../../Components/Preloader/Preloader";

export const TreeList = () => {
	const { isLoading, isError, data } = useGetCardsQuery();
	const { setTreeCardsData } = useActions();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (data) setTreeCardsData(data);
		
	}, [data]);

	const categories = [
		"animals",
		"business",
		"food",
		"health",
		"places",
		"science",
		"vehicle",
		"winter",
	];

	let arrOfCategory: Array<ReturnType<typeof Category>> = [];
	for (let i=0; i<categories.length; i++) {
		arrOfCategory.push(<Category key={i} category={categories[i]}/>);
	}

	return (
		<div className={s.wrapper}>
			{isLoading && <Preloader />}
			{isError && <div className={s.error}>Somethink went wrong...</div>}
			
			<div className={s.root} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "▼ " : "▷ "}Categories:
			</div>
			{isOpen && arrOfCategory }
		</div>
	);
};
