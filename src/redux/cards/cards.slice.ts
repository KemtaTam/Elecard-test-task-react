import { getName } from './../../utils/utils';
import { ICard } from "./../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CardsState {
	cardsData: Array<ICard>;
	fullCardsData: Array<ICard>;
	removedCards: Array<number>;
}
const initialState: CardsState = {
	cardsData: [],
	fullCardsData: [],
	removedCards: JSON.parse(localStorage.getItem("removedCards") ?? "[]"),
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

		sortCardsDataByCategory(state, action: PayloadAction<string>) {
			state.cardsData = state.fullCardsData.filter(
				(card) => card.category === action.payload
			);
		},
		sortCardsDataByName(state, action: PayloadAction<string>) {
			let arrSort = state.fullCardsData;
			state.cardsData = arrSort.sort((a, b) => {
				let firstEl = getName(a[action.payload as keyof ICard] as string)
				let secondEl = getName(b[action.payload as keyof ICard] as string)
				return firstEl > secondEl ? 1 : -1;
			});
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
