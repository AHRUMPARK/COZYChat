"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var socket_1 = require("./socket");
var path = require("path");
// localhost 포트 설정
var PORT = 3010;
var app = express();
// server instance
var server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱
// socketio 생성 후 서버 인스텐스 사용
(0, socket_1["default"])(server);
server.listen(PORT, function () { return console.log("Server port ".concat(PORT, " OPEN!")); });
