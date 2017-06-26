import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import weather from './weather';
import table from './table';

const rootReducer = combineReducers({
	auth,
	menu,
	weather,
	table,
});

export default rootReducer;
