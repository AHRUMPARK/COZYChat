import { useRef, useEffect } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

// socket hooks
export const useSocket = (
  uri: string,
  opts?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket => {
  // socket 유형
  const { current: socket } = useRef(io(uri, opts));

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  return socket; // socket 반환
};
