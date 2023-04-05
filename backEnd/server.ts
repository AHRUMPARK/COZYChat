// import express from 'express';
import * as http from 'http';
import * as path from 'path';
import socket from './socket';

const fs = require('fs');
const multer = require('multer');
const express = require('express');

// localhost 포트 설정
const PORT = 3010;
const app = express();


app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱, 유저가 보낸 데이터 출력하기 위해 필요
app.use(express.urlencoded({ extended: true })); // uri 파싱

// upload 할 폴더 없을 시 생성
// try {
//     fs.readdirSync('..public/uploads');
//   } catch (err) {
//     console.error('upload할 upload 폴더가 없습니다. 폴더를 생성합니다.');
//     fs.mkdirSync('../public/uploads');
//   }

// multer
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req:any, file:any, done:any) {
        // 파일 저장경로 uploads
        done(null, '../public/uploads')
      },
      filename: function (req:any, file:any, done:any) {
        //파일 저장 이름
        const ext = path.extname(file.originalname);
        const origin = file.originalname.substring(
          0, file.originalname.lastIndexOf('.')
        )
        done(null, `${origin}-${Date.now()}-${ext}`)//저장 파일 명
      }
    })
  })
  
  app.post('/userFileUpload', upload.array('userFile'), async (req:any, res:any) => {
    if ( req.body.formData === undefined || req.files === undefined )
    // if ( req.files === undefined )
     {
        console.log('파일이 없습니다.')
        console.log('req.files?? : ', req.files);
    } else {
        const datas = JSON.parse(req.body.formData);
        console.log('req.files : ', req.files);
        console.log('req.body : ', req.body);
        res.send(true)
    }
  })

// server instance
const server = http.createServer(app);

// socketio 생성 후 서버 인스텐스 사용
socket(server);
server.listen(PORT, () => console.log(`Server port ${PORT} OPEN!`));

module.exports = app;