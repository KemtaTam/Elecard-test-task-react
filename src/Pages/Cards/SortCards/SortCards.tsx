import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useActions } from "../../../hooks/actions";
import s from "./SortCards.module.css";

export const SortCards = () => {
	const { sortCardsDataByCategory, sortCardsData, sortCardsDataByName } = useActions();

	const onChangeSortByCategory = (e: RadioChangeEvent) => {
		sortCardsDataByCategory(e.target.value.toLowerCase());
	};
	const onChangeSort = (e: RadioChangeEvent) => {
		if (e.target.value === "Image") sortCardsDataByName(e.target.value.toLowerCase());
		else sortCardsData(e.target.value.toLowerCase());
	};

	return (
		<div className={s.sort_wrapper}>
			<span>
				<b>Sort by:</b>
			</span>
			<Radio.Group onChange={onChangeSortByCategory}>
				<Radio value="Animals">Animals</Radio>
				<Radio value="Business">Business</Radio>
				<Radio value="Food">Food</Radio>
				<Radio value="Health">Health</Radio>
				<Radio value="Places">Places</Radio>
				<Radio value="Science">Science</Radio>
				<Radio value="Vehicle">Vehicle</Radio>
				<Radio value="Winter">Winter</Radio>
			</Radio.Group>
			<Radio.Group onChange={onChangeSort}>
				<Radio value="Timestamp">Date</Radio>
				<Radio value="Filesize">Filesize</Radio>
				<Radio value="Image">Name</Radio>
			</Radio.Group>
		</div>
	);
};
