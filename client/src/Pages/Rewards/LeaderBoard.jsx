import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LoggedState } from '../../context/auth';
import Sidebar from '../../components/Sidebar';

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    const isLoggedIn = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

    useEffect(() => {
        // Fetch users based on the current user's addictType
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users/${currentUser?.addictType}`);
                const data = await response.json();
                setLeaderboardData(data.users);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        if (currentUser?.addictType) {
            fetchUsers();
        }
    }, []);

    // Sort users based on TaskScore in descending order
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.TaskScore - a.TaskScore);

    return (
        <Grid container spacing={2} sx={{ width: '100%', margin: '0 auto' }}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
                <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9} marginLeft={'-5vw'}>
                <div>
                    <Typography variant="h4" gutterBottom>
                        Leaderboard
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#Rank</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Task Score</TableCell>
                                    <TableCell>Joined at</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedLeaderboard.map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.TaskScore}</TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>
        </Grid>
    );
};

export default LeaderBoard;
