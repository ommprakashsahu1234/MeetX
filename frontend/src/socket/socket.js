import { io } from "socket.io-client";
const socket = io("//backendlinkpastehere", {
  withCredentials: true,
  transports: ["websocket"],
});

socket.on("connect", () => {
});

export default socket;
