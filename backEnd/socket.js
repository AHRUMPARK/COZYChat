"use strict";
exports.__esModule = true;
var socket_io_1 = require("socket.io");
// let interval: number = 3000;
// cors 설정
var socket = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: '*'
        }
    });
    // 유저 리스트
    var userList = {};
    // 최초 입장 & 서버 알림
    // 닉네임 받기 => 소켓 아이디와 닉네임 맞춰주기
    // { 소켓 아이디 : "닉네임", 소켓아이디: "닉네임" } 키 벨류로 한명씩 추가
    io.on('connect', function (socket) {
        console.log("\uC0C8\uB85C\uC6B4 \uC720\uC800 ".concat(socket.id, " \uC5F0\uACB0"));
        // console.log('info 보내고 있냐' + socket.id);
        // io.emit('notice', socket.id + '님이 입장하셨습니다.');
        socket.on('username', function (name) {
            // [socket.id] 키 : name 값
            userList[socket.id] = name;
            console.log('1번 userList=!!!!!!!!:', userList);
            io.emit('list', userList);
            // 통신하는 고유 소캣 아이디 클라이언트에게 보내기
            var today = new Date();
            var options = { hour: "numeric", minute: "numeric" };
            var date = today.toLocaleDateString();
            var time = today.toLocaleTimeString("ko-KR", options);
            socket.emit('info', socket.id);
            io.emit('notice', date + ' ' + ' ' + time);
            io.emit('notice', name + ' 님이 입장하셨습니다.');
        });
        // sendMSG 이벤트 json 형태
        socket.on('sendMSG', function (json) {
            console.log('-------------------------');
            console.log(userList);
            var today = new Date();
            var options = { hour: "numeric", minute: "numeric" };
            var date = today.toLocaleDateString();
            var time = (today.toLocaleTimeString("ko-KR", options));
            // json = { msg : ~~ , from ~~};
            json['from'] = socket.id;
            // json {msg : ~~~, from : ~~~, to : ~~~}
            json['username'] = userList[socket.id];
            console.log('2번 언제바뀌나 보자 username', userList[socket.id]);
            // json {msg : ~~~, from : ~~~, username: ~~~ ,  to : ~~~}
            json['is_dm'] = false; //디엠일때만 true
            json['today'] = date;
            json['times'] = time;
            if (json.to === 'all') {
                io.emit('newMSG', json);
                // '전체'가 아닐때, dm 모드
                //return false;
            }
            else {
                var socketID = Object.keys(userList).find(function (key) { return (key === json.to); });
                //console.log('test 1 : '+socketID);
                //console.log('check 2 : '+Object.keys(userList).find((key) => (userList[key] = json.to)))
                //let socketID = "sdasdasjdhasdhjk";
                // 객체의 키값만 가져옴 /json.to 보내는 이 닉
                // 디엠 여부
                json['is_dm'] = true;
                console.log('4번 DM socketID 소켓아이디 : ', socketID);
                // if (socketID !== undefined)
                io.to(socketID).emit('newMSG', json);
                // 자기 자신한테도 메세지 보내줘야한다 (디엠시)
                socket.emit('newMSG', json);
                // 디엠인지 아닌지 스타일 바꾸게 하자
            }
            console.log('5번 newMSG=============', json);
            console.log('6번 userList=!!!!!!!!:', userList);
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
exports["default"] = socket;
