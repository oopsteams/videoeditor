import React, { Component } from 'react';
import Modal from 'react-modal';
import {server} from '../../config';
import FetchErrorDialog from '../editor/FetchErrorDialog';

// Modal.setAppElement(document.body);

export default class NewTemplateDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showFetchError: false,
			fetchError: '',
		};

		this.closeFetchErrorDialog = this.closeFetchErrorDialog.bind(this);
	}

	createTempalte() {
		const url = `${server.apiUrl}/template`;
		const params = {
			method: 'POST',
		};

		fetch(url, params)
			.then(response => response.json())
			.then(data => {
				if (typeof data.err === 'undefined') {
					//window.location = `${server.serverUrl}/template/${data.project}`;
					console.log("data:", data);
				}
				else {
					alert(`${data.err}\n\n${data.msg}`);
				}
			})
			.catch(error => this.openFetchErrorDialog(error.message))
		;
	}

	/**
	 * Show Connection error dialog
	 *
	 * @param {String} msg
	 */
	openFetchErrorDialog(msg) {
		this.setState({
			showFetchError: true,
			fetchError: msg,
		});
	}

	/**
	 * Close Connection error dialog
	 */
	closeFetchErrorDialog() {
		this.setState({
			showFetchError: false,
			fetchError: '',
		});
	}
	// <Modal
	// 	isOpen={true}
	// 	contentLabel="新建模版"
	// 	className={'modal'}
	// 	overlayClassName={'null'}
	// >
	render() {
		return (
			<div>
				{this.state.showFetchError && <FetchErrorDialog msg={this.state.fetchError} onClose={this.closeFetchErrorDialog}/>}
				
				<main>
					<h2 className={'logo'}><img src={'/icons/favicon.svg'} alt={'logo'}/>Videoeditor</h2>
					<div>
						<button onClick={() => this.createTempalte()}>创建新模版</button>
					</div>
				</main>
			</div>
		);
	}
}