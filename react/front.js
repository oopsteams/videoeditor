/**
 * @file React binding to HTML file
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import NewProjectDialog from './newProject/NewProjectDialog';
import Editor from './editor/Editor';
import socket from './editor/socket.io';
import wsUploader from './editor/uploader.socket'
window.socket = socket.connect('http://ubuntu1:3000');
window.app = {
	"project":{
		id:0
	},
};
window.uploader = new wsUploader.uploader(window.socket, window.app);
window.socket.on("asset/0:update", function(data){
	console.log("asset/0:update data:", data);
});
if (document.getElementById('newProjectDialog') !== null) {
	// Landing page
	ReactDOM.render(<NewProjectDialog />, document.getElementById('newProjectDialog'));
}
else {
	// Project page
	ReactDOM.render(<Editor />, document.getElementById('app'));
}
