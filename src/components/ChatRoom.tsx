import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';
import ChatNave from './ChatNave'
import SideNave from './SideNave'
import userNameProps from '../App';

import './ChatRoom.css';

// interface userNameProps {
//     name: string;
//   }
//({sendName} : {sendName : userNameProps })

type userNameType = {
    name: userNameProps;
}

export default function ChatRoom({props}: userNameType) {
    const [ name, serName ] = useState<string | null>(null);
    const [ notice, setNotice ] = useState<string | null>(null);
    let chatBodyRef = useRef<HTMLDivElement | null>(null);
    
    const socket = io('http://localhost:3010');
    useEffect(() => {
      // 서버에 닉네임 알려주기. connect 이벤트 때 서버로 전달
    socket.on("connect", () => {
      console.log("server connected");
      socket.emit("username", props.sendName);
      if (nickNameRef.current === null) {
        alert('닉네임을 입력해 주세요.');
        // nickNameRef.current.focus();
        setStart(false);
        return false;
      } else {
        const userName = nickNameRef.current!.value;
        console.log(userName);
        socket.emit("username", userName);
        setStart(true);
      }
    })
    },[])
    // 소켓 아이디 받기
    useEffect(() => {
        if( typeof name === 'string' )
        socket.on('info', (socketID: any) => {
            serName(socketID);
            console.log('소켓아이디:', socketID);
        })
    },[name]);

    // 공지
    useEffect(() => {
        socket.on('notice', (msg) => {
            // const chat
            console.log('입장 알림 :', msg)
            const chat_box_body = document.querySelector<HTMLDivElement>('.chat-box-body');
            if(chat_box_body === null) return false;
            // if(chatBodyRef.current === null) return false;
            // console.log('여기로 안오는것같은데..',chatBodyRef.current);
            console.log('여기로 안오는것같은데..',chat_box_body);
            const div = document.createElement('div');
            div.classList.add('notice');
            // 메세지 넣기
            div.textContent = msg;
            // chatBodyRef.current!.appendChild(div);
            chat_box_body.appendChild(div);
            setNotice(msg);
        })
    },[]);



    const btnSend = () => {
        
    }
    // const onSocket = () => {
    //     const socket = io('http://localhost:3010');
        
    //     setInterval(() => {
    //         socket.e
    //     })
    // }
  return (
    <>
       <ChatNave />
       <div className='chatRoom_page'>
       <SideNave />

       <div className='chatRoom_container'>
       {/* 공지구간 */}
        <div>
            
        </div>
        
        {/* 채팅 로그 구간 */}
            
        <div className='row'>
            <div className='chat-box-body' ref={chatBodyRef} id="">
                <div className='chat right user'>나</div>
                <div className="chat_log Right">I'm speech bubble</div>
                <div className='chat right time'>오전 12:24</div>

                <div className='chat left user'>상대방</div>
                <div className="chat_log Left">I'm speech bubble</div>
                <div className='chat left time'>오전 12:30</div>
            </div>
        </div>
            <div className='notice'></div>

        {/* 채팅 입력 구간 */}
        <div className='chat_input'>
            <form>
                <input type="text" id="msgBox" placeholder='메세지를 입력하세요..' />
                <select id="members"></select>
                <button type='submit' className='sendBtn' onClick={btnSend}>send</button>
            </form>
        </div>

       </div>
       </div>
    </>
  )
}
