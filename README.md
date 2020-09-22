# Web Based Video Editor Using MLT Framework
![Overal schema](https://raw.githubusercontent.com/kudlav/videoeditor/master/docs/schema.png)

## See it in action (YouTube video)
[https://youtu.be/GemMThnqULE](https://youtu.be/GemMThnqULE)

## Badges
[![Build Status](https://travis-ci.org/kudlav/videoeditor.svg?branch=master)](https://travis-ci.org/kudlav/videoeditor)

## Features
- web application no plugin required
- server side rendering
- supported modern browsers (Firefox, Chrome, Safari, ...)
- open-source, Apache-2.0 license
- project automatically saved on server (as MLT XML), accessible via link
- unlimited number of video and audio tracks
- 6 video and audio filters (with ability to create more filters)

### Input
- Supported formats depends on mlt framework, respectively on supported formats by ffmpeg.
- Video duration tested up to 1 hour 30 minutes.
- Input resolution up to 4K.

### Output
Currently set to:
- Container: mp4
- Audio codec: aac
- Video codec: libx264
ffmpeg -f image2 -y -r 24 -i ./%04d.png -vcodec libx264 -aspect 16:9 -t 10 b.mp4
ffmpeg -f image2 -y -r 24 -i ./%04d.png -vcodec libx264 -s 480x960 -pix_fmt yuv420p -t 15 c.mp4
ffmpeg -i b.mp4 -pix_fmt yuv420p -c:v libx264 out.mp4
## Installation

Project requires:
- [Node.js](https://nodejs.org/) 10.13.0+ to run server.
- MLT framework to export video.
- FFmpeg to handle multimedia files.

```sh
$ sudo apt install melt
$ sudo apt install ladspa-sdk ffmpeg
```

### Development

Install the dependencies and devDependencies and start the server and webpack for development. Don't forget to change `config.js` file.

```sh
$ npm install
$ npm run dev-build
$ npm run dev-start
```

You can run code check using ESLint (required installed npx):
```sh
$ sudo npm i -g npx
$ npm run eslint
```

### Production

Install the dependencies and start the server and webpack for production. Don't forget to change `config.js` file.

```sh
$ export NODE_ENV=production
$ npm install
$ npm run build
$ npm start
```
