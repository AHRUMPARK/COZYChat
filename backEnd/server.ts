import * as express from 'express';
import * as http from 'http';
import socket  from './socket';
import * as path from 'path';


// localhost 포트 설정
const PORT = 3010;

const app = express();

// server instance
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱

// socketio 생성 후 서버 인스텐스 사용
socket(server);
server.listen(PORT, () => console.log(`Server port ${PORT} OPEN!`));