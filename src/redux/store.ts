import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./cards/cards.slice";
import { cardsAPI } from "./cards/cards.api";

export const store = configureStore({
	reducer: {
		[cardsAPI.reducerPath]: cardsAPI.reducer,
		cards: cardsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
