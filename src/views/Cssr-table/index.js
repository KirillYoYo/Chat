import React from 'react'
import RenderTable from '../../components/RenderTable'
import dataJs from '../../../json-server/js'

//import WrappedRegistrationForm from '../../views/Table/modal'

export default class Employees extends React.Component {

	getColumns() {
		return [
			{
				title: 'Name',
				dataIndex: 'firstName',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: firstName => `${firstName}`,
				width: '20%',
			},
			{
				title: 'LastName',
				dataIndex: 'lastName',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: lastName => `${lastName}`,
				width: '20%',
			},
			{
				title: 'Department',
				dataIndex: 'departmentId',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: departmentId => {
					return ( dataJs().Departments[`${departmentId}`].name);
				},
				width: '20%',
			}
		];
	}

	render() {
		const columns = this.columns;

		return (
			<div>
				<RenderTable
					columns = {this.getColumns()}
					modalInner = {['name']}
					url = 'Employees'
				/>
			</div>
		);
	}
}

