import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { LoggedState } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const HostWebinar = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isCounselor = currentUser.isCounselor;
  const Navigate = useNavigate();
  const [roomName, setRoomName] = useState([]);
  const [liveMeetingsData, setLiveMeetingData] = useState([]);
  const handleCreateLiveStream = () => {
    // Perform actions to create the live stream
    Navigate("/webinars/" + roomName);
    console.log("Creating live stream");
    setLiveMeetingData(
      window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomName
    );
    // console.log(liveMeetingsData);
  };

  useEffect(() => {
    // Fetch users based on the current user's addictType
    const fetchLiveMeetings = async () => {
      try {
        const response = await fetch(`/api/getLiveMeetings`);
        const data = await response.json();
        // console.log(data);
        // setLiveMeetingData(data.users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    if (currentUser) {
      fetchLiveMeetings();
    }
  }, []);
  const scheduleMeeting = () => {
    console.log("scheduled a meeting");
  };

  return (
    <Layout title={"Webinars | Reconnect"}>
      <Grid container spacing={1} sx={{ width: "100%", marginLeft: "-5vw" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid>
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
            {/* {isCounselor && (
            <Button
              variant="contained"
              color="primary"
              onClick={scheduleMeeting}
              style={{ margin: "5px" }}
            >
              Schedule Meeting
            </Button>
          )} */}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HostWebinar;
