import React, { useState, useEffect } from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import ChatProvider, { useChatState } from "../../context/ChatProvider";

const ChatRoom = () => {
  const { currentUser, chats, setChats } = useChatState();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    const updatedChats = [...chats, { user: currentUser, message: newMessage }];
    setChats(updatedChats);
    setNewMessage("");
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chats]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      pt={6}
      pb={8}
      w="100%"
      h="70vh"
      backgroundColor="white"
      borderRadius="lg"
      padding={6}
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box
        id="chat-container"
        overflowY="auto"
        flex="1"
        borderRadius="lg"
        p={4}
        mb={4}
        backgroundColor="#f7f7f7"
        border="1px solid #ddd"
        boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
        fontSize="sm"
      >
        {chats.map((chat, index) => (
          <div
            key={index}
            style={{ marginBottom: "12px", color: "#333", fontSize: "inherit" }}
          >
            <strong>{chat.user}:</strong> {chat.message}
          </div>
        ))}
      </Box>
      <Box display="flex">
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          borderRadius="lg"
          border="1px solid #ddd"
          padding={4}
          marginRight={4}
          fontSize="sm"
        />
        <Button
          backgroundColor="#007BFF"
          color="white"
          _hover={{ backgroundColor: "#0056b3" }}
          onClick={handleSendMessage}
          borderRadius="lg"
          paddingX={8}
          paddingY={4}
          fontSize="sm"
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

const ChatPage = () => {
  return (
    <ChatProvider>
      <div
        style={{
          width: "100%",
          backgroundColor: "#007BFF",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ChatRoom />
      </div>
    </ChatProvider>
  );
};

export default ChatPage;
