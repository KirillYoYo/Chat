import React from 'react'
import {Table,  Modal, Button, Input, Select} from 'antd';
import api from '../../api';
import PanelBox from '../../components/PanelBox';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {saveTableData} from '../../actions/table';

import RenderModal from '../RenderModal'
import { Spin, Icon } from 'antd';
import './index.less'


//import WrappedRegistrationForm from '../../views/Table/modal'


class TablePage extends React.Component {
	state = {
		data: [],
		dataSource: [],
		endData:false,
		pagination: {
			total: 0,
			current: 0
		},
		loading: null,
		modalOpen: false,
		modalData: {},
		repositiories: [],
		formUser: null,
		formRep: null,
	};

	showModal = (record) => {
		this.setState({
			...this.state,
			modalOpen: true,
		});
	};
	handleOk = (e, some) => {
		console.log(e);
		this.setState({
			...this.state,
			modalOpen: false,
		});
	};
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			...this.state,
			modalOpen: false,
		});
	};

	constructor(props) {
		super(props);
		this.columns = this.props.columns;
	}
	changeRecord (text, record, index) {
		this.setState({
			...this.state,
			modalData: record,
		}, () => {
			this.showModal(record);
		});
	}

	componentDidMount() {

		this.columns.push(
			{
				title: 'Open',
				dataIndex: 'rec',
				sorter: false,
				render: (text, record, index) => <div><a onClick={this.changeRecord.bind(this, text, record, index)}>Change {text}</a></div>,
				width: '20%',
			}
		);
	}

	handlerUserName(e) {
		const value = e.target.value;
		this.setState({
			...this.state,
			formUser: value
		});
		api.get('getRepos', {
			params: {
				user: value
			},
			responseType: 'json'
		}).then((res) => {
			this.setState({
				...this.state,
				repositiories: res.data,
			});
		}).catch((err) => {
			console.log(err)
		});
	}

	handleChangeRep(value) {
		this.setState({
			...this.state,
			formRep: value
		}, () => {
			this.doRequest();
		});
	}

	doRequest (params) {
		this.setState({
			loading: true,
		});
		if (this.state.formUser && this.state.formRep) {
			const pagination = this.state.pagination;
			api.get('getIssues', {
				params: {
					user: this.state.formUser,
					rep: this.state.formRep,
					current: 0,
					limit: 50,
					...params,
				},
				responseType: 'json'
			}).then((res) => {
				const new_data = this.state.dataSource ? this.state.dataSource.concat(res.data.items) : res.data.items;
				if (res.data.items.length > 0 || res.data.items.length > 10) {
					pagination.total = new_data.length +  10
				} else {
					pagination.total =  new_data.length
				}
				this.setState({
					loading: false,
					data: res.data,
					dataSource: new_data,
					endData: res.data.items.length === 0,
					pagination,
				});
			}).catch((err) => {
				console.log(err)
			});
		}
	}
	handleTableChange = (pagination, filters, sorter, page) => {
		const pager = this.state.pagination;
		pager.current = pagination.current;
		this.setState({
			...this.state,
			pagination: pager,
		});
		if (Math.ceil(pagination.total / pagination.pageSize) === pagination.current && !this.state.endData) {
			this.doRequest({
				results: pagination.pageSize,
				page: pagination.current,
				sortField: sorter.field,
				sortOrder: sorter.order,
				current: pagination.total,
				limit: pagination.total + 50,
				...filters,
			});
		}
	}

	render() {
		const columns = this.columns;
		const {dataSource, pagination, loading} = this.state;
		const {err, noData} = this.props.table;
		noData ? console.log(err) : null;


		return (
			<PanelBox title="Table Page">
				<div className="header-search" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 25}}>
					<Input
						type="text"
						//value={state.number}
						//onChange={this.handleNumberChange}
						style={{ width: '30%', marginRight: '3%'}}
						onBlur={this.handlerUserName.bind(this)}
					/>
					<Select
						//value={state.currency}
						//size={size}
						onChange={this.handleChangeRep.bind(this)}
						showSearch
						optionFilterProp="children"
						filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						style={{ width: '30%', marginRight: '3%'}}
						//onChange={this.handleCurrencyChange}
					>
						{
							this.state.repositiories.length !== 0 ?
								this.state.repositiories.map( (item, i) => {
									return (
										<Option value={item.name} key = {i}>{item.name}</Option>
									)
								})
								: null
						}
					</Select>
					<Button style={{ width: '17%' }} type="primary" onClick={this.doRequest.bind(this, this.state.url)}>Search</Button>
				</div>
				{
					!loading ?
						<Table columns={columns}
						       rowKey={record => record.registered}
						       dataSource={dataSource}
						       pagination={pagination}
						       loading={loading}
						       onChange={this.handleTableChange}
						/>
						: null
				}
				{
					loading ? <Spin tip="Loading..." /> : null
				}
				{
					noData ? <div style={{textAlign: 'center', maxWidth: 480, margin: '25 auto 0'}}>
						<Icon style={{ fontSize: 28, marginBottom: 15}} type="exclamation-circle" />
						<h4>Что то пошло не так, попробуйте перезагрузить страницу или повторить попытку позднее</h4>
					</div> : null
				}
				<Modal
					title="Change redord"
					visible={this.state.modalOpen}
					//onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={[]}
					width = {720}
				>
					{/*non form-redux*/}
					{this.state.modalOpen ?
						<RenderModal
							modalInner={this.props.modalInner}
							modalData={this.state.modalData}
							func={{
								onCancel: this.handleCancel.bind(this),
								onOk: this.handleOk.bind(this),
							}}
						/>
						: null}

				</Modal>
			</PanelBox>
		);
	}
}

function mapStateToProps(state)  {
	return {
		table: state.table
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveTableData: bindActionCreators(saveTableData, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePage);
