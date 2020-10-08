/**
 * @file React binding to HTML file
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import NewProjectDialog from './newProject/NewProjectDialog';
import NewTemplateDialog from './newProject/NewTemplateDialog';
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
// window.socket.on("asset/0:update", function(data){
// 	console.log("asset/0:update data:", data);
	/*
	if (file.hasChanged('byteOffset') && !file.get('isComplete')) {
		console.log("update:", file);
	    // this.set('progress', Math.roundDec(this.getOriginalFile().get('byteOffset') / this.getOriginalFile().get('size') * 100));
	    // this.set('status', 'Uploading');
	    // window.uploader.processFile(file);
	
	}
	*/
// });
if (document.getElementById('newProjectDialog') !== null) {
	// Landing page
	ReactDOM.render(<div><NewProjectDialog /><NewTempalteDialog /></div>, document.getElementById('newProjectDialog'));
}
else {
	// Project page
	ReactDOM.render(<Editor />, document.getElementById('app'));
}
