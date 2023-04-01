// import React from 'react';
// import { Socket } from 'socket.io-client';
// import { createContext } from 'vm';

// export interface ISocketContextState {
//   socket: Socket | undefined;
//   uid: string;
//   users: string[];
// }

// export const defaultSocketContextState: ISocketContextState = {
//   socket: undefined,
//   uid: '',
//   users: [],
// };

// export type TSocketContextActions =
//   | 'update_socket'
//   | 'udpate_uid'
//   | 'update_users'
//   | 'remove_user';

// export type TSocketContextPayload = string | string[] | Socket;

// export interface ISocketContextActions {
//   type: TSocketContextActions;
//   payload: TSocketContextPayload;
// }

// export const SocketReduer = (
//   state: ISocketContextState,
//   action: ISocketContextActions
// ) => {
//   console.log(
//     `message received - action : ${action.type} - payload : `,
//     action.payload
//   );

//   switch (action.type) {
//     case 'update_socket':
//       return { ...state, socket: action.payload as Socket };
//     case 'udpate_uid':
//       return { ...state, uid: action.payload as string };
//     case 'update_users':
//       return { ...state, users: action.payload as Socket };
//     case 'remove_user':
//       return {
//         ...state,
//         users: state.users.filter((uid) => uid != (action.payload as string)),
//       }; // 사용자가 아닌 모든 유저 반환
//     default:
//       return { ...state };
//   }
// };

// export interface ISocketContextProps {
//   SocketState: ISocketContextState;
//   SocketDispatch: React.Dispatch<ISocketContextActions>;
// }

// const SocketContext = createContext<ISocketContextProps>({
//   SocketState: defaultSocketContextState,
//   SocketDispatch: () => {},
// });

// export const SocketContextConsumer = SocketContext.Consumer;
// export const SocketContextProvider = SocketContext.Provider;

// export default SocketContext;
