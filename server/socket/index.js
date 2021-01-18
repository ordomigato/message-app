const jwt = require("jsonwebtoken");
const { Message, User, User_Conversation } = require("../db/models");

const onlineUsers = {};

const socketio = (io) => {
  // middleware
  io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
      const token = socket.handshake.query.token.replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
        if (err) {
          console.log(err);
          return next(new Error("Authentication error"));
        }
        socket.decoded = decoded;
        next();
      });
    } else {
      console.log("error");
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    // online status
    socket.on("user-online", () => {
      console.log("new user", socket.decoded);
      socket.userId = socket.decoded.id;
      onlineUsers[socket.userId] = socket.id;
      io.emit(
        "user-online",
        Object.keys(onlineUsers).map((el) => parseInt(el))
      );
    });

    socket.on("new-message", async (newMessage) => {
      // grab all participants of conversation
      const participants = await User_Conversation.findAll({
        where: {
          conversationId: newMessage.conversationId,
        },
      });

      // check if sending user is a participant
      const isParticipant = participants.some(
        (p) => p.userId === socket.decoded.id
      );

      // return if not participant
      if (!isParticipant) return;

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

      // find all online users who are participants

      // return
      participants.forEach((p) => {
        io.to(onlineUsers[p.userId]).emit("new-message", result);
      });
    });

    // disconnect
    socket.on("disconnect", () => {
      // remove user from onlineUsers
      delete onlineUsers[socket.userId];
      io.emit(
        "user-online",
        Object.keys(onlineUsers).map((el) => parseInt(el))
      );
      console.log("socket disconnected", socket.userId);
    });
  });
};

module.exports = socketio;
