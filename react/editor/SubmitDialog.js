/**
 * @file SubmitDialog.js
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React, { Component } from 'react';
import Modal from 'react-modal';
import {server} from '../../config';
import PropTypes from 'prop-types';

Modal.setAppElement(document.body);

export default class SubmitDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
		};

		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		this.handleSumbitDialog = this.handleSumbitDialog.bind(this);
		this.handleEmailChanged = this.handleEmailChanged.bind(this);
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={true}
					contentLabel="项目完成"
					className={'modal'}
					overlayClassName={'overlay'}
					onRequestClose={this.handleCloseDialog}
				>

					<h2>项目完成</h2>
					<div>
						<form onSubmit={this.handleSumbitDialog}>
							<label htmlFor={'email'}>电子邮件: </label>
							<input type={'email'} name={'email'} required={true} size={30} value={this.state.email} onChange={this.handleEmailChanged}/>
							<br/>
							项目的持续时间取决于它的持续时间.<br/>
							输入一封电子邮件，我们将在处理后立即向您发送指向结果视频的链接.
							<br/>
							<input type={'submit'} className={'success'} value={'开始'}/>
							<button onClick={this.handleCloseDialog}>取消</button>
						</form>
					</div>
				</Modal>
			</div>
		);
	}

	handleCloseDialog() {
		this.setState({
			email: ''
		});
		this.props.onClose();
	}

	handleSumbitDialog(event) {
		event.preventDefault();

		const url = `${server.apiUrl}/project/${this.props.project}`;
		const params = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.state.email,
			}),
		};

		fetch(url, params)
			.then(response => response.json())
			.then(data => {
				if (typeof data.err === 'undefined') {
					this.handleCloseDialog();
					this.props.onProcessing();
				}
				else {
					alert(`${data.err}\n\n${data.msg}`);
				}
			})
			.catch(error => this.props.fetchError(error.message))
		;
	}

	handleEmailChanged(event) {
		this.setState({
			email: event.target.value,
		});
	}

}

SubmitDialog.propTypes = {
	project: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	fetchError: PropTypes.func.isRequired,
	onProcessing: PropTypes.func.isRequired
};
