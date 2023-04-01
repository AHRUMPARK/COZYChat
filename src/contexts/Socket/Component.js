// import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
// import { useSocket } from '../../hooks/useSocket';
// import { defaultSocketContextState, SocketContextProvider, SocketReduer } from './Context';

// export interface ISocketContextComponentProps extends PropsWithChildren {}

// const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props)
// => {
//   const { children } = props;

//   const [SocketState, SocketDispatch ]= useReducer(SocketReduer, defaultSocketContextState);
//   const [ loading, setLoading ] = useState(true);

//   const socket = useSocket('ws://localhost:3010', {
//     reconnectionAttempts: 5,
//     reconnectionDelay: 5000,
//     autoConnect: false
//   });

//   useEffect(() => {
//     // 연결 웹소켓
//     socket.connect();
//     // context 저장
//     SocketDispatch({ type: 'update_socket', payload: socket});
//     // 시작 이벤트ㅡ
//     StartListeners();
//     // 보내기 handshake
//     SendHandShake();
//   }, [])
//   const StartListeners = () => {
//     //재연결 이벤트
//     socket.io.on('reconnect', (attempt) => {
//       console.log('재연결 on attempt : ', attempt);
//     });

//     //재연결 이벤트
//     socket.io.on('reconnect_attempt', (attempt) => {
//       console.log('재연결 on attempt : ', attempt);
//     });

//     //재연결 이벤트
//     socket.io.on("reconnect_err", (error) => {
//       console.log('재연결 on error : ', error);
//     });
//   };

//   const SendHandShake = () => {};

//   if (loading) return <p>loading socket io .. </p>;

//   return <SocketContextProvider value={{SocketState, SocketDispatch }}>{children}</SocketContextProvider>
// };

// export default SocketContextComponent;
