import {combineReducers} from 'redux';
import auth from './auth';
import menu from './menu';
import weather from './weather';
import table from './table';
import sintez from './sintez';

const rootReducer = combineReducers({
	auth,
	menu,
	weather,
	table,
	sintez,
});

export default rootReducer;
