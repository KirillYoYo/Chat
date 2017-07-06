import {
	SAVE_MESSAGES,
} from '../actions/sintez';

const initialState = {
	messages: [],
};

export default function sintez(state = initialState, action = {}) {
	switch (action.type) {
		case SAVE_MESSAGES:
			const new_items = state.messages;
			new_items.push( action.obj);

			return {
				...state,
				messages: new_items
			};

		default:
			return state;
	}
}
