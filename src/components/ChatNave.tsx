import React from 'react';
import './ChatNave.css';
import logo from '../assets/LOGO_SUB.png';

export default function ChatNave() {
  const goMain = () => {
    window.location.reload();
  };

  return (
    <div className="chatNave_container">
      <div className="chatNave">
        <img src={logo} alt="로고" onClick={goMain} />
        <p className="main_notice">
          서로를 위한 존중하는 채팅문화 부탁드립니다.
        </p>
        <button onClick={goMain}></button>
      </div>
    </div>
  );
}
