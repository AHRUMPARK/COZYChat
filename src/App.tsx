import React, { useRef, useState } from 'react';
import LOGO from '../src/assets/logo.png';
import backImg from '../src/assets/back_img.jpg';
import style from './App.module.css';
import ChatRoom from './components/ChatRoom';

export type userNameProps = {
  name: string;
};

function App() {
  //start true => 채팅방 입장
  const [start, setStart] = useState<null | boolean>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);

  const onStartChat = () => {
    if (nickNameRef.current === null) {
      alert('닉네임을 입력해 주세요.');
      setStart(false);
      return false;
    } else {
      const userName = nickNameRef.current.value;
      console.log(userName);
      setStart(true);
    }
  };
  return (
    <>
      {start === true ? (
        <ChatRoom sendName={nickNameRef.current!.value} />
      ) : (
        <div className={style.main_container}>
          <img className={style.backImg} src={backImg} alt="백이미지" />
          <div className={style.info_container}>
            <div className={style.in_container}>
              <div className={style.margin}>
                <img src={LOGO} alt="메인 로고" />
              </div>
              <div className={style.margin}>
                <input
                  type="text"
                  ref={nickNameRef}
                  placeholder="닉네임을 입력하세요."
                  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') onStartChat();
                  }}
                />
              </div>
            </div>
            <div className={style.margin}>
              <button onClick={onStartChat}>채팅하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
