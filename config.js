/**
 * @file Main config file
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

exports.server = {
	port: 8080,
	host: '0.0.0.0',

	get serverUrl() {
		// return `http://${this.host}:${this.port}`;
		return `http://ubuntu1:${this.port}`;
	},
	get apiUrl() {
		// return `http://${this.host}:${this.port}/api`;
		return `http://ubuntu1:${this.port}/api`
	},
};

exports.config = {
	emailServer: 'smtp.139.com',
	emailPort: 465,
	emailUser: 'elvis_su',
	emailPasswd: 'sushaoyu!0103',
	adminEmail: 'elvis_su@139.com',

	projectPath: 'WORKER',
	publicPath: 'public',
	projectIDlength: 32,
	fileIDlength: 21,

	declareXML: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE mlt SYSTEM "https://raw.githubusercontent.com/mltframework/mlt/master/src/modules/xml/mlt-xml.dtd">',

	mapFilterNames: {
		fadeInBrightness: 'brightness',
		fadeOutBrightness: 'brightness',
		fadeInVolume: 'volume',
		fadeOutVolume: 'volume',
	}
};
