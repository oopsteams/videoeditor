/**
 * @file AddFilterDialog.js
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React, { Component } from 'react';
import Modal from 'react-modal';
import filters from '../filters';
import timeManager from '../../models/timeManager';
import {server} from '../../config';
import PropTypes from 'prop-types';

Modal.setAppElement(document.body);

export default class AddFilterDialog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			filter: filters.videoFilters[0].id,
			level: 100, // Must match default value of first filter in /react/filters.js
		};

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);
		this.handleAddFilter = this.handleAddFilter.bind(this);
		this.handleDelFilter = this.handleDelFilter.bind(this);
	}

	render() {
		const item = this.props.getItem(this.props.item);

		return (
			<div>
				<Modal
					isOpen={true}
					contentLabel="添加新滤镜"
					className={'modal'}
					overlayClassName={'overlay'}
					onRequestClose={this.handleCloseDialog}
				>
					<h2>滤镜</h2>
					<div>
						<table>
							<tbody>
								{item.filters.length === 0 && <tr><td>无滤镜</td></tr>}
								{item.filters.map(filter =>
									<tr key={filter.service}>
										<td>{AddFilterDialog.getFilter(filter.service).title}</td>
										<td><button onClick={() => this.handleDelFilter(filter.service)}><i className="material-icons" aria-hidden="true">delete</i></button></td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<h3>添加新滤镜</h3>
					<div>
						<form onSubmit={this.handleAddFilter}>
							<label htmlFor={'filter'}>滤镜: </label>
							<select name={'filter'} onChange={this.handleFilterChange}>
								{filters.videoFilters.map((filter) => <option value={filter.id} key={filter.id}>{filter.title}</option>)}
								{filters.audioFilters.map((filter) => <option value={filter.id} key={filter.id}>{filter.title}</option>)}
							</select>
							<br/>
							{AddFilterDialog.getFilter(this.state.filter).in[0].id === 'level' &&
								<>
									<label htmlFor={'level'}>级别: </label>
									<input type={'range'} name={'level'} min={0} max={200} defaultValue={100} onChange={this.handleLevelChange}/>
									<span> {this.state.level} %</span>
								</>
							}
							{AddFilterDialog.getFilter(this.state.filter).in[0].id === 'duration' &&
								<>
									<label htmlFor={'duration'}>持续时长: </label>
									<input type={'text'} name={'duration'} defaultValue={'00:00:00,000'} required={true} pattern={'^\\d{2,}:\\d{2}:\\d{2},\\d{3}$'} title={'格式中的持续时间 00:00:00,000'} onChange={this.handleLevelChange}/>
								</>
							}
							<br/>
							<input type={'submit'} value={'添加滤镜'}/>
							<button onClick={this.handleCloseDialog}>关闭</button>
						</form>
					</div>
				</Modal>
			</div>
		);
	}

	handleFilterChange(event) {
		this.setState({filter: event.target.value});
	}

	handleLevelChange(event) {
		this.setState({level: event.target.value});
	}

	handleCloseDialog() {
		this.setState({
			filter: filters.videoFilters[0].id,
			level: 100, // Must match default value of first filter in /react/filters.js
		});
		this.props.onClose();
	}

	handleAddFilter(event) {
		event.preventDefault();

		let filter = AddFilterDialog.getFilter(this.state.filter);
		console.log("handleAddFilter filter:", filter, ",this.state.filter:", this.state.filter);
		if (filter.in[0].id === 'duration' && !timeManager.isValidDuration(this.state.level)) {
			alert('持续时间必须是无限的, 格式 00:00:00,000');
			return;
		}

		let newFilter = {
			filter: this.state.filter,
			params: {},
		};
		const input = {};

		const item = this.props.getItem(this.props.item).item;
		console.log("handleAddFilter item:", item, ",this.props:", this.props);
		const itemPath = this.props.item.split(':');
		newFilter.track = itemPath[0];
		newFilter.item = Number(itemPath[1]);

		for (let output of filter.out) {
			input[filter.in[0].id] = this.state.level;
			newFilter.params[output.id] = output.value(input, item);
		}

		this.props.onAdd(newFilter);
	}

	handleDelFilter(filterId) {
		const itemPath = this.props.item.split(':');
		const url = `${server.apiUrl}/project/${this.props.project}/filter`;
		const bodyParams = {
			track: itemPath[0],
			item: Number(itemPath[1]),
			filter: filterId
		};
		const params = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyParams),
		};

		fetch(url, params)
			.then(response => response.json())
			.then(data => {
				if (typeof data.err === 'undefined') {
					this.props.onDel(bodyParams);
				}
				else {
					alert(`${data.err}\n\n${data.msg}`);
				}
			})
			.catch(error => this.props.fetchError(error.message))
		;
	}

	/**
	 * Get filter object form config by its ID.
	 *
	 * @param {string} id
	 * @return {Object|null}
	 */
	static getFilter(id) {
		for (let filter of filters.videoFilters) {
			if (filter.id === id) {
				return filter;
			}
		}
		for (let filter of filters.audioFilters) {
			if (filter.id === id) {
				return filter;
			}
		}
		return null;
	}
}

AddFilterDialog.propTypes = {
	item: PropTypes.string.isRequired,
	getItem: PropTypes.func.isRequired,
	project: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired,
	onDel: PropTypes.func.isRequired,
	fetchError: PropTypes.func.isRequired,
};
