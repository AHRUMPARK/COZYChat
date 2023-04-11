import * as http from 'http';
import * as path from 'path';
import socket from './socket';


const fs = require('fs');
const multer = require('multer');
const express = require('express');

// localhost 포트 설정
const PORT = 3010;
const app = express();

// 미들웨어 cors 어떤 주소로 요청해도 에러가 뜨지 않도록
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱



// multer
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req:any, file:any, done:any) {
        // 파일 저장경로 uploads
        done(null, '../build/uploads')
      },
      filename: function (req:any, file:any, done:any) {
        //파일 저장 이름
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
        const ext = path.extname(file.originalname);
        const origin = file.originalname.substring(
          0, file.originalname.lastIndexOf('.')
        )
        done(null, `${origin}-${Date.now()}-${ext}`)//저장 파일 명
      }
    })
  })
  
  app.post('/userFileUpload', upload.array('userFile'), async (req:any, res:any) => {
    if ( req.files === undefined )
     {
        console.log('파일이 없습니다.')
        res.send(false)
    } else {
        console.log('req.files : ', req.files);
        res.send(req.files)
    }
  })

// server instance
const server = http.createServer(app);

// socketio 생성 후 서버 인스텐스 사용
socket(server);
server.listen(PORT, () => console.log(`Server port ${PORT} OPEN!`));

module.exports = app;