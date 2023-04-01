import React, { useEffect, useRef, useState } from 'react';

import ChatNave from './ChatNave';
import SideNave from './SideNave';
import userNameProps from '../App';
import './ChatRoom.css';
import socket from '../util/socket';

interface userNameProps {
  sendName: string;
}

// interface my_ID {
//   my_id: string;
// }

export default function ChatRoom(props: userNameProps) {
  // const [issocketID, setIsSocketID] = useState<string[]>();
  const [issocketID, setIsSocketID] = useState<string[] | null>(null);
  const [nicknameList, setNickname] = useState<string[]>();
  let chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const btnSend = () => {
    const input = document.getElementById('msgBox') as HTMLInputElement;
    // dm 용
    // const to = document.getElementById('members').value;
    socket.emit('sendMSG', { msg: input.value });
    input.value = '';
  };

  let userList: string[];
  let my_id: string;

  useEffect(() => {
    socket.emit('username', props.sendName);
    // setName(props.sendName);

    // 서버에서 소켓 아이디 받기
    socket.on('info', (socketID: string) => {
      console.log('소켓아이디 socketID:', socketID);
      my_id = socketID;
    });

    // 실시간 디엠 리스트
    socket.on('list', (list) => {
      console.log('list', list);
      setNickname(list);

      // const member_list = document.getElementById(
      //   'members'
      // ) as HTMLSelectElement;
      // 첫번째 자식이 있으면, 실행 > 셀렉박스 마지막요소를 지운다
      // Select box option tag 모두 지우기?
      // while (member_list.firstChild)
      // member_list.removeChild(member_list.lastChild);
      // const option = document.createElement('option') as HTMLOptionElement;
      // option.text = '전체';
      // option.value = 'all'; // 서버로 보내지는값

      // // 옵션 추가
      // member_list.appendChild(option);

      // 접속 인원 디엠 셀렉박스 리스트
      console.log('접속 인원', Object.entries(list));
      console.log('접속 인원', Object.entries(list));
      let users: Array<string[]> = Object.entries(list);
      // for (let [key, value] of Object.entries(list)) {
      //   const option = document.createElement('option') as HTMLOptionElement;
      //   option.text = value;
      //   option.value = value;
      //   member_list.appendChild(option);
      // }

      // Object.entries(list).map((el) => {
      //   ({})
      // })
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
      // setNotice(msg);
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

  console.log('nicknameList?', nicknameList);
  // console.log('my_id', my_id);

  return (
    <>
      <section>
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
              </div>
            </div>
            {/* <div className="notice"></div> */}

            {/* 채팅 입력 구간 */}

            <div className="chat_input">
              <div>
                <select id="members" defaultValue="전체">
                  <option value="all">전체</option>
                  {nicknameList &&
                    Object.entries(nicknameList).map((id, value) => {
                      return (
                        <option key={id[0]} value={id[0]}>
                          {id[1]}
                        </option>
                      );
                    })}
                </select>
              </div>
              <form className="form">
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

                <button
                  type="button"
                  className="sendBtn"
                  onClick={btnSend}
                ></button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
