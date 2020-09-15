/**
 * @file Main file of the app
 * @author Vladan Kudlac <vladankudlac@gmail.com>
 */

import {server as config} from './config';
import express from 'express';

const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const log4js = require('log4js');
import log from './models/logger';
server.use(log4js.connectLogger(log, { level: 'auto', statusRules: [
	{ codes: [304],  level: 'info' }
]}));

// View
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

// Router
const {router, api} = require('./router.js');
server.use('/', router);

server.use(express.static('public'));

//ws
let io = require('socket.io')();
/**
 * SOCKET.IO CONFIGURATION
 */
io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
io.set('log level', 1);                    // reduce logging
io.set('browser client', false);           //does Socket.IO need to serve the static resources
io.set('transports', [                     // enable all transports (optional if you want flashsocket)
    'websocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
]);

/**
 * SOCKET.IO EVENTS
 */

io.sockets.on('connection', function (socket) {
	/*
	 UPLOADER
	 */
	socket.on('read', function(data, cb){
		console.log("read data:", data,",cb:", cb);
		cb(null, {"id":"testid"})
	});
	socket.on('upload', function (data) {
		api.renderCanvas(data, null, null);
		/*
	    if (!data.projectId || !data.id) {
	        throw new Error('Missing IDs');
	    }
	
	    //will be removed during update-process
	    var fileId = data.id;
	
	    manager.projects.getProjectPathByProjectId(data.projectId, function onPathFound(projectPath) {
	        if (!projectPath) throw new Error('No folder existent for Project');
	
	        //accept bytes an append to file
	        manager.acceptFilePartial(data, projectPath, function onDataAccepted(res) {
	
	            //inform client about progress
	            socket.emit('file/' + fileId + ':update', {
	                byteOffset : res.byteOffset,
	                isComplete : res.isComplete
	            });
	
	            //save to db
	            manager.files.update(res, function onUpdated(err) {
	                if (err) throw err;
	            });
	
	            //read metaData if file is complete (more accurate than clients meta)
	            if (res.isComplete) {
	
	                var filePath = manager.getAbsoluteFilePath(projectPath, data.fileName);
	
	                //get the asset from the db
	                manager.assets.getAssetByFileId(fileId, function onReceived(asset) {
	
	                    //read metadata
	                    metadata.getMetaData(asset.type, filePath, function onMetaDataRead(info) {
	                        //inform client
	                        socket.emit('asset/' + asset._id + ':update', info);
	                    });
	                });
	            }
	        });
	    });
		*/
	});
});

io.listen(3000);

server.listen(config.port, config.host, () => {
	log.info('Express listening on port', config.port);
});
