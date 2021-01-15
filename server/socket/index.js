const jwt = require("jsonwebtoken");
const { Message, User } = require("../db/models");

let onlineUsers = new Set();

const socketio = (io) => {
  // middleware
  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    // online status
    socket.on("user-online", () => {
      console.log("new user", socket.decoded);
      socket.userId = socket.decoded.id;
      onlineUsers.add(socket.decoded.id);
      io.emit("user-online", [...onlineUsers]);
    });

    socket.on("new-message", async (newMessage) => {
      // create message
      const message = await Message.create({
        conversationId: newMessage.conversationId,
        message: newMessage.text,
        createdBy: socket.decoded.id,
      });

      // get message with userInfo
      const result = await Message.findOne({
        where: { id: message.id },
        include: [{ model: User, as: "userInfo" }],
      });

      console.log(result);

      // return
      io.emit("new-message", result);
    });

    // disconnect
    socket.on("disconnect", () => {
      // remove user from onlineUsers
      onlineUsers.delete(socket.userId);
      io.emit("user-online", [...onlineUsers]);
      console.log("socket disconnected", socket.userId);
    });
  });
};

module.exports = socketio;
