import React, { useEffect, useRef, useState } from 'react';
import userNameProps from './TestRoom';

interface userNameProps {
  props: any;
  socket: any;
  //   me: any;
}

export default function LetterForm(props: userNameProps) {
  // const [open, setOpen] = useState("");
  //   const [id, setId] = useState("");
  //   const [message, setMessage] = useState('');

  //   const openInput = () => {
  //     setOpen(prev => !prev);         //메세지 전송창 띄우기 용
  //   }

  //   const onChangeMessage = (event) => {
  //     setMessage(event.target.value);
  //   }

  //   useEffect(() => {
  //     setId(props[1]);         //해당 유저의 socket ID
  //   }, [])

  //   const sendMessage = () => {
  //     socket.emit('message', {   //메세지로 보내는 정보 :받는사람의 socketId, 보내는사람의 닉네임, 메세지 내용
  //       id,
  //       nick:me.nickname,
  //       message,
  //     });
  //     setMessage("");   //메세지보낸 후 초기화
  //   }

  return (
    <>
      {/* <a><p key={props[1]} onClick={openInput}>{props[0]}</p></a>     */}
      {/* props[0]엔 유저의 닉네임이, props[1]엔 유저의 socket Id가 들어있다. */}
      {/* {open && */}
      <>
        {/* <input value={message} showCount maxLength={30} onChange={onChangeMessage} />
          <button type="primary" style={{ marginTop: 10 }} onClick={sendMessage}>전송</button> */}
      </>
      {/* } */}
    </>
  );
}
