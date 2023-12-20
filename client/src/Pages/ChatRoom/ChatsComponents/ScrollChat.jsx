import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/ChatLogic';
import { LoggedState } from '../../../context/auth';

const ScrollChat = ({ messages }) => {
  const { isLoggedIn } = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
  const user = CurrentUser;

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.AgencyName} placement="bottom-start" arrow>
                <Avatar
                  style={{ marginTop: '7px', marginRight: '1px' }}
                  size="small"
                  alt={m.sender.AgencyName}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
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
    </ScrollableFeed>
  );
};

export default ScrollChat;
