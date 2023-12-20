import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const isLoggedIn = true;
      return isLoggedIn;
    };

    const isLoggedIn = checkIsLoggedIn();

    if (isLoggedIn) {
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      setCurrentUser(storedUserInfo);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
