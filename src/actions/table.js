
export const SAVE_TABLE_DATA = 'SAVE_TABLE_DATA';



export function saveTableData(obj) {
	return function (dispatch, getState) {

		dispatch({
			type: 'SAVE_TABLE_DATA',
			table: obj
		});
	}
}

