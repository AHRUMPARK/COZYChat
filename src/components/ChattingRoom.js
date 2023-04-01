// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import ChatNave from './ChatNave';
// import SideNave from './SideNave';
// import userNameProps from '../App';
// import './ChatRoom.css';
// import SocketContext from '../contexts/Socket/Context';

// // interface userNameProps {
// //   sendName: string;
// // }

// export interface IApplicationPorps {}

// const ChattingRoom: React.FunctionComponent<IApplicationPorps> = (props) => {
//   const { socket, uid, users } = useContext(SocketContext).SocketState;

//   return (
//     <>
//       <ChatNave />
//       <div className="chatRoom_page">
//         <SideNave />
//         <h2>소켓 정보</h2>
//         <p>
//           당신의 유저 아이디 : <strong>{uid}</strong>
//           <br />
//           온라인 유저들 : <strong>{users.length}</strong>
//           <br />
//           Socket ID : <strong>{socket.id}</strong>
//           <br />
//         </p>
//       </div>
//     </>
//   );
// };

// export default ChattingRoom;
