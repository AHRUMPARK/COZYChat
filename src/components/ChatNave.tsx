import React from 'react'
import './ChatNave.css';
import logo from '../assets/logo.png';
// import { useNavigate } from 'react-router-dom';

export default function ChatNave() {
  // const navigate = useNavigate();

  // 라우터 설정해야 함
  const goMain = () => {
    // navigate('http://localhost:3000');
    
  }
  return (
    <div className='chatNave_container'>
        <div className='chatNave'>
        <img src={logo} alt='로고' onClick={goMain}/>
        <p>공지 : 채팅 매너 부탁드립니다.</p>
        <button onClick={goMain}>exit</button>
        </div>
        
    </div>
  )
}
