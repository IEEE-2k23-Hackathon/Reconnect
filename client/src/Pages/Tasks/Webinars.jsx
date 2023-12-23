import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { LoggedState } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HostWebinar = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isCounselor = currentUser.isCounselor;
  const [roomName, setRoomName] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [liveMeetingsData, setLiveMeetingData] = useState([]);
  const Navigate = useNavigate();

  // create live stream
  const handleCreateLiveStream = async () => {
    // Perform actions to create the live stream
    const currentTime = new Date();
    const newTime = currentTime.toISOString();
    try {
      const response = await fetch("http://localhost:5000/api/addLiveMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          liveUrl:
            "http://localhost:3000/webinars/" + { roomName } + "?roomID=abcde",
          time: newTime,
        }),
      });
      console.log("scheduled a meeting");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }

    Navigate("/webinars/" + roomName);
    console.log("Creating live stream");
  };

  // fetch live meetings
  useEffect(() => {
    // Fetch users based on the current user's addictType
    const fetchLiveMeetings = async () => {
      try {
        const response = await fetch(`/api/getLiveMeetings`);
        const data = await response.json();
        // console.log(data);
        setLiveMeetingData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    if (currentUser) {
      fetchLiveMeetings();
    }
  }, []);

  // schedule meetings
  const scheduleMeeting = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/scheduleMeeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: roomName,
            time: time,
            date: date,
          }),
        }
      );
      console.log("scheduled a meeting");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  // displaying scheduled meetings
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  // getScheduledMeetings function
  const getScheduledMeetings = async (roomName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getScheduledMeetings?roomName=${roomName}`
      );
      const data = await response.json();
      console.log("====================================");
      console.log(data.existingMeeting);
      console.log("====================================");
      setScheduledMeetings(data.existingMeeting);
    } catch (error) {
      console.error("Error fetching scheduled meetings:", error.message);
    }
  };

  // Fetch scheduled meetings on component mount
  useEffect(() => {
    if (roomName) {
      getScheduledMeetings(roomName);
    }
  }, [roomName]);

  return (
    <Layout title={"Webinars | Reconnect"}>
      <Grid container spacing={1} sx={{ width: "100%", marginLeft: "-5vw" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid>
          {isCounselor && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="roomName"
              label="roomName"
              type="roomName"
              id="roomName"
              onChange={(e) => setRoomName(e.target.value)}
            />
          )}
          <Grid item xs={12} md={9}>
            {isCounselor && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateLiveStream}
                style={{ margin: "5px" }}
              >
                Host Meeting
              </Button>
            )}

            {/* scheduleMeetings */}
            {isCounselor && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="roomName"
                label="roomName"
                type="roomName"
                id="roomName"
                onChange={(e) => setRoomName(e.target.value)}
              />
            )}
            {isCounselor && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="time"
                label="Time"
                type="time"
                id="time"
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {isCounselor && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="date"
                label="Date"
                type="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
              />
            )}
            {isCounselor && (
              <Button
                variant="contained"
                color="primary"
                onClick={scheduleMeeting}
                style={{ margin: "5px" }}
              >
                Schedule Meeting
              </Button>
            )}
            {scheduledMeetings.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduledMeetings.map((data) => (
                      <TableRow key={data._id}>
                        <TableCell>{data.date}</TableCell>
                        <TableCell>{data.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HostWebinar;
