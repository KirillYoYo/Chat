import React from 'react'
import './index.less'

//import WrappedRegistrationForm from '../../views/Table/modal'

const conn = new WebSocket('wss://echo.websocket.org');

export default class Sintez extends React.Component {

	constructor(props) {
		super(props);
	}

	sendS (socket, message, callback) {
		this.waitForConnection(conn, function () {
			socket.send(message);
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

	componentDidMount() {

		conn.onopen = function(e) {
			console.log("Connection established!");
		};
		conn.onmessage = function(e) {
			console.log(e.data);
		};

		//conn.send("Test, bla");

		const session = "Test message 1";
		this.sendS(conn, session, function () {
			console.log('callback')
		});
	}

	render() {
		//const columns = this.columns;

		return (
			<div>
				<h1>pusto</h1>
			</div>
		);
	}
}

