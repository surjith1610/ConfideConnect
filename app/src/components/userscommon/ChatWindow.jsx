import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';


const socket = io('http://localhost:3002'); // server URL

const ChatWindow = ({ userId, name, onClose }) => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [minimized, setMinimized] = useState(false);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container whenever messages update
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('join', userId); // Join room with userId

    // Listen for 'initialMessages' event from server
    socket.on('initialMessages', (storedMessages) => {
      setMessages(storedMessages);
    });

    // Listen for 'message' event from server
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for 'userCount' event from server
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    // Clean up socket event listeners on component unmount
    return () => {
      socket.off('message');
      socket.off('userCount');
    };
  }, [userId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', {
        sender: userId,
        message: message.trim(),
        username: name,
      });
      setMessage('');
    }
  };

  const handleToggleMinimized = () => {
    setMinimized(!minimized);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 25,
        right: 30,
        width: 300,
        height: minimized ? 50 : 400,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
      }}
      >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 1,
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Community</Typography>
        </Box>
        <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#00FF00',
              marginLeft: 5,
              marginRight: -10,
            }}
          />
        <Typography>{userCount} online</Typography>
        <IconButton
            onClick={handleToggleMinimized}
            size="small"
          >
            {minimized ? <ExpandLessIcon /> : <ExpandMoreIcon />} 
          </IconButton>
      </Box>
      {!minimized &&
        <>
          <Box
            ref={messagesContainerRef}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: 2,
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: msg.sender === userId ? 'grey.600' : 'divider',
                  color: msg.sender === userId ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 1,
                  padding: 1,
                  marginBottom: 1,
                  alignSelf: msg.sender === userId ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                }}
              >
                {msg.sender !== userId && (
                  <Typography variant="caption" sx={{ marginBottom: 0.5 }}>
                    {msg.username}
                  </Typography>
                )}
                <Typography>{msg.message}</Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 1,
              backgroundColor: 'background.paper',
            }}
            >
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                backgroundColor: 'background.default',
                borderRadius: 1,
                marginRight: 1,
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  handleSendMessage();
                  e.preventDefault();
                }
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      }
    </Box>
  );
};

export default ChatWindow;