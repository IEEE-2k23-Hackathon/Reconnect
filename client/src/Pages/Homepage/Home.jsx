// Home.js
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { LoggedState } from '../../context/auth';
import { Box, Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import Sidebar from '../../components/Sidebar';
import StreakProgress from './StreakProgress';

const Home = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

  const LevelsCards = [
    { title: 'Level1', description: 'Description for Level 1', image: '/path/to/image1.jpg', days: 5 },
    { title: 'Level2', description: 'Description for Level 2', image: '/path/to/image2.jpg', days: 8 },
    { title: 'Level3', description: 'Description for Level 3', image: '/path/to/image3.jpg', days: 12 },
    // Add more data as needed
  ];

  const streakDays = 51; // Replace with actual streak information
  const daysSkipped = 10; // Replace with actual days skipped information
  const remainingDays = 0; // Replace with actual remaining days information

  return (
    <Layout title={'DashBoard | Reconnect'}>
      <Typography>
        {currentUser ? currentUser.username : "Zero"}
      </Typography>
      <Grid container spacing={1} sx={{ width:' 100%' , marginLeft:"-5vw" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12}>
              <StreakProgress streakDays={streakDays} daysSkipped={daysSkipped} remainingDays={remainingDays} />
            </Grid>
            {LevelsCards.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <TaskCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
