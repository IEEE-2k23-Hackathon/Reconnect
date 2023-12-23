import React, { useEffect, useState } from 'react';
import { Box, FormControl, Input, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import ScrollChat from './ScrollChat';
import io from 'socket.io-client';
import { LoggedState } from '../../../context/auth';
const ENDPOINT = 'http://localhost:5000';

var socket, selectedChatCompare;

const SingleChat = () => {
  const { isLoggedIn } = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

  const selectedChat = {
    _id: '65869e2c6ebed2e4b1dc4082',
  };

  const [SocketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(`/chatroom/getMsg/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', CurrentUser);
    socket.on('connected', () => setSocketConnected(true));


    return () => {
      socket.disconnect();
    };
  }, [CurrentUser]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && selectedChat._id !== selectedChatCompare?._id) {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }

    return () => {
      isMounted = false;
    };
  }, [selectedChat]);

  useEffect(() => {
    socket.on('Msg recieved', (newMessageRecieved) => {
      if (selectedChatCompare && selectedChatCompare._id === newMessageRecieved.chat._id) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, [messages, selectedChatCompare]);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      try {
        const { data } = await axios.post('/chatroom/sendMsg', {
          content: newMessage,
          chatID: selectedChat._id,
        });

        setNewMessage('');
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <Box height={'110%'} width={'90%'}>
    
      {selectedChat ? (
        <>
          <Typography
            variant="h5"
            mb={3}
            mx={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent="space-between"
          >
            {!selectedChat.GroupChat ? (
              <Box display="flex" justifyContent="space-between">
                {CurrentUser.addictType} Community
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-between">
                {selectedChat.chatName.toUpperCase()}
              </Box>
            )}
          </Typography>

          <Box
            id="chatContainer" // Add an ID to the chat container
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={2} // Adjusted padding
            bgcolor="#E8E8E8"
            width="100%"
            height="auto"
            borderRadius="lg"
          >
            {loading ? (
              <CircularProgress size={20} thickness={4} />
            ) : (
              <div className="messages" style={{ overflowY: 'auto', padding: '10px' }}>
                <ScrollChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={2}> {/* Adjusted margin top */}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                sx={{border:"1px solid black",padding:"2vh"}}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Typography variant="h5" fontSize="3xl" pb={3} fontFamily="Work sans">
            Click On Chat to Communicate
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
