import * as http from 'http';
import { Server } from 'socket.io';

// cors 설정
let socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*' || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  // let socket = socketIo(server, {
  //   cors: {
  //       origin: 'http://localhost:3000',
  //       methods: ["GET","POST"]
  //   }
  // });

  // 유저 리스트
  let userList: any = {};
  // 최초 입장 & 서버 알림
  // 닉네임 받기 => 소켓 아이디와 닉네임 맞춰주기
  // { 소켓 아이디 : "닉네임", 소켓아이디: "닉네임" } 키 벨류로 한명씩 추가
  io.on('connect', (socket) => {
    console.log(`새로운 유저 ${socket.id} 연결`);

    socket.on('username', (name: string) => {
      // [socket.id] 키 : name 값
      userList[socket.id] = name;
      console.log('1번 userList=!!!!!!!!:', userList);

      io.emit('list', userList);
      // 통신하는 고유 소캣 아이디 클라이언트에게 보내기
      let today = new Date();
      let options: any = { hour: 'numeric', minute: 'numeric' };
      let date = today.toLocaleDateString();
      let time = today.toLocaleTimeString('ko-KR', options);
      socket.emit('info', socket.id);
      io.emit('notice', date + ' ' + ' ' + time);
      io.emit('notice', name + ' 님이 입장하셨습니다.');
    });

    // sendMSG 이벤트 json 형태
    socket.on('sendMSG', (json) => {
      // json['is_file']
      console.log(userList);
      console.log( json )
      let today = new Date();
      let options: any = { hour: 'numeric', minute: 'numeric' };
      let date = today.toLocaleDateString();
      let time = today.toLocaleTimeString('ko-KR', options);

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
        io.emit('newMSG', json); // '전체'가 아닐때, dm 모드
      } else {
        let socketID = Object.keys(userList).find((key) => key === json.to);

        json['is_dm'] = true;
        console.log('4번 DM socketID 소켓아이디 : ', socketID);
        // if (socketID !== undefined)
        io.to(socketID!).emit('newMSG', json);
        // 자기 자신한테도 메세지 보내줘야한다 (디엠시)

        socket.emit('newMSG', json);
      }
      console.log('5번 newMSG=============', json);
    });

    // 리스트 객체에서 닉네임 가져오기
    socket.on('disconnect', () => {
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

export default socket;
