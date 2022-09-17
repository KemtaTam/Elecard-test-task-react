import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ICard } from './../../models/models';

export const cardsAPI = createApi({
	reducerPath: "cards/api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://contest.elecard.ru/",
	}),
	endpoints: (build) => ({
		getCards: build.query<ICard[], void>({
			query: () => ({
				url: "frontend_data/catalog.json",
			}),
		}),
	}),
});

export const { useGetCardsQuery } = cardsAPI;
