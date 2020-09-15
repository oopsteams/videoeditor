/**.
 * User: Matthieu Holzer
 * Date: 09.09.12
 * Time: 14:21
 */
var Config = {
	'UPLOADER_CHUNK_SIZE'            : 1048576, //1MB
}

var reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
	obj.forEach(function(value, index){
		if (!iterator.call(context, value, index)) results[results.length] = value;
	});
    return results;
  };
exports = function (socket, app) {

        var self = this,
            fileQueue = [],
            fileReader = null,
            isUploading = false,
            blob = null;

        this.addFile = function (file) {

            //check to see if file isn't already in queue
            if (fileQueue.length > 0) {
                for (var i = 0; i < fileQueue.length; i++) {
                    if (fileQueue[i] === file) {
                        return;
                    }
                }
            }

            fileQueue.push(file);
        };

        this.removeFile = function (file) {

            //if currentFile
            if (fileQueue[0] === file && isUploading) {
                //TODO what now?
            }

            fileQueue = reject(fileQueue, function (fileInQueue) {
                return  file === fileInQueue;
            });

            self.start();

        };

        this.sendFileChunk = function (file, blob) {

            isUploading = true;

            socket.emit('upload', {
                'projectId'  : app.project.id,
                'id'         : file.id,
                'fileName'   : file.get('localFile').name,
                'byteOffset' : file.get('byteOffset'),
                'bytesTotal' : file.get('size'),
                'bytes'      : blob
            });

        };

        this.processFile = function (file) {

            if (!file) return;

            var start = file.get('byteOffset'),
                end = start + Config.UPLOADER_CHUNK_SIZE,
                localFile = file.get('localFile'),
                data;


            fileReader = new FileReader();

            if (start + Config.UPLOADER_CHUNK_SIZE > file.get('size')) {
                end = file.get('size');
            }

            blob = (localFile.slice || localFile.webkitSlice || localFile.mozSlice).call(localFile, start, end);

            fileReader.onloadend = function (event) {
                if (event.target.readyState == FileReader.DONE) {
                    if (event.target.result) {
                        //regex to get rid of the data;base stuff
                        data = event.target.result.match(/,(.*)$/);
                        if (data) {
                            self.sendFileChunk(file, data[1]);
                            fileReader = null;
                        }

                    }
                }
            };

            fileReader.readAsDataURL(blob);

        };


        this.start = function () {

            if (fileQueue.length > 0 && !isUploading) {
                console.log('UPLOADER.JS :: START');
                this.processFile(fileQueue[0]);
            }
            else {
                isUploading = false;
            }
        };

        this.stop = function () {
            if (!isUploading)  return;
            if (fileReader) fileReader.abort();
            isUploading = false;
        };


    };
