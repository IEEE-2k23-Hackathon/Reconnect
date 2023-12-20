import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LoggedInProvider from "./context/auth";
import ChatProvider from "./context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import ChatPage from "./Pages/ChatRoom/ChatPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <ChatProvider>
        <LoggedInProvider>
          <App />
          <ChakraProvider>
            <ChatPage />
          </ChakraProvider>
        </LoggedInProvider>
      </ChatProvider>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
