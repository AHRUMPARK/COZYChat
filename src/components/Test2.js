const [socket, setSocket] = useState();

useEffect(() => {
  const socketIo = io('http://localhost:8080', {
    cors: {
      origin: 'http://localhost:8080',
      credentials: true,
    },
    transports: ['websocket'],
    query: {
      tenant: 'EGU',
    },
  });

  socketIo.on('responsRoom', (data) => {
    console.log(data);
  });

  setSocket(socketIo);
}, []);

useEffect(() => {
  return () => {
    if (socket) {
      socket.disconnect();
    }
  };
}, [socket]);

const joinRoom = () => {
  socket.emit('refresh', {
    noticeNo: params?.noticeNo,
  });
};
