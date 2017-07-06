
export const SAVE_MESSAGES = 'SAVE_MESSAGES';



export function saveMessages(obj) {
	return function (dispatch, getState) {

		dispatch({
			type: 'SAVE_MESSAGES',
			obj
		});
	}
}

