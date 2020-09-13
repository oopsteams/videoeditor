/**
 * @file Available filters for React components
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import timeManager from '../models/timeManager';

export default {

	videoFilters: [{
		id: 'brightness',
		title: '亮度',
		in: [{
			id: 'level',
			title: '级别',
			type: 'int',
			value: 100,
			min: 0,
			max: 200,
		}],
		out: [{
			id: 'start',
			value: () => 1,
		},{
			id: 'level',
			value: (input) => input.level / 100,
		}],
	},{
		id: 'lift_gamma_gain',
		title: '对比度',
		in: [{
			id: 'level',
			title: '级别',
			type: 'int',
			value: 100,
			min: 0,
			max: 200,
		}],
		out: [{
			id: 'lift_r',
			value: () => 0,
		},{
			id: 'lift_g',
			value: () => 0,
		},{
			id: 'lift_b',
			value: () => 0,
		},{
			id: 'gamma_r',
			value: (input) => 2 - (input.level / 100),
		},{
			id: 'gamma_g',
			value: (input) => 2 - (input.level / 100),
		},{
			id: 'gamma_b',
			value: (input) => 2 - (input.level / 100),
		},{
			id: 'gain_r',
			value: (input) => input.level / 100,
		},{
			id: 'gain_g',
			value: (input) => input.level / 100,
		},{
			id: 'gain_b',
			value: (input) => input.level / 100,
		}]
	},{
		id: 'fadeInBrightness',
		title: '画面淡入',
		in: [{
			id: 'duration',
			title: '持续时长',
			type: 'duration',
			value: '00:00:00,000',
		}],
		out: [{
			id: 'level',
			value: (input) => `00:00:00,000=0;${input.duration}=1`,
		},{
			id: 'alpha',
			value: () => 1
		}]
	},{
		id: 'fadeOutBrightness',
		title: '画面淡出',
		in: [{
			id: 'duration',
			title: '持续时长',
			type: 'duration',
			value: '00:00:00,000',
		}],
		out: [{
			id: 'level',
			value: (input, resource) => `${timeManager.subDuration(resource.out, input.duration)}=1;${resource.out}=0`,
		},{
			id: 'alpha',
			value: () => 1
		}]
	}],

	audioFilters: [{
		id: 'fadeInVolume',
		title: '音频淡入',
		in: [{
			id: 'duration',
			title: '持续时长',
			type: 'duration',
			value: '00:00:00,000',
		}],
		out: [{
			id: 'level',
			value: (input) => `00:00:00,000=-60;${input.duration}=0`,
		}]
	},{
		id: 'fadeOutVolume',
		title: '音频淡出',
		in: [{
			id: 'duration',
			title: '持续时长',
			type: 'duration',
			value: '00:00:00,000',
		}],
		out: [{
			id: 'level',
			value: (input, resource) => `${timeManager.subDuration(resource.out, input.duration)}=0;${resource.out}=-60`,
		}]
	}],
};
