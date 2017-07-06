import React from 'react'
import './index.less'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {saveMessages} from '../../actions/sintez';

import { Input, Icon } from 'antd';
import moment from 'moment';
//import WrappedRegistrationForm from '../../views/Table/modal'

const conn = new WebSocket('wss://echo.websocket.org');

//import url ('https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=cyrillic,cyrillic-ext');

class Sintez extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		submittedMessage: null,
		avatars: [
			{
				name: 'your',
				url: 'https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/User_man_male_profile_account_person_people.png'
			},
			{
				name: 'componentDidMount',
				//url: 'https://image.flaticon.com/icons/png/512/78/78373.png'
				url: 'https://image.freepik.com/free-icon/no-translate-detected_318-38977.jpg'
			}
		]
	};

	sendS (socket, message, callback) {
		this.waitForConnection(conn, function () {
			socket.send(JSON.stringify(message));
			if (typeof callback !== 'undefined') {
				callback();
			}
		}, 1000);
	}

	waitForConnection (socket, callback, interval) {
		if (socket.readyState === 1) {
			callback();
		} else {
			// optional: implement backoff for interval here
			const that = this;
			setTimeout(function () {
				that.waitForConnection(socket, callback, interval);
			}, interval);
		}
	};


	getAvatar(name) {
		let url = null;
		this.state.avatars.map( (item, i) => {
			if (item.name === name) {
				url = item.url
			}
		})
		return url;
	}


	onChangeMessage = (e) => {
		this.setState({
			...this.state,
			submittedMessage: e.target.value
		});
	};
	clearMess() {
		this.setState({
			...this.state,
			submittedMessage: ''
		});
	}


	sendMessageHandler () {
		const submittedMessage = {
			text: this.state.submittedMessage,
			author: 'your',
			date: moment(),
			isReaded: true
		};
		this.sendS(conn, submittedMessage, function () {
			//console.log('callback')
		});
	}

	componentDidMount() {

		const saveMessages = this.props.saveMessages;
		const clearMess = this.clearMess.bind(this)

		conn.onopen = function(e) {
			console.log("Connection established!");
		};
		conn.onmessage = function(e) {
			saveMessages(JSON.parse(e.data));
			clearMess();
		};

		conn.onerror = function(error) {
			console.log("Ошибка " + error.message);
		};

		const submittedMessage = {
			text: "Test message 1",
			author: 'componentDidMount',
			date: moment(),
			isReaded: false
		};
		this.sendS(conn, submittedMessage, function () {
			//console.log('callback')
		});
	}

	render() {
		//const columns = this.columns;
		const {messages} = this.props.sintez;

		return (
			<div className="sintez">
				<div className="wrapper">
					<div className="messages">
						<div className="inner">
							{
								messages.map( (item, i) => {
									return (
										<div className={`mess ${item.author === 'your' ? 'your' : ''}`} key={i}>
											<div className="img">
												<img src={item.author ? `${this.getAvatar(item.author)}` : 'http://www.seymonautica.com/img/cms/non_user_icon.png' } width="52" alt=""/>
											</div>
											<div className="content">
												<div className="name">{item.author}</div>
												<div className="text">{item.text}</div>
												<div className="date-outer">
													<div className="status">
														{
															item.isReaded ?
																<img src={require('./imgs/delivery.svg')} alt=""/>
															: <Icon type="check" />
														}
													</div>
													<div className="date">{moment(item.date).format('MM/DD/YYYY HH:mm')}</div>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
					<div className="write-message">
						<Input value={this.state.submittedMessage} placeholder="Введите текст сообщения..." className='textarea' type="textarea" rows={4} autosize={true}  onChange={this.onChangeMessage.bind(this)} />
						<div className="sent-message-btn" onClick={this.sendMessageHandler.bind(this)} />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state)  {
	return {
		sintez: state.sintez
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveMessages: bindActionCreators(saveMessages, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sintez);