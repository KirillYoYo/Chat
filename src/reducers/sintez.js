import {
	SAVE_MESSAGES,
} from '../actions/sintez';

const initialState = {
	items: [],
};

export default function table(state = initialState, action = {}) {
	switch (action.type) {
		case SAVE_MESSAGES:
			return {
				...state,
				obj: action.obj
			};

		default:
			return state;
	}
}
