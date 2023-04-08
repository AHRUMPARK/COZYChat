import React from 'react';
import './SideNave.css';
import { useDispatch, useSelector } from 'react-redux';

import back_cloud from '../assets/back_img.jpg';

interface Alert {
  content: string;
  date: string;
  time: string;
}
export default function SideNave() {
  const notice_list = useSelector((state: any) => state.notice);
  console.log('notice_list 사이드 네브 :', notice_list);

  return (
    <div className="sideNave_container">
      <div>
        <img src={back_cloud} alt="구름 배경" />
      </div>
      <p className="al">공지</p>
      <div className="notice_list">
        {notice_list
          .slice(0)
          .reverse()
          .map((alert: Alert) => createNotice(alert))}
      </div>
    </div>
  );
}

const createNotice = (alert: Alert) => {
  console.log('createNotice : ', alert);
  return (
    <div className="notice_alert">
      <p>{alert.content}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{alert.date}</span>
        <span>{alert.time}</span>
      </div>
    </div>
  );
};
