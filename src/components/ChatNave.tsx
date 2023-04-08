import React from 'react';
import './ChatNave.css';
import logo from '../assets/LOGO_SUB.png';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

export default function ChatNave() {
  const notice_list = useSelector((state: any) => state.notice.notice);
  console.log('notice_list 사이드 네브 :', notice_list);
  let today = new Date();
  let options: any = { hour: 'numeric', minute: 'numeric' };
  let date = today.toLocaleDateString();
  let time = today.toLocaleTimeString('ko-KR', options);

  const goMain = () => {
    window.location.reload();
  };
  return (
    <div className="chatNave_container">
      <div className="chatNave">
        <img src={logo} alt="로고" onClick={goMain} />
        <p> 서로를 위한 존중하는 채팅문화 부탁드립니다.</p>
        {/* <div className="notice_container">
          <p className="al">공지</p>
          <div className="notice_alret">
            <p>{notice_list ? notice_list : '.....'}</p>
            <p>{date + '                   ' + time}</p>
          </div>
        </div> */}

        <button onClick={goMain}></button>
      </div>
    </div>
  );
}
