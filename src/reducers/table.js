import {
	SAVE_TABLE_DATA,
} from '../actions/table';

const initialState = {
	items: [],
	isLoad: false,
	loading: false,
	table: {},
};

export default function table(state = initialState, action = {}) {
	switch (action.type) {
		case SAVE_TABLE_DATA:
			const new_items = state.items.concat(action.table.data.dataSource);
			const new_data = state.table;
			new_data["key"] =  action.table.component;
			new_data[action.table.component] =  action.table;

			new_data[action.table.component].data.dataSourse = new_items;
			return {
				...state,
				table: new_data
			};
		default:
			return state;
	}
}
