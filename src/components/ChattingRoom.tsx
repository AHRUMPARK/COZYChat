import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ChatNave from './ChatNave';
import SideNave from './SideNave';
import userNameProps from '../App';
import './ChatRoom.css';

interface userNameProps {
  sendName: string;
}

export default function ChattingRoom(props: userNameProps) {
  // const [isConnected, setIsConnected] = useState(io('http://localhost:3010'));

  const [name, setName] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [nicknameList, setNickname] = useState<string[]>();
  let chatBodyRef = useRef<HTMLDivElement | null>(null);

  // const [message, setMessage] = useState<string | null>(null);
  // const [messageReceived, setMessageReceived] = useState<string | null>(null);

  // let socket: any = null;
  let socket = io('http://localhost:3010');

  const btnSend = () => {
    const input = document.getElementById('msgBox') as HTMLInputElement;
    // dm 용
    // const to = document.getElementById('members').value;
    // socket.emit('sendMSG', { message });
    socket.emit('sendMSG', { msg: input.value });
    input.value = '';
  };

  // 연결
  useEffect(() => {
    // let socket = io('http://localhost:3010');
    socket.on('connect', () => {
      console.log('server connected');

      //state는 초기값을 가져와서....null
      socket.emit('username', props.sendName);
      setName(props.sendName);
    });

    // 서버에서 소켓 아이디 받기
    let my_id = '';
    socket.on('info', (socketID: string) => {
      // setName(socketID);
      my_id = socketID;
      console.log('소켓아이디 my_id:', my_id);
    });

    // 실시간 디엠 리스트
    // socket.on('list', (list: string[]) => {
    //   // if (typeof list !== null)
    //   setNickname(list);
    //   // console.log('list란?', list);
    //   // const member_list = document.getElementById('members') as HTMLSelectElement;
    //   // // 첫번째 자식이 있으면, 실행 > 셀렉박스 마지막요소를 지운다
    //   // // Select box option tag 모두 지우기?
    //   // while(member_list.firstChild) member_list.removeChild(member_list.lastChild);
    //   // const option = document.createElement('option') as HTMLOptionElement;
    //   // option.text = '전체'
    //   // option.value = '전체'

    //   // // 옵션 추가
    //   // member_list.appendChild(option);

    //   // // 접속 인원 디엠 셀렉박스 리스트
    //   // console.log(Object.entries(list));
    //   // for (let [key, value] of Object.entries(list)){
    //   //   const option = document.createElement('option') as HTMLOptionElement;
    //   //   option.text = value;
    //   //   option.value = value;
    //   //   member_list.appendChild(option);
    //   // }
    // });

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
      // 클래스 밖, 메세지 안?
      // if (my_id === json.from )
      // console.log('json.form :', from);
      // div.textContent = json.username + " : "+ json.msg;
    });
  }, []);

  // useEffect(() => {
  //   socket.on('message', (message) => {
  //     setMassage([...messages, message]);
  //   });
  //   // socket.on('roo')
  // }, []);

  // // 메세지 보내기 버튼
  // const btnSend = (event) => {
  //   event.prevntDefault();
  //   if (message) {
  //     socket.emit('sendMessage', message, ()=> setMessage(''));
  //   };

  // // 메세지 보내기 버튼
  // const btnSend = () => {
  //   const input = document.getElementById('msgBox') as HTMLInputElement;
  //   // dm 용
  //   // 어떤 사람인지 보낼 때, 정보도 같이 보낸다 to
  //   // const to = document.getElementById('members').value;
  //   // { to : to}
  //   socket.emit("sendMSG", {msg : input.value})
  //   input.value = '';
  // };

  return (
    <>
      <ChatNave />
      <div className="chatRoom_page">
        <SideNave />

        <div className="chatRoom_container">
          {/* 공지구간 */}
          <div></div>

          {/* 채팅 로그 구간 */}

          <div className="row">
            <div className="chat-box-body" ref={chatBodyRef}>
              <div className="chat right user">나</div>
              <div className="chat_log Right">I'm speech bubble</div>
              <div className="chat right time">오전 12:24</div>

              <div className="chat left user">상대방</div>
              <div className="chat_log Left">I'm speech bubble</div>
              <div className="chat left time">오전 12:30</div>

              {/* <div className="chat left user">상대방</div> */}
              {/* <div className="chat_log Left">{message}</div> */}
              {/* <div className="chat left time">오전 12:30</div> */}
            </div>
          </div>
          {/* <div className="notice"></div> */}

          {/* 채팅 입력 구간 */}
          <div className="chat_input">
            <form>
              <input
                type="text"
                id="msgBox"
                placeholder="메세지를 입력하세요.."
                // onChange={onSendMSG}
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault(); // 기본 동작 막기
                    btnSend();
                  }
                }}
              />
              <select id="members">
                <option>전체</option>
                {nicknameList && nicknameList.length > 0 ? (
                  <>
                    {nicknameList &&
                      nicknameList.map((el) => {
                        return (
                          <>
                            <option>{el}</option>
                          </>
                        );
                      })}
                  </>
                ) : (
                  <div>no user...</div>
                )}
                ;
              </select>

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
