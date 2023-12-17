import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, FormControlLabel, List, ListItem, ListItemText, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const DailyTask = () => {
  const { level, addictType } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);
  const [addictTask, setAddictTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/addictTasks?addictType=${addictType}`);
        const data = await response.json();
        setAddictTask(data.addictTask[level].tasks);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [level, addictType]);

  const handleDayToggle = (day) => {
    setSelectedDay(day);
  };

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
                  <ToggleButton key={day} value={day}>
                    {`Day ${day}`}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Paper>

            {/* Display content for the selected day */}
            <div style={{ marginTop: '20px' }}>
              <List>
                {addictTask.map((task) => (
                  <ListItem key={task._id} disableGutters style={{ marginBottom: '10px' }}>
                    <ListItemText
                      primary={<Typography variant="h6">{task.title}</Typography>}
                      secondary={<Typography variant="body1">{task.description}</Typography>}
                    />
                    <Checkbox color="primary" sx={{mr:'15vw'}} />
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
