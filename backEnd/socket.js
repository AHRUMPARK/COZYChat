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
    // 최초 입장 & 서버 알림 
    // 닉네임 받기 => 소켓 아이디와 닉네임 맞춰주기
    // { 소켓 아이디 : "닉네임", 소켓아이디: "닉네임" } 키 벨류로 한명씩 추가
    // 유저 리스트
    var userList = {};
    io.on('connect', function (socket) {
        console.log("\uC0C8\uB85C\uC6B4 \uC720\uC800 ".concat(socket.id, " \uC5F0\uACB0"));
        // 통신하는 고유 소캣 아이디 클라이언트에게 보내기
        socket.emit('info', socket.id);
        // io.emit('notice', socket.id + '님이 입장하셨습니다.');
        socket.on('username', function (name) {
            // [socket.id] 키 : name 값
            userList[socket.id] = name;
            console.log('sssss', userList[socket.id]);
            console.log('userList=!!!!!!!!:', userList);
            // io.emit('list', userList);
            io.emit('notice', name + ' 님이 입장하셨습니다.');
        });
        // sendMSG 이벤트 json 형태
        socket.on('sendMSG', function (json) {
            // json = { msg : ~~ , from ~~};
            json['from'] = socket.id;
            // json {msg : ~~~, from : ~~~, to : ~~~}
            json['username'] = userList[socket.id];
            console.log('ttttttttttttttttttt', json);
            console.log('userList[socket.id]', userList[socket.id]);
            // json {msg : ~~~, from : ~~~, username: ~~~ ,  to : ~~~}
            json['is_dm'] = false; //디엠일때만 true
            // if (json.to === '전체') io.emit('newMSG', json);
            //     else {
            //       const socketID = Object.keys(userList).find(
            //       (key) => userList[key] == json.to
            // ); // 객체의 키값만 가져옴 /json.to 보내는 이 닉
            // 디엠 여부
            // json['is_dm'] = true;
            // io.to(socketID).emit('newMSG', json);
            // // 자기 자신한테도 메세지 보내줘야한다 (디엠시)
            // socket.emit('newMSG', json);
            // // 디엠인지 아닌지 스타일 바꾸게 하자
            // }
            io.emit('newMSG', json);
            console.log('newMSG=============', json);
        });
        // 리스트 객체에서 닉네임 가져오기
        socket.on('disconnect', function () {
            console.log('Server Socket disconnected');
            io.emit('notice', userList[socket.id] + '님이 퇴장 하셨습니다.');
            // 소켓 리스트 지우는 법
            console.log('delete :', socket.id);
            delete userList[socket.id];
            // 그것을 다시 클라이언트에게
            io.emit('list', userList);
        });
    });
};
exports.default = socket;
