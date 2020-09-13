/**
 * @file FetchErrorDialog.js
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement(document.body);

export default class FetchErrorDialog extends Component {

	render() {
		return (
			<div>
				<Modal
					isOpen={true}
					contentLabel="与服务器通信时出错"
					className={'modal'}
					overlayClassName={'overlay'}
				>

					<h2 className={'error'}><img src={'/icons/error.svg'} alt={'error'}/>与服务器通信时出错</h2>
					<div>
						<i>{this.props.msg}</i>
						<p>在浏览器中重复操作或刷新页面.</p>
						<button onClick={() => this.props.onClose()}>关闭</button>
					</div>
				</Modal>
			</div>
		);
	}
}

FetchErrorDialog.propTypes = {
	msg: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};
