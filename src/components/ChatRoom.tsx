import React, { useEffect, useRef, useState } from 'react';

import ChatNave from './ChatNave';
import SideNave from './SideNave';
import userNameProps from '../App';

import socket from '../util/socket';
import InputEmoji from './InputEmoji.jsx';

import './ChatRoom.css';

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
  let emojiRef = useRef<HTMLDivElement | null>(null);
  let online_members = useRef<HTMLSelectElement>(null);
  const [select, setSelect] = useState<string | null>(null);

  const btnSend = () => {
    const input = document.getElementById('msgBox') as HTMLInputElement;
    // dm 용
    // const to = document.getElementById('members').value;
    if (online_members.current) {
      let to: string = online_members.current.value;
      // {to : to }
      socket.emit('sendMSG', { msg: input.value, to });
      console.log('toooooooooooo', to);
      input.value = '';
    }
  };

  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if(nicknameList !== undefined | string[])
  //   if(Object.keys[nicknameList].find((key) => nicknameList[key] = my_id)){
  //     alert('자신에게 dm을 보낼 수 없습니다.');
  //     e.target.value = 'default';
  //   }
  //   setSelect(e.target.value)
  // }

  let userList: string[];
  let my_id: string;

  useEffect(() => {});
  useEffect(() => {
    socket.emit('username', props.sendName);

    // 서버에서 소켓 아이디 받기
    socket.on('info', (socketID: string) => {
      console.log('소켓아이디 socketID:', socketID);
      my_id = socketID;
    });

    // 실시간 디엠 리스트
    socket.on('list', (list) => {
      console.log('list', list);
      setNickname(list);

      // 접속 인원 디엠 셀렉박스 리스트
      console.log('접속 인원', Object.entries(list));
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
      const notice = chat_box_body.appendChild(div);
      notice.classList.add('notice');
    });

    // 메세지 받기
    socket.on(
      'newMSG',
      (json: {
        username: any;
        msg: string;
        from: string;
        is_dm: boolean;
        times: string;
      }) => {
        console.log('이거 json값 콘솔 찍힘? ', json);
        const chat_box_body = document.querySelector(
          '.chat-box-body'
        ) as HTMLDivElement;

        const time = document.createElement('div');
        const nickname = document.createElement('div');
        const my_div = document.createElement('div');
        const your_div = document.createElement('div');
        const outer_div = document.createElement('div');
        const div = document.createElement('div');
        nickname.textContent = json.username;
        div.textContent = json.msg;

        // 내가 보낸 메세지인지
        if (my_id === json.from) nickname.textContent = json.username;
        div.textContent = json.msg;
        time.textContent = json.times;
        // const nick = your_div.appendChild(nickname);
        // const chat = your_div.appendChild(div);
        // const totime = your_div.appendChild(time);
        your_div.appendChild(nickname);
        your_div.appendChild(div);
        your_div.appendChild(time);
        your_div.classList.add('your_div');
        // chat.classList.add('chat');
        // totime.classList.add('totime');
        chat_box_body.appendChild(your_div);

        console.log('마이아이디', my_id);

        // dm 스타일 클래스
        if (my_id === json.from) {
          // 내가 보내는 디엠
          if (json.is_dm) outer_div.classList.add('my-dm', 'chat_log', 'Right');
          else outer_div.classList.add('chat_log', 'Right');
        } else {
          // 다른사람이 보낸 디엠
          if (json.is_dm) outer_div.classList.add('dm', 'chat_log', 'Right');
          else outer_div.classList.add('chat_log', 'Left');
        }

        outer_div.appendChild(div);
        chat_box_body.appendChild(outer_div);
      }
    );
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
                {/* <div className="chat right user">나</div>
                <div className="chat_log Right">I'm speech bubble</div>
                <div className="chat right time">오전 12:24</div>

                <div className="chat left user">상대방</div>
                <div className="chat_log Left">I'm speech bubble</div>
                <div className="chat left time">오전 12:30</div> */}
              </div>
            </div>
            {/* <div className="notice"></div> */}

            {/* 채팅 입력 구간 */}
            <div className="chat_input">
              <div>
                {/* DM셀렉트 박스 */}
                <select id="members" defaultValue="전체" ref={online_members}>
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
                {/* <D /> */}
                {/* <InputEmoji /> */}
                <input
                  type="text"
                  id="msgBox"
                  placeholder="메세지를 입력하세요.."
                  onKeyDown={(e: any) => {
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
                <div ref={emojiRef}></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
