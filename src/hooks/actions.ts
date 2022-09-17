import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { cardsActions } from './../redux/cards/cards.slice';

const actions = {
	...cardsActions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}