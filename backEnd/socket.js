"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
// import express from 'express';
// import * as multer from "multer" 
// const path = require('path');
// cors 설정
var socket = function (server) {
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    // // multer
    // const upload = multer({
    //   storage: multer.diskStorage({
    //     destination: function (req:any, file:any, cb:any) {
    //       // 파일 저장경로 uploads
    //       cb(null, '../public/uploads')
    //     },
    //     filename: function (req:any, file:any, cb:any) {
    //       // 파일 저장 이름
    //       // const ext = path.extname(file.originalname);
    //       // const origin = file.originalname.substring(
    //       //   0, file.originalname.lastIndexOf('.')
    //       // )
    //       cb(null, file.fieldname + '-' + Date.now())
    //     }
    //   })
    // })
    // router.post('/userFileUpload', upload.array('userFile'), async (req:any, res:any) => {
    //   // const datas = JSON.parse(req.body.datas);
    //   const datas = JSON.parse(req.body.formData);
    //   console.log('req.files : ', req.files);
    //   console.log('req.body : ', req.body);
    //   res.send(true)
    // })
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
// module.exports = router
exports.default = socket;
