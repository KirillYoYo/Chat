import React from 'react'

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import dataJs from '../../../json-server/js'
const FormItem = Form.Item;
const Option = Select.Option;

import PanelBox from '../../components/PanelBox';

//import ReactDOM from 'react-dom';

const residences = [{
	value: 'zhejiang',
	label: 'Zhejiang',
	children: [{
		value: 'hangzhou',
		label: 'Hangzhou',
		children: [{
			value: 'xihu',
			label: 'West Lake',
		}],
	}],
}, {
	value: 'jiangsu',
	label: 'Jiangsu',
	children: [{
		value: 'nanjing',
		label: 'Nanjing',
		children: [{
			value: 'zhonghuamen',
			label: 'Zhong Hua Men',
		}],
	}],
}];

class RenderModal extends React.Component {
	state = {
		confirmDirty: false,
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};
	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({confirmDirty: this.state.confirmDirty || !!value});
	};
	checkPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};
	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], {force: true});
		}
		callback();
	};
	ifIS (data) {
		return data ? data : null
	}



	render() {
		const {modalData} = this.props;

		return (
			<div>
				{
					modalData ?
						<div>
							<Row>
								<Col span={12}><img src={modalData.user.avatar_url} width="120" alt=""/></Col>
								<Col span={12}>
									<div style={{fontSize: '18'}}>{modalData.user.login}</div>
									<a href={modalData.user.url}>{modalData.user.url}</a>
								</Col>
							</Row>
							<div style={{paddingBottom: 15}} />
							<Row>
								<Col span={24}>
									{modalData.title}
								</Col>
								<Col span={24}>
									{modalData.created_at}
								</Col>
								<Col span={24}>
									{modalData.state}
								</Col>
								<Col span={24}>
									<a href={modalData.url}>{modalData.url}</a>
								</Col>
							</Row>
						</div>
					: null
				}
			</div>
		);
	}
}

const WrappedRenderModal = Form.create()(RenderModal);
export default WrappedRenderModal
