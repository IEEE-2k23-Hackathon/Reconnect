// Home.js
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { LoggedState } from '../../context/auth';
import { Box, Grid, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import Sidebar from '../../components/Sidebar';
import StreakProgress from './StreakProgress';
import axios from 'axios';

const Home = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

 const {onetime,setOneTime} = LoggedState();

  useEffect(()=>{
    const call = async () => {
      if(onetime) {
        const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
        console.log(data);
        setOneTime(0);
      }
    }
    call();
  },[currentUser])

  const handlecall = async () => {
        const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
        console.log(data);
  }

  console.log(currentUser.TaskScore);

  const LevelsCards = [
    { title: 'Level1', description: 'Description for Level 1', image: 'Lvl1.png' },
    { title: 'Level2', description: 'Description for Level 2', image: 'Lvl2.png' },
    { title: 'Level3', description: 'Description for Level 3', image: 'Lvl3.png' },
    // Add more data as needed
  ];

  const calculateUnlockedLevels = () => {
    const taskScore = currentUser.TaskScore || 0;
    let unlockedLevels = [];

    if (taskScore >= 0) {
      unlockedLevels.push(1);
    }

    if (taskScore >= 5) {
      unlockedLevels.push(2);
    }

    if (taskScore >= 10) {
      unlockedLevels.push(3);
    }

    return unlockedLevels;
  };

  const unlockedLevels = calculateUnlockedLevels();


  return (
    <Layout title={'DashBoard | Reconnect'}>
      <Grid container spacing={1} sx={{ width: '100%', marginLeft: "-5vw" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} >
              <StreakProgress currentUser={currentUser} />
            </Grid>
            {LevelsCards.map((item, index) => (
              (
                unlockedLevels.includes(index + 1) ?
                  <Grid item xs={12} sm={4} key={index}>
                    <TaskCard {...item} locked={0} />
                  </Grid>
                  :
                  <Grid item xs={12} sm={4} key={index}>
                    <TaskCard {...item} locked={1} />
                  </Grid>
              )
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
