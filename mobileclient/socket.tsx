import { io } from "socket.io-client";
const socket = io("http://10.0.0.106:3000");

socket.on("respText", (args)=> {
    console.log({args});
  }),

  socket.on('confirm', () => {
    console.log("confirm");
  })

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

export default socket;