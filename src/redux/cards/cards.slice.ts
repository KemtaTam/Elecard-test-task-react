import { ICard } from "./../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardsState {
	cardsData: Array<ICard>;
	fullCardsData: Array<ICard>;
	removedCards: Array<number>;
	currentSort: {
		sortCategory: string;
		sort: string;
	};
	minIndex: number;
	maxIndex: number;
	defaultPageSize: number;
}
const initialState: CardsState = {
	cardsData: [],
	fullCardsData: [],
	removedCards: JSON.parse(localStorage.getItem("removedCards") ?? "[]"),
	currentSort: {
		sortCategory: "",
		sort: "",
	},
	defaultPageSize: 8,
	minIndex: 0,
	maxIndex: 8,
};

export const cardsSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {
		setAllCardsData(state, action: PayloadAction<Array<ICard>>) {
			let payload = action.payload;
			for (let removedEl of state.removedCards) {
				payload = payload.filter((card) => card.timestamp !== removedEl);
			}
			state.cardsData = payload;
			state.fullCardsData = payload;
		},
		setTreeCardsData(state, action: PayloadAction<Array<ICard>>) {
			state.fullCardsData = action.payload;
		},
		setCurrentSort(state, action: PayloadAction<{ sortCategory: string; sort: string }>) {
			if (action.payload.sortCategory) {
				state.currentSort.sortCategory = action.payload.sortCategory;
			}
			if (action.payload.sort) {
				state.currentSort.sort = action.payload.sort;
			}
		},
		setMinIndex(state, action: PayloadAction<number>) {
			state.minIndex = action.payload;
		},
		setMaxIndex(state, action: PayloadAction<number>) {
			state.maxIndex = action.payload;
		},

		sortCardsDataByCategory(state, action: PayloadAction<string>) {
			state.cardsData = state.fullCardsData.filter(
				(card) => card.category === action.payload
			);
		},
		sortCardsData(state, action: PayloadAction<string>) {
			let arrSort = state.fullCardsData;
			state.cardsData = arrSort.sort((a, b) =>
				a[action.payload as keyof ICard] > b[action.payload as keyof ICard] ? 1 : -1
			);
		},

		removeCard(state, action: PayloadAction<number>) {
			state.fullCardsData = state.fullCardsData.filter(
				(card) => card.timestamp !== action.payload
			);
			state.cardsData = state.cardsData.filter((card) => card.timestamp !== action.payload);
			state.removedCards.push(action.payload);
			localStorage.setItem("removedCards", JSON.stringify(state.removedCards));
		},
		clearRemovedCards(state) {
			state.removedCards = [];
		},
	},
});

export const cardsActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
