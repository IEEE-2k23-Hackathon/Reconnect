import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { LoggedState } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const HostWebinar = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isCounselor = currentUser.isCounselor;
  const Navigate = useNavigate();
  const handleCreateLiveStream = () => {
    // Perform actions to create the live stream
    Navigate("/webinars/abcd");
    console.log("Creating live stream");
  };

  const [liveMeetingsData, setliveMeetingsData] = useState([]);

  const scheduleMeeting = () => {
    useEffect(() => {
      // Fetch users based on the current user's addictType
      const fetchLiveMeetings = async () => {
        try {
          const response = await fetch(`/api/`);
          const data = await response.json();
          setLeaderboardData(data.users);
        } catch (error) {
          console.error("Error fetching users:", error.message);
        }
      };

      if (currentUser) {
        fetchLiveMeetings();
      }
    }, []);

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
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HostWebinar;
