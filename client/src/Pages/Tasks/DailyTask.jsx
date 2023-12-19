import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel, List, ListItem, ListItemText, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import toast from 'react-hot-toast';
import { LoggedState } from '../../context/auth';

const DailyTask = () => {

  const { isLoggedIn } = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
  const DailyTaskDone = currentUser?.DailyTaskDone || 0;

  const { level, addictType } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);
  const [addictTask, setAddictTask] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/addictTasks?addictType=${addictType}`);
        const data = await response.json();
        setAddictTask(data.addictTask[level].tasks);

        // Check DailyTaskScore based on the provided level
        const levelScore = currentUser?.DailyTaskDone?.[level];
        if (levelScore !== undefined) {
          console.log(`Level ${level} matched. Score: ${levelScore}`);

          // Calculate the unlocked days based on levelScore
          const unlockedDays = Math.floor(levelScore / 3) + 1;
          console.log(`Unlocked Days: ${unlockedDays}`);

          // Set the initial selectedDay to the first unlocked day
          setSelectedDay(Math.min(unlockedDays, 5));
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [level, addictType, currentUser]);


  const handleDayToggle = (day) => {
    setSelectedDay(day);
    showStartDayNotification();
  };

  const showStartDayNotification = () => {
    alert(`Ready to start Day ${selectedDay}? Click OK to begin!`);
    setTimeout(() => {
      toast.success(`Day ${selectedDay} has started! Get ready for your tasks.`);
      startDayTimer();
    }, 1000); // Delay to allow the alert to complete before showing the toast
  };

  const startDayTimer = () => {
    const endTime = Date.now() + 12 * 60 * 60 * 1000; // 12 hours in milliseconds

    const updateCountdown = () => {
      const remainingTime = endTime - Date.now();
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setCountdown(`${hours}:${minutes}:${seconds}`);

      if (remainingTime <= 0) {
        // Your code to handle the end of the day
        toast.success(`Day ${selectedDay} has ended.`);
        // You can add additional logic or trigger events here
        setCountdown(null); // Reset countdown after 12 hours
      }
    };

    // Initial update
    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    const unlockedDays = Math.min(Math.floor((currentUser?.DailyTaskDone?.[level] || 0) / 3) + 1, selectedDay);
    
   
    
    

    // Cleanup interval on component unmount or after 12 hours
    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 12 * 60 * 60 * 1000);
  };

  const unlockedDays = Math.min(Math.floor((currentUser?.DailyTaskDone?.[level] || 0) / 3) + 1, selectedDay);

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Daily Tasks</h1>
        <h2>{`${level} - ${addictType}`}</h2>

        {addictTask && (
          <>
            {/* Toggle buttons for each day */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>

              <ToggleButtonGroup
                color="primary"
                value={selectedDay}
                exclusive
                onChange={(event, newDay) => handleDayToggle(newDay)}
              >
                {[1, 2, 3, 4, 5].map((day) => (
                  <ToggleButton
                    key={day}
                    value={day}
                    disabled={day > unlockedDays}
                    sx={{
                      backgroundColor: day > unlockedDays ? '#EF4040' : '#65B741',
                      color: day > unlockedDays ? 'black' : 'white' ,
                      ":hover":{
                        cursor:day > unlockedDays ? "not-allowed"  : "pointer" ,
                      }
                    }}
                  >
                    {`Day ${day}`}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Paper>

            {/* Countdown timer */}
            {countdown && (
              <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Time Remaining: {countdown}
              </Typography>
            )}

            {/* Display content for the selected day */}
            <div style={{ marginTop: '20px' }}>
              <List>
                {addictTask.map((task) => (
                  <ListItem key={task._id} disableGutters style={{ marginBottom: '10px' }}>
                    <ListItemText
                      primary={<Typography variant="h6">{task.title}</Typography>}
                      secondary={<Typography variant="body1">{task.description}</Typography>}
                    />
                    <Checkbox color="primary" sx={{ mr: '15vw' }} />
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyTask;
