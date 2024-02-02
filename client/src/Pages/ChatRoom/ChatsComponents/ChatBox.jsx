import React from 'react';
import Box from '@mui/material/Box';
import SingleChat from './SingleChat';
import Layout from '../../../components/Layout/Layout';
import { Grid } from '@mui/material';
import Sidebar from '../../../components/Sidebar';
const ChatBox = () => {

  return (
      <Grid container spacing={1} sx={{ width: '100%', marginLeft: "-5vw" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} md={9} sx={{ width: '100%' }}>
          <Grid container spacing={5} height="100%">

          <Box
            padding={2}
            marginRight={10}
            marginTop={2}
            marginLeft={5}
            bgcolor="white"
            width={'70vw'}
            borderRadius="lg"
            border="1px solid purple"
            height={'100%'}
          >
            <SingleChat />
          </Box>
          </Grid>
          </Grid>

        </Grid>
       
        );
};

        export default ChatBox;
