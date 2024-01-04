const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const twilio = require("twilio");

const PORT = process.env.PORT || 5002;
const app = express();
const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];

let rooms = [];

app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    //send response that room exists
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else {
      return res.send({ roomExists: true, full: false });
    }
  } else {
    // send response that room does not exists
    return res.send({ roomExists: false });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on(`create-new-room`, (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    initializeCoonectionHandler(data, socket);
  });
});

//socket.io handlers

const createNewRoomHandler = (data, socket) => {
  console.log("host is creating new room");
  console.log(data);
  const { identity } = data;

  const roomId = uuidv4();
  //create new user
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };

  //push that usr to connectedUsers

  connectedUsers = [...connectedUsers, newUser];
  //create new room
  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };
  //join socket.io room
  socket.join(roomId);

  rooms = [...rooms, newRoom];
  //emit to that client which created that room Id
  socket.emit("room-id", { roomId });

  //emit an event to all users connected
  // to that room about new users which are right in this room
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
  };

  //join room as user which just is trying to join room passing room id
  const room = rooms.find((room) => room.id == roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

  //join socket.io room
  socket.join(roomId);
  //add new user to connected users array
  connectedUsers = [...connectedUsers, newUser];

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
  //find if user has been registored - if yes remove him from room and connected user array
  const user = connectedUsers.find((user) => user.socketId === socket.id);
  if (user) {
    //remove user from room in server
    const room = rooms.find((room) => room.id === user.roomId);

    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );

    //leave socket io room
    socket.leave(user.roomId);

    //emit an event to reset of the users which left in the room new connectedUsers in room
    //send message to the remaining users of the chat room
    // io.to(user.roomId).emit("room-update", {
    //   connectedUsers: room.connectedArgs(),
    // });

    io.to(user.roomId).emit("room-update", {
      connectedUsers: room.connectedUsers,
    });

    //close the room if amout of users which will stay in room will be 0
    if (!room.connectedUsers.length) closeRoom(room.id);
  }
};

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-signal", signalingData);
};

//information from clients whichare already in room that They have preapre for incoming connection
const initializeCoonectionHandler = (data, socket) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-init", initData);
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
