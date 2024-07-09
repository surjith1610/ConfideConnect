import { Server } from 'socket.io';
import ChatMessage from './models/chatmessage.js';


const connectedUsers = new Map();

const initializeChatServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'join' event from the client
    socket.on('join', async(userId) => {
      console.log(`User ${userId} joined`);
      connectedUsers.set(socket.id, userId);
      socket.join(userId); // Join a room with the userId

      // Fetch the most recent 5 messages from the database in the correct order
      const storedMessages = await ChatMessage.find().sort({ timestamp: -1 }).limit(50).exec();
      console.log('storedMessages: ',storedMessages);

      // Reverse the array to get the messages in the correct order
      const reversedMessages = storedMessages.reverse();
      console.log('reversedMessages: ',reversedMessages);

      // Send the stored messages to the client
      socket.emit('initialMessages', reversedMessages);

      // Broadcast the updated user count
      io.emit('userCount', connectedUsers.size);
    });

    // Listen for the 'message' event from the client
    socket.on('message', async(data) => {
      const { sender, message, username } = data;

      // Save the message to the database
      const newMessage = new ChatMessage({ sender, message, username });
      await newMessage.save();

      io.emit('message', { sender, message, username }); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      connectedUsers.delete(socket.id);

      // Broadcast the updated user count
      io.emit('userCount', connectedUsers.size);
    });

  });
};

export default initializeChatServer;