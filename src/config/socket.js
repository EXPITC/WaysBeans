import { useContext } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../Context/userContext";

const useSocket = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return io(process.env.REACT_APP_API_SOCKET, {
    cors: {
      origin: process.env.REACT_APP_API_SOCKET,
      methods: ["GET", "POST"],
    },
    transports: ["websocket"],
    auth: {
      token: localStorage.getItem("token"),
    },
    query: {
      id: user.id,
    },
  });
};

export default useSocket;
