import React, { ChangeEvent, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import ChatRoom from './components/ChatRoom';


export type userNameProps = {
  name: string;
  // name: nickNameRef.current!.value;
}

function App() {
  
  // 상태가 null일 수도 있고, 아닐 수도 있다.
  // type username = { name: string;};
  const [ start, setStart ] = useState< null | boolean>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);

  const onStartChat = () => {
      if (nickNameRef.current === null) {
          alert('닉네임을 입력해 주세요.');
          // nickNameRef.current.focus();
          setStart(false);
          return false;
        } else {
            const userName = nickNameRef.current!.value;
            console.log(userName);
            setStart(true);
        }
  }
    return (
      <>
        {start === true ? <ChatRoom sendName={nickNameRef.current!.value}/> :
          <div>
              <input type='text' 
              // onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
              ref={nickNameRef} placeholder='닉네임을 입력해주세요.' onKeyUp={(e : React.KeyboardEvent<HTMLInputElement>) => {
                if ( e.key === 'Enter' ) onStartChat()
              }}/>
              <button onClick={onStartChat}>채팅 하기</button>
          </div>
        }
      </>
    );
}

export default App;