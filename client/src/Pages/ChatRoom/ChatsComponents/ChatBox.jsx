import React from 'react';
import Box from '@mui/material/Box';
import SingleChat from './SingleChat';
const ChatBox = () => {
  
  return (
    <Box
      display={{ xs: 'flex' , md: 'flex' }}
      alignItems="center"
      flexDirection="column"
      padding={3}
      marginRight={10}
      marginLeft={5}
      bgcolor="white"
      width={{ xs: '100%', md: '68%' }}
      borderRadius="lg"
      border="1px solid"
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
