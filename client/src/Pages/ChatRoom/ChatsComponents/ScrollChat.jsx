import React, { useRef, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../../config/ChatLogic';
import { LoggedState } from '../../../context/auth';
import toast, { Toaster } from 'react-hot-toast';

const ScrollChat = ({ messages }) => {
  const { isLoggedIn } = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
  const user = CurrentUser;

  const [showReportButton, setShowReportButton] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowReportButton(true);
  };

  const handleReportButtonClick = () => {
    toast.error('This Particular User Has been Reported.');
  }

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    
    <div
      ref={chatContainerRef}
      style={{ maxHeight: '60vh', overflowY: 'auto' }}
    >
      <Toaster />
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
                <Tooltip title={m.sender.AgencyName} placement="bottom-start" arrow>
                  <Avatar
                    style={{
                      marginTop: '7px',
                      marginRight: '1px',
                      cursor: 'pointer',
                    }}
                    size="small"
                    onContextMenu={handleContextMenu}
                  />
                  {showReportButton && (
                    <button onClick={handleReportButtonClick} style={{ marginBottom: '5px' , padding:'0.5px'  }}>Report</button>
                  )}
                </Tooltip>
              )}
            <span
              style={{
                backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                  }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollChat;
