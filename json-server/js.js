module.exports = function() {

	var data = {};
	data.Departments = [
		{ "id": 0, "name": "Бухалтерия"},
		{ "id": 1, "name": "Тех. отдел"},
		{ "id": 2, "name": "Отдел кадров"}
	];
	data.Employees = [];

	for (var i = 0; i < 300; i++) {
		data.Employees.push( { id: i, firstName: 'name' + i, lastName: 'Lastname' + i, departmentId: Math.round(Math.floor(Math.random()*100+1)/20) } )
	}

	return data;
};