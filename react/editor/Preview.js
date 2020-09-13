/**
 * @file Preview.js
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewTrack from './PreviewTrack';
import TimelineModel from './TimelineModel';

export default class Preview extends Component {

	constructor(props) {
		super(props);
		this.stop = this.stop.bind(this);
	}

	render() {
		const timestamp = TimelineModel.dateToString(this.props.time);

		return (
			<div id='preview'>
				<h3><i className="material-icons" aria-hidden={true}> movie_filter </i>Náhled</h3>
				<div id='preview-player'>
					{typeof this.props.items.video !== 'undefined' && Object.keys(this.props.items.video).map(key =>
						<PreviewTrack
							project={this.props.project}
							resources={this.props.resources}
							track={this.props.items.video[key]}
							key={this.props.items.video[key]['id']}
							time={timestamp}
							playing={this.props.playing} />
					)}
				</div>
				<br/>
				<div className="prev-toolbar">
					<button onClick={this.stop} className="no-border" title="Zastavit přehrávání">
						<i className="material-icons" aria-hidden="true">stop</i>
					</button>
					{this.props.playing ?
						<button onClick={this.props.pause} title="Pozastavit přehrávání">
							<i className="material-icons" aria-hidden="true">pause</i>
						</button>
						:
						<button onClick={this.props.play} title="Pokračovat v přehrávání">
							<i className="material-icons" aria-hidden="true">play_arrow</i>
						</button>
					}
					<button disabled title="Předchozí událost">
						<i className="material-icons" aria-hidden="true">skip_previous</i>
					</button>
					<button disabled title="Následující událost">
						<i className="material-icons" aria-hidden="true">skip_next</i>
					</button>
				</div>
			</div>
		);
	}

	stop() {
		this.props.setTime(new Date(Date.UTC(1970, 0, 1)));
	}

}

Preview.propTypes = {
	project: PropTypes.string.isRequired,
	resources: PropTypes.object.isRequired,
	items: PropTypes.object.isRequired,
	time: PropTypes.object.isRequired,
	playing: PropTypes.bool.isRequired,
	pause: PropTypes.func.isRequired,
	play: PropTypes.func.isRequired,
	setTime: PropTypes.func.isRequired
};
