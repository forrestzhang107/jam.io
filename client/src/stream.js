let io = window.io;
let conference = window.conference;
let _stream = undefined;

var config = {
  openSocket: function (config) {
    var SIGNALING_SERVER = 'https://socketio-over-nodejs2.herokuapp.com:443/',
        defaultChannel = window.location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');

    var channel = "another-unique";
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
    console.log("remote stream event");
       document.body.appendChild(event.media);
   },
   onRoomFound: function(room) {
        console.log("in on room found");

            // captureUserMedia(function() {
            //     conferenceUI.joinRoom({
            //         roomToken: roomToken,
            //         joinUser: broadcaster
            //     });
            // }, function() {
            //     joinRoomButton.disabled = false;
            // });
    }
}

export function Stream(){
  return window._stream;
};
