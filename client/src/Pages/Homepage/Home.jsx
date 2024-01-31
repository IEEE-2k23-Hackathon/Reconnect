// Home.js
import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { LoggedState } from '../../context/auth';
import { Box, Button, Checkbox, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import Sidebar from '../../components/Sidebar';
import StreakProgress from './StreakProgress';
import axios from 'axios';

const Home = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

  const dailyTasks = currentUser.DailyTasks.tasks;
  console.log(dailyTasks);

  //console.log(currentUser);

  // useEffect(()=>{
  //   const call = async () => {
  //     if(onetime) {
  //       const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
  //       console.log(data);
  //       setOneTime(0);
  //     }
  //   }
  //   call();
  // },[currentUser])

  // const handlecall = async () => {
  //       const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
  //       console.log(data);
  // }

  const handleCheckboxChange = (event, index) => {
    // Handle checkbox change logic here
  };



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
            <Grid item xs={12}>
              <StreakProgress currentUser={currentUser} />
            </Grid>
            {/* Display Daily Tasks */}
            <Grid item xs={12}>
              <Typography
                style={{
                  fontSize:'2rem',
                  fontWeight:900,
                  fontFamily:IDBIndex
                }}
              >
                Today Tasks Set by Using AI based on Previous inputs : 
              </Typography>
              <div style={{ marginTop: '20px' }}>
                <List>
                  {dailyTasks.map((task, index) => (
                    <ListItem key={task._id} disableGutters style={{ marginBottom: '10px' }}>
                      <ListItemText
                        primary={<Typography variant="h6">{task.title}</Typography>}
                        secondary={<Typography variant="body1">{task.description}</Typography>}
                      />
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleCheckboxChange(event, index)}
                        sx={{ mr: '15vw' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              {/* Completed the Day button */}
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                //onClick={}
                sx={{ marginTop: '20px' }}
              >
                Completed the Day
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
