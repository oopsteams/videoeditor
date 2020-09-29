/**
 * @file Error messages cs-CZ
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

const errors = {
	get uploadMissingFile400() { return {
		code: 400,
		err: '文件不见了。',
		msg: '请求的正文必须包含要记录的文件。',
	};},
	get parameterTrackMissing400() { return {
		code: 400,
		err: '缺少参数。',
		msg: '缺少必需参数 "track"',
	};},
	get parameterTrackTypeMissing400() { return {
		code: 400,
		err: '参数错误.',
		msg: '参数类型错误, 其值不是“video”或“audio”.',
	};},
	get parameterItemMissing400() { return {
		code: 400,
		err: '缺少参数',
		msg: '缺少曲目或项目参数.',
	};},
	get parameterDurationMissing400() { return {
		code: 400,
		err: '缺少持续时间.',
		msg: '若要在时间线上插入图像，必须指定格式为00:00:00000的持续时间.',
	};},
	get parameterSplitMissing400() { return {
		code: 400,
		err: '缺少参数.',
		msg: '缺少参数: track, item, time.',
	};},
	get parameterFilterMissing400() { return {
		code: 400,
		err: '缺少参数.',
		msg: '缺少参数: "track", "item", "filter".',
	};},
	get parameterMoveMissing400() { return {
		code: 400,
		err: '缺少参数.',
		msg: '缺少参数: track, trackTarget, item, time.',
	};},
	parameterTimeRange400: (time) => { return {
		code: 400,
		err: '参数超出值范围.',
		msg: `时间参数的值必须介于 00:00:00,000 a ${time}`,
	};},
	get parameterTimeWrong400() { return {
		code: 400,
		err: '错误参数.',
		msg: '时间参数格式为00:00:00,000.',
	};},
	get parameterTransitionMissing400() { return {
		code: 400,
		err: '缺少参数.',
		msg: '缺少参数: track, itemA, itemB, transition, duration.',
	};},
	get parameterTransitionWrong400() { return {
		code: 400,
		err: '参数不正确.',
		msg: '参数itemA，itemB必须是整数，non-resistant，duration必须非零，格式为00:00:00000.',
	};},
	get parameterTransitionOrder400() { return {
		code: 400,
		err: '参数不正确.',
		msg: 'itemA必须紧跟在itemB之后.',
	};},
	get transitionTooLong400() { return {
		code: 400,
		err: '过渡期太长.',
		msg: '转换比其中一个转换项长.',
	};},
	get imgWrongTrack400() { return {
		code: 400,
		err: '不支持的文件类型.',
		msg: '只能在视频轨上插入图像.',
	};},
	get videoWrongTrack400() { return {
		code: 400,
		err: '不支持的文件类型.',
		msg: '只能在视频轨上插入视频.',
	};},
	get audioWrongTrack400() { return {
		code: 400,
		err: '不支持的文件类型.',
		msg: '只能在音频轨上插入音频.',
	};},
	get videoDurationMissing400() { return {
		code: 400,
		err: '缺少文件长度.',
		msg: '这段视频没有长度。重复操作或再次上载文件。',
	};},
	get audioDurationMissing400() { return {
		code: 400,
		err: '缺少文件长度.',
		msg: '这段音频没有长度。重复操作或再次上载文件。',
	};},
	get tracksIncompatible400() { return {
		code: 400,
		err: '不兼容的曲目.',
		msg: '无法在视频和音频曲目之间移动项目。',
	};},
	get trackDefaultDel403() { return {
		code: 403,
		err: '无法抹去痕迹。',
		msg: '无法删除初始曲目“videotrack0”和“audiotrack0”。',
	};},
	get fileWrongTrack403() { return {
		code: 403,
		err: '不支持的文件类型.',
		msg: '只能在时间线上插入视频、图像或音频。',
	};},
	get sourceInUse403() { return {
		code: 403,
		err: '源已被使用。',
		msg: '源已在项目中使用。请在从项目中删除之前将其从时间线中删除。',
	};},
	get transitionExists403() { return {
		code: 403,
		err: '转换已应用。',
		msg: '所选元素之间已经有一个转换。',
	};},
	filterExists403: (item, track, filter) => { return {
		code: 403,
		err: 'Filter已应用。',
		msg: `磁道“${track}”上的“${item}”项已应用于筛选器“${filter}”。`,
	};},
	get projectStillRendering403() { return {
		code: 403,
		err: '正在处理。',
		msg: '项目已在处理中，请等待完成。',
	};},
	get moveNoSpace403() { return {
		code: 403,
		err: '目标已包含项。',
		msg: '输入的空间不为空，无法移动该项目。',
	};},
	get projectNotFound404() { return {
		code: 404,
		err: '项目不存在',
		msg: '项目不存在。',
	};},
	get sourceNotFound404() { return {
		code: 404,
		err: '找不到源。',
		msg: '在项目中找不到源。'
	};},
	trackNotFound404: (track) => { return {
		code: 404,
		err: '找不到跟踪。',
		msg: `在项目中找不到给定的轨道“${track}”。`,
	};},
	itemNotFound404: (item, track) => { return {
		code: 404,
		err: '找不到项。',
		msg: `在音轨“${track}”上找不到项“${item}”。`,
	};},
	filterNotFound404: (item, track, filter) => { return {
		code: 404,
		err: 'Filter 找不到.',
		msg: `Filter“${Filter}”设置为${item}。未找到跟踪“${Track}”项。`,
	};},
	get projectFailedOpen500() { return {
		err: '无法打开项目',
		msg: '读取项目时出错。',
	};}
};

module.exports = errors;
