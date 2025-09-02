import { io } from "socket.io-client";
const socket = io("https://meetx-backend-a0kt.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});

socket.on("connect", () => {
});

export default socket;
