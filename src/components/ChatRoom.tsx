import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/Notice';
import socket from '../util/socket';
import ChatNave from './ChatNave';
import SideNave from './SideNave';
import userNameProps from '../App';

import './ChatRoom.css';

import axios from 'axios';

//emoji-mart
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface userNameProps {
  sendName: string;
}

export default function ChatRoom(props: userNameProps) {
  const [nicknameList, setNickname] = useState<string[]>();
  let chatBodyRef = useRef<HTMLDivElement | null>(null);
  let online_members = useRef<HTMLSelectElement>(null);
  let fileRef = useRef<HTMLInputElement>(null);

  // isEmoji (이모지 창 보여줄지 안보여줄지) //currentEmoji 현재 선택한 이모지
  const [isEmoji, setIsEmoji] = useState<boolean>(false);
  const [currentEmoji, setCurrentEmoji] = useState<any>([]);
  const [input, setInput] = useState<string>('');

  // 토글 버튼
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const btnSend = () => {
    const input = document.getElementById('msgBox') as HTMLInputElement;

    if (online_members.current) {
      let to: string = online_members.current.value;
      // {to : to }
      socket.emit('sendMSG', { msg: input.value, to, is_file: false });
      input.value = '';
      setCurrentEmoji('');
      setInput('');
    }
  };
  const dispatch = useDispatch();

  // 공지
  const onNotice = useCallback(() => {
    const input = document.getElementById('msgBox') as HTMLInputElement;
    let today = new Date();
    let options: any = { hour: 'numeric', minute: 'numeric' };
    let date = today.toLocaleDateString();
    let time = today.toLocaleTimeString('ko-KR', options);

    if (input.value == '') {
      input.focus();
      alert('공지 메세지를 적어주세요 🥺');
      return false;
    }

    const noticeAlert = {
      content: input.value,
      date: date,
      time: time,
    };
    socket.emit('allNotice', noticeAlert);

    input.value = '';
  }, []);

  const onFile = async (e: any) => {
    const form = document.getElementById('form') as HTMLFormElement;
    const formData = new FormData();

    const fileData = form.userFile.files;
    for (var i = 0; i < fileData.length; i++) {
      formData.append('userFile', fileData[i]);
    }

    // http://localhost:3010/userFileUpload
    await axios
      .post('http://49.50.172.207:3010/userFileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8',
          Accept: '*/*',
        },
      })
      .then((res) => {
        if (res.data) {
          if (online_members.current) {
            let to: string = online_members.current.value;
            e.preventDefault();
            console.log('성공 : ', res.data);
            socket.emit('sendMSG', { file: res.data, to, is_file: true });
          }
        } else {
          e.preventDefault();
        }
      });
  };

  // 업로드 버튼
  const onUpload = async () => {
    fileRef.current?.click();
  };

  let userList: string[];
  let my_id: string;

  // socket event
  useEffect(() => {
    socket.emit('username', props.sendName);

    // 서버에서 소켓 아이디 받기
    socket.on('info', (socketID: string) => {
      my_id = socketID;
    });

    // 실시간 디엠 리스트
    socket.on('list', (list) => {
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

    // 메세지 받기 (채팅 로그)
    socket.on(
      'newMSG',
      (json: {
        username: any;
        msg: string;
        from: string;
        is_file: boolean;
        is_dm: boolean;
        times: string;
        file: any;
        to: string;
      }) => {
        console.log('json값 ', json);
        const chat_box_body = document.querySelector(
          '.chat-box-body'
        ) as HTMLDivElement;

        const time = document.createElement('div');
        const nickname = document.createElement('div');
        const file_div = document.createElement('div');
        const content_div_name = document.createElement('div');
        const content_div_time = document.createElement('div');
        const outer_div = document.createElement('div');
        const div = document.createElement('div');

        if (json['is_file']) {
          let fileName = json.file[0];
          console.log('fileName  :  =  = ', fileName.filename);
          file_div.classList.add('img');
          file_div.innerHTML = `<img src="/uploads/${fileName.filename}" alt="업로드이미지"/>`;
        }

        nickname.textContent = json.username;
        div.textContent = json.msg;
        if (json.from === json.to) {
          alert('나에게 DM을 보낼 수 없습니다. 🥺');
          return false;
        }
        // 내가 보낸 메세지 구별
        if (my_id === json.from) nickname.textContent = json.username;
        div.textContent = json.msg;
        time.textContent = json.times;

        div.appendChild(file_div);
        chat_box_body.appendChild(div);
        console.log('마이아이디', my_id);

        // 클래스네임 다르게 부여
        if (my_id === json.from) {
          // 내가 보내는 디엠
          if (json.is_dm) {
            outer_div.classList.add('my-dm', 'chat_log', 'Right'); // 내가 보낸 디엠
            content_div_name.classList.add('nick', 'my-dm-right');
            content_div_time.classList.add('time', 'my-dm-right');
          } else {
            outer_div.classList.add('chat_log', 'Right'); // 내가 보낸 전체챗
            content_div_name.classList.add('nick', 'Right');
            content_div_time.classList.add('time', 'Right');
          }
        } else {
          // 다른사람이 보낸 디엠
          if (json.is_dm) {
            outer_div.classList.add('dm', 'chat_log', 'Left'); // 누가 보낸 디엠
            content_div_name.classList.add('nick', 'dm-left');
            content_div_time.classList.add('time', 'dm-left');
          } else {
            outer_div.classList.add('chat_log', 'Left'); // 누가 보낸 전체챗
            content_div_name.classList.add('nick');
            content_div_time.classList.add('time');
          }
        }
        content_div_name.appendChild(nickname);
        outer_div.appendChild(div);
        content_div_time.appendChild(time);
        chat_box_body.appendChild(content_div_name);
        chat_box_body.appendChild(outer_div);
        chat_box_body.appendChild(content_div_time);
        content_div_time.scrollIntoView({ behavior: 'smooth' });
      }
    );

    // 공지를 받으면, reducer로 전달
    socket.on('alretNotice', (alert) => {
      dispatch(add(alert));
    });
  }, []);

  return (
    <>
      <section>
        <ChatNave />
        <div className="chatRoom_page">
          <SideNave />

          <div className="chatRoom_container">
            {/* 채팅 로그 구간 */}
            <div className="row">
              <div className="chat-box-body" ref={chatBodyRef}></div>
            </div>

            {/* 채팅 입력 구간 */}
            <div className="chat_input">
              <div>
                {/* DM셀렉트 박스 */}
                <div>
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

                <form id="form" encType="multipart/form-data" className="form">
                  {/* 공지 */}
                  <button
                    type="button"
                    className="notice_botton sub_btn"
                    onClick={onNotice}
                  ></button>

                  {/* 이모지 */}
                  <button
                    onClick={(e: any) => {
                      e.preventDefault(); // 기본 동작 막기
                      setIsEmoji(!isEmoji);
                    }}
                    className={isEmoji ? 'd-none' : 'd-block emoji_btn sub_btn'}
                  ></button>
                  <div className={isEmoji ? 'd-block Picker' : 'd-none'}>
                    <Picker
                      data={data}
                      previewPosition="none"
                      // dynamicWidth="true"
                      onEmojiSelect={(e: any) => {
                        setInput(input + e.native);
                        setIsEmoji(!isEmoji);
                      }}
                    />
                  </div>

                  <input
                    type="text"
                    id="msgBox"
                    name="msgInput"
                    placeholder="메세지를 입력하세요.."
                    onKeyDown={(e: any) => {
                      if (e.key == 'Enter') {
                        e.preventDefault(); // 기본 동작 막기
                        btnSend();
                      }
                    }}
                    value={input}
                    onChange={(e) => {
                      setInput(e.currentTarget.value);
                    }}
                  />

                  <button
                    type="button"
                    className="sendBtn"
                    onClick={btnSend}
                  ></button>

                  {/* 업로드 */}
                  <input
                    type="file"
                    name="userFile"
                    className="d-none"
                    ref={fileRef}
                    onChange={onFile}
                    multiple
                  />
                  <button
                    type="button"
                    onClick={(e: any) => {
                      e.preventDefault();
                      onUpload();
                    }}
                    className="upload_botton sub_btn"
                  ></button>

                  {/* 버튼 토글 */}
                  <button
                    className="toggle"
                    type="button"
                    onClick={() => {
                      setIsCheck((e) => !e);
                    }}
                  >
                    {isCheck ? '-' : '+'}
                  </button>
                  {isCheck && (
                    <div className="toggleDiv">
                      <div>
                        <button
                          type="button"
                          className="noticeBtn"
                          onClick={onNotice}
                        ></button>
                      </div>
                      <div>
                        <button
                          onClick={(e: any) => {
                            e.preventDefault(); // 기본 동작 막기
                            setIsEmoji(!isEmoji);
                          }}
                          className={isEmoji ? 'd-none' : 'd-block emojiBtn'}
                        ></button>
                      </div>
                      <div>
                        {' '}
                        <button
                          type="button"
                          onClick={(e: any) => {
                            e.preventDefault();
                            onUpload();
                          }}
                          className="uploadBtn"
                        ></button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
