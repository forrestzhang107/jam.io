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
  },
  onRemoteStream: function(event) {
    console.log("event");
       document.body.appendChild(event.media);
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
  console.log("in join room stream: ", room_info);
  var promise = new Promise((resolve, reject)=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function(camera) {
      config.attachStream = camera;
      window._stream = camera;
      console.log("window._stream: ", window._stream);
      console.log("room_info: ", {
            roomToken: room_info.broadcaster,
            joinUser: room_info.broadcaster
        })
      var conf = conference(config);
      conf.joinRoom({
            roomToken: room_info.broadcaster,
            joinUser: room_info.broadcaster
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

export function GetRooms(){
  return axios.get('/api/get-rooms');
}

export function JoinRoom(payload) {
  return axios.post('/api/join-room', payload)
}
