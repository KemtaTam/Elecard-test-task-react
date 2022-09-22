import { Pagination } from "antd";
import { useEffect } from "react";

import { useGetCardsQuery } from "../../redux/cards/cards.api";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { CardEl } from "./CardEl/CardEl";
import { SortCards } from "./SortCards/SortCards";
import { ICard } from "../../models/models";
import { Preloader } from "../../Components/Preloader/Preloader";
import s from "./Cards.module.css";

export const Cards = () => {
	const { isLoading, isError, data } = useGetCardsQuery();

	const {
		setAllCardsData,
		clearRemovedCards,
		sortCardsDataByCategory,
		sortCardsData,
		setMinIndex,
		setMaxIndex,
	} = useActions();
	const { cardsData, currentSort, minIndex, maxIndex, defaultPageSize } = useAppSelector((state) => state.cards);

	useEffect(() => {
		if (data) setAllCardsData(data);
	}, [data]);

	const onChangePagination = (page: number, pageSize: number) => {
		const min = (page - 1) * pageSize;
		const max = page * pageSize;
		setMinIndex(min);
		setMaxIndex(max);
	};
	const resetHandler = () => {
		localStorage.removeItem("removedCards");
		clearRemovedCards();
		if (data) setAllCardsData(data);
		if (currentSort.sortCategory) {
			sortCardsDataByCategory(currentSort.sortCategory.toLowerCase());
		}
		if (currentSort.sort) {
			sortCardsData(currentSort.sort.toLowerCase());
		}
	};

	let sliceData: Array<ICard> = cardsData.slice(minIndex, maxIndex);
	let someData = sliceData?.map((card) => (
		<CardEl
			key={card.timestamp}
			image={card.image}
			category={card.category}
			filesize={card.filesize}
			timestamp={card.timestamp}
		/>
	));

	return (
		<div className={s.wrapper}>
			<div className={s.pagination_wrapper}>
				<Pagination
					defaultPageSize={defaultPageSize}
					total={cardsData?.length}
					showSizeChanger={false}
					onChange={onChangePagination}
				/>
			</div>

			<SortCards />

			<div className={s.bReset_wrapper}>
				<button className={[s.bReset, s.btn].join(" ")} onClick={resetHandler}>
					Reset
				</button>
			</div>

			{isLoading && <Preloader />}
			{isError && <div className={s.error}>Somethink went wrong...</div>}

			<div className={s.cards}>{someData}</div>
		</div>
	);
};
