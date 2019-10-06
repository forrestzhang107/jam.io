const axios = require('axios');
let io = window.io;
let conference = window.conference;
let _stream = undefined;

var config = {
  openSocket: function (config) {
    var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/',
        defaultChannel = window.location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');

    var channel = config.channel || defaultChannel;
    var sender = Math.round(Math.random() * 999999999) + 999999999;

    io.connect(SIGNALING_SERVER).emit('new-channel', {
        channel: channel,
        sender: sender
    });

    var socket = io.connect(SIGNALING_SERVER + channel);
    socket.channel = channel;
    socket.on('connect', function () {
        if (config.callback) config.callback(socket);
    });

    socket.send = function (message) {
        socket.emit('message', {
            sender: sender,
            data: message
        });
    };

    socket.on('message', config.onmessage);
  }
}

export function Stream(){
  return window._stream;
};

export function Authenticate(payload) {
  return axios.post('/login', payload)
}

export function Logout() {
  return axios.post('/logout')
}

export function CreateRoom(payload) {
  return axios.post('/api/create-room', payload)
}

export function CreateRoomStream(){
  var promise = new Promise((resolve, reject)=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(camera) {
      config.attachStream = camera;
      window._stream = camera;
      console.log("window._stream: ", window._stream);
      var conf = conference(config);
      var room_info = conf.createRoom({
          roomName: '09876545'
      });
      console.log("room_info: ", room_info);
      resolve(room_info);
    });
  });
  return promise;
}

export function JoinRoomStream(room_info){
  var promise = new Promise((resolve, reject)=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(camera) {
      config.attachStream = camera;
      window._stream = camera;
      console.log("window._stream: ", window._stream);
      var conf = conference(config);
      conf.joinRoom({
            roomToken: "40199874-63ab-173e-89d6-6179d67ec715",
            joinUser: "33538bbe-d3ce-be85-f5a8-52dbd8f08c47"
        });
      resolve();
    });
  });
  return promise;
}

export function GetRoom(payload) {
  return axios.get('/api/get-room')
}

export function InRoom(){
  return axios.get('/api/in-room');
}

export function LeaveRoom(){
  return axios.post('/api/leave-room');
}
