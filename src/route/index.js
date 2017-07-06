import React, {Component} from 'react';
import {Route, IndexRedirect} from 'react-router';
import {AppContainer} from 'react-hot-loader';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Form from '../views/Form';
import Table from '../views/Table';
import Employees from '../views/Employees';
import Departments from '../views/Departments';
import Page2 from '../views/Page2';
import Weather from '../views/Weather';
import CssrTable from '../views/Cssr-table';
import Sintez from '../views/Sintez-messages';

const validate = function (next, replace, callback) {
	const isLoggedIn = !!window.localStorage.getItem('uid')
	if (!isLoggedIn && next.location.pathname != '/login') {
		replace('/login')
	}
	callback()
}

const routes = (
	<Route path="/" onEnter={validate}>
		<IndexRedirect to="sintez"/>
		<Route component={App}>
			<Route path="weather" component={Weather} />
			<Route path="home" component={Home}/>
			<Route path="form" component={Form}/>
			<Route path="table" component={Table}/>
			<Route path="page2" component={Page2}/>
			<Route path="employees" component={Employees}/>
			<Route path="departments" component={Departments}/>
			<Route path="cssrTable" component={CssrTable}/>
			<Route path="sintez" component={Sintez}/>
		</Route>
		<Route path="login" component={Login}/>
	</Route>
);

export default routes