import React from 'react'
import RenderTable from '../../components/RenderTable'

//import WrappedRegistrationForm from '../../views/Table/modal'

export default class Employees extends React.Component {

	getColumns() {
		return [{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			//render: name => `${name.first} ${name.last}`,
			render: name => `${name}`,
			width: '20%',
		}];
	}

	render() {
		const columns = this.columns;

		return (
			<div>
				<RenderTable
					columns = {this.getColumns()}
					modalInner = {['name']}
				    url = 'Departments'
				/>
			</div>
		);
	}
}

