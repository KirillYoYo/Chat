import React from 'react'
import RenderTable from '../../components/RenderTable'
import dataJs from '../../../json-server/js'

//import WrappedRegistrationForm from '../../views/Table/modal'

export default class Employees extends React.Component {

	getColumns() {
		return [
			{
				title: 'Id',
				dataIndex: 'id',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: id => `${id}`,
				width: '20%',
			},
			{
				title: 'Number',
				dataIndex: 'number',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: number => `${number}`,
				width: '20%',
			},
			{
				title: 'Title',
				dataIndex: 'title',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: title => `${title}`,
				width: '20%',
			},
			{
				title: 'Created at',
				dataIndex: 'created_at',
				sorter: true,
				//render: name => `${name.first} ${name.last}`,
				render: created_at => `${created_at}`,
				width: '20%',
			},
			// {
			// 	title: 'title',
			// 	dataIndex: 'departmentId',
			// 	sorter: true,
			// 	//render: name => `${name.first} ${name.last}`,
			// 	render: departmentId => {
			// 		return ( dataJs().Departments[`${departmentId}`].name);
			// 	},
			// 	width: '20%',
			// }
		];
	}

	render() {
		//const columns = this.columns;

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

