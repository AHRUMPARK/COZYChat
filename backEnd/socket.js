"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
// let interval: number = 3000;
// cors 설정
var socket = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    // socket.io 문법
    // 최초 입장 & 서버 알림 
    // 닉네임 받기 => 소켓 아이디와 닉네임 맞춰주기
    // { 소켓 아이디 : "닉네임", 소켓아이디: "닉네임" } 키 벨류로 한명씩 추가
    var list = {};
    io.on('connect', function (socket) {
        console.log('New Client connected');
        // 통신하는 고유 소캣 아이디 클라이언트에게 보내기
        socket.emit('info', socket.id);
        console.log('socket.id', socket.id);
        // io.emit('notice', socket.id + '님이 입장하셨습니다.');
        socket.on('username', function (name) {
            console.log('username:', name);
            list[socket.id] = name;
            io.emit('list', list);
            io.emit('notice', name + '님이 입장하셨습니다.');
        });
        // 리스트 객체에서 닉네임 가져오기
        socket.on('disconnect', function () {
            console.log('Server Socket disconnected');
            io.emit('notice', list[socket.id] + '님이 퇴장 하셨습니다.');
            // 소켓 리스트 지우는 법
            console.log('delete :', socket.id);
            delete list[socket.id];
            // 그것을 다시 클라이언트에게
            io.emit('list', list);
        });
    });
};
exports.default = socket;
// connection : 클라이언트가 접속했을 때 발생하고, 콜백으로 소켓 객체를 제공.
// disconnect :  클라이언트가 연결을 끊었을 때 발생하는 함수
// good : 클라이언트에서 good이라는 커스텀 이벤트명으로 데이터를 보낼 때 서버에서 받는 부분
// emit :  3초마다 클라이언트에게 메세지를 보내는 부분, 첫 번째 인자는 이벤트 이름, 두 번째 인자는 데이터이다. (클라이언트 -> 서버)
// 위에서 hi라는 이벤트 이름으로 hello라는 데이터를 3초마다 보내게 된다. 클라이언트가 이 메시지를 받기 위해서는 hi에 대한 이벤트 리스너를 만들어야 한다. (서버 -> 클라이언트)
