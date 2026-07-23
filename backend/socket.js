import { Server } from "socket.io";
let users = {};
export const initSocket = (server) => {
  // const io = new Server(server, {
  //   cors: ["http://localhost:5173", "https://nextcareerstep.vercel.app"],
  //   // },
  // });
  console.log("socket.js loaded");

  console.log("initSocket called");

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "https://nextcareerstep.vercel.app"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  console.log("Socket.IO instance created");

  io.on("connection", (socket) => {
    console.log("websocket is connected " + socket.id);

    //stores the userId in user object
    socket.on("join", (userId) => {
      users[userId] = socket.id;

      // sending online users to the every one
      io.emit("onlineUsers", Object.keys(users));
      console.log("Online Users:", users);
    });
    console.log("Online Users:", users);

    // { senderId, receiverId, message, messageId }
    socket.on("sendMessage", (message) => {
      const receiver = users[message?.receiverId];
      if (receiver) {
        io.to(receiver).emit("receiveMessage", message);

        //   deliver  logic it happens when the receiver in online

        const messageId = message?.messageId;
        const senderSocket = users[message?.senderId];

        if (senderSocket) {
          io.to(senderSocket).emit("messagesDelivered", { messageId });
        }
      }
    });

    // message deliver feature
    socket.on("messageDelivered", ({ senderId, messageId }) => {
      const senderSocket = users[senderId];

      if (senderSocket) {
        io.to(senderSocket).emit("messagesDelivered", {
          messageId,
        });
      }
    });

    // typing feature
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiver = users[receiverId];
      if (receiver) {
        io.to(receiver).emit("typing", { senderId });
      }
    });

    //  stop typing feature
    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiver = users[receiverId];
      if (receiver) {
        io.to(receiver).emit("stopTyping", { senderId });
      }
    });

    socket.on("seenMessage", ({ senderId, receiverId }) => {
      const senderSocket = users[senderId];

      if (senderSocket) {
        io.to(senderSocket).emit("messagesSeen", {
          // receiverId,
          senderId,
          receiverId,
        });
      }
    });

    socket.on("messagesSeenUpdate", ({ senderId, receiverId }) => {
      const senderSocket = users[senderId];

      if (senderSocket) {
        io.to(senderSocket).emit("messagesSeenUpdate", {
          senderId,

          receiverId,
        });
      }
    });

    // disconnect the users 
    socket.on("disconnect", () => {
      for (let id in users) {
        if (users[id] === socket.id) {
          delete users[id];
        }
      }

      console.log("user disconnect to the socket ");
      // updating the online users
      io.emit("onlineUsers", Object.keys(users));
    });

    // updating the online users after disconnecting

    // console.log("users disconnected ")
  });
};

// module.exports = initSocket;
