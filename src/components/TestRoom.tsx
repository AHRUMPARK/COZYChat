import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ChatNave from './ChatNave';
import SideNave from './SideNave';
import userNameProps from '../App';
import './ChatRoom.css';
import LetterForm from './LetterForm';

interface userNameProps {
  sendName: string;
}

export default function TestRoom(props: userNameProps) {
  const [name, setName] = useState<string | null>(null);
  const [message, setMessage] = useState(null);
  const [messages, setMessages]: any = useState<string[]>();

  let chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [arrayList, setArrayList] = useState([]);

  let socket = io('http://localhost:3010');

  useEffect(() => {
    socket.emit('firstjoin', props.sendName);
    console.log('server connected', props.sendName);
  }, []);

  socket.on('userUpdate', (list) => {
    setArrayList(list); //arrayList는 이차원배열로 [x][0]엔 닉네임 [x][1]엔 socket Id가 들어있다
  });
  console.log('ggggggggggggggggggggg', arrayList);
  // 연결
  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('server connected');

    //   //state는 초기값을 가져와서....null
    //   socket.emit('username', props.sendName);
    //   setName(props.sendName);
    // });

    // 서버에서 소켓 아이디 받기
    let my_id = '';
    socket.on('info', (socketID: string) => {
      // setName(socketID);
      my_id = socketID;
      console.log('소켓아이디 my_id:', my_id);
    });

    // 공지 ( 유저 입장 & 퇴장 알림 )
    socket.on('notice', (msg: string) => {
      console.log('입장 알림 :', msg);
      const chat_box_body = document.querySelector(
        '.chat-box-body'
      ) as HTMLDivElement;
      if (chat_box_body === null) return false;

      const div = document.createElement('div');
      div.classList.add('notice');
      // 메세지 넣기 (입장, 퇴장)
      div.textContent = msg;
      chat_box_body.appendChild(div);
    });

    // 메세지 받기
    socket.on('newMSG', (json: { username: string; msg: string }) => {
      console.log('이거 json값 콘솔 찍힘? ', json);
      const chat_box_body = document.querySelector(
        '.chat-box-body'
      ) as HTMLDivElement;
      // const outer_div = document.createElement('div');
      const div = document.createElement('div');

      div.textContent = `${json.username} + '  ' + ${json.msg}`;
      chat_box_body.appendChild(div);
    });
  }, []);

  const btnSend = () => {
    const input = document.getElementById('msgBox') as HTMLInputElement;
    socket.emit('sendMSG', { msg: input.value });
    input.value = '';
  };

  return (
    <>
      <ChatNave />
      <div className="chatRoom_page">
        <SideNave />

        <div className="chatRoom_container">
          {/* 공지구간 */}
          <div></div>

          {/* 채팅 로그 구간 */}
          <p style={{ width: 300 }} title="접속중인 유저">
            {arrayList.map((props) => {
              return <LetterForm props={props} socket={socket} />;
            })}
            {/* //렌더링 될때마다 socket 연결되는걸 방지하기 위해 컴포넌트 분리 */}
          </p>
          <div className="row">
            <div className="chat-box-body" ref={chatBodyRef}>
              <div className="chat right user">나</div>
              <div className="chat_log Right">I'm speech bubble</div>
              <div className="chat right time">오전 12:24</div>

              <div className="chat left user">상대방</div>
              <div className="chat_log Left">I'm speech bubble</div>
              <div className="chat left time">오전 12:30</div>
            </div>
          </div>

          {/* 채팅 입력 구간 */}
          <div className="chat_input">
            <form>
              <input
                type="text"
                id="msgBox"
                placeholder="메세지를 입력하세요.."
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault(); // 기본 동작 막기
                    btnSend();
                  }
                }}
              />
              <select id="members"></select>

              <button type="button" className="sendBtn" onClick={btnSend}>
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
