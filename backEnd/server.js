"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http = require("http");
var path = require("path");
var socket_1 = require("./socket");
var fs = require('fs');
var multer = require('multer');
var express = require('express');
// localhost 포트 설정
var PORT = 3010;
var app = express();
// 미들웨어 cors 어떤 주소로 요청해도 에러가 뜨지 않도록
var cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱
// multer
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, done) {
            // 파일 저장경로 uploads
            done(null, '../build/uploads');
        },
        filename: function (req, file, done) {
            //파일 저장 이름
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
            var ext = path.extname(file.originalname);
            var origin = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
            done(null, "".concat(origin, "-").concat(Date.now(), "-").concat(ext)); //저장 파일 명
        }
    })
});
app.post('/userFileUpload', upload.array('userFile'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.files === undefined) {
            console.log('파일이 없습니다.');
            res.send(false);
        }
        else {
            console.log('req.files : ', req.files);
            res.send(req.files);
        }
        return [2 /*return*/];
    });
}); });
// server instance
var server = http.createServer(app);
// socketio 생성 후 서버 인스텐스 사용
(0, socket_1["default"])(server);
server.listen(PORT, function () { return console.log("Server port ".concat(PORT, " OPEN!")); });
module.exports = app;
