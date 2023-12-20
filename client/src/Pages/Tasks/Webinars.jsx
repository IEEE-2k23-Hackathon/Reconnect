import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Sidebar';
import { LoggedState } from '../../context/auth';

const HostWebinar = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;
  const isCounselor = currentUser?.role === 'counselor';

  const handleCreateLiveStream = () => {
    // Perform actions to create the live stream
    console.log('Creating live stream');
  };

  return (
    <Layout title={'Webinars | Reconnect'}>
      <Grid container spacing={1} sx={{ width: '100%', marginLeft: '-5vw' }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HostWebinar;