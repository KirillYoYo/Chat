var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var normalAxios = axios.create();
var mockAxios = axios.create();

// mock 数据
var mock = new MockAdapter(mockAxios);

mock.onPut('/login').reply(config => {
	let postData = JSON.parse(config.data).data;
	if (postData.user === 'admin' && postData.password === '123456') {
		return [200, require('./mock/user')];
	} else {
		return [200, require('./mock/user')];
		//return [500, {message: "Incorrect user or password"} ];
	}
});
mock.onGet('/logout').reply(200, {});
mock.onGet('/my').reply(200, require('./mock/user'));
mock.onGet('/menu').reply(200, require('./mock/menu'));
mock.onGet('/randomuser').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('https://randomuser.me/api', {
			params: {
				results: 10,
				...config.params,
			},
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});

mock.onGet('/ariya_table').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('http://localhost:3000/Departments/?_start=0&_limit=55', {
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});
mock.onGet('/ariya_table_update').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('http://localhost:3000/'+config.params.urlToReq+'/?_start='+config.params.current+'&_limit='+config.params.limit+'', {
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});

mock.onGet('/getRepos').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('https://api.github.com/users/'+config.params.user+'/repos', {
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});

mock.onGet('/getIssues').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('https://api.github.com/search/issues?q='+config.params.user+'+'+config.params.rep+'?page='+config.params.current+'&per_page='+config.params.limit+'', {
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});



mock.onGet('/updateWeather').reply((config) => {

});

module.exports = mockAxios;
