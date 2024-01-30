import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'

import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Reconnect
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();



const Register = () => {

    const [isCounselor, setIsCounselor] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get('email') || !data.get('password') || !data.get('username')) {
            toast.error("Please Fill all the Feilds");
            return;
        }

        const register_ojt = {
            username: data.get('username'),
            phonenumber: JSON.parse(data.get('phonenumber')),
            email: data.get('email'),
            age: JSON.parse(data.get('age')),
            addictType: data.get('addictType'),
            gender: data.get('gender'),
            isCounselor,
            ...isCounselor && {
                CounselorLicenseNumber: JSON.parse(data.get('counselorLicenseNumber')),
                Specialization: data.get('specialization'),
                Experience: JSON.parse(data.get('experience')),
                WorkingIn: data.get('workingIn'),
                Portfolio: data.get('portfolio'),
            },
            PerDay: Number(data.get('perDay')),
            years: Number(data.get('years')),
            triedToGiveUp: Number(data.get('triedToGiveUp')),
            reason: data.get('reason'),
            password: data.get('password'),
        };

        console.log(register_ojt);


        try {
            const { data } = await axios.post("/api/register", register_ojt);
            console.log(data);
            if (data) {
                toast.success("Registered SuccessFully ..!")
            }
            setTimeout(() => {
                navigate("/login");
            }, 500);
        } catch (error) {
            toast.error("Registered Failed ...😂");
        }

    };

    return (
        <Layout title={"Register Page"}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={10} width={'70vw'}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="User Name"
                                        name="username"
                                        autoFocus

                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phonenumber"
                                        label="Phone Number"
                                        name="phonenumber"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        type='email'
                                        label="Email"
                                        name="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"

                                        fullWidth
                                        id="age"

                                        label="Age"
                                        name="age"
                                        autoFocus
                                    />

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="gender"

                                        label="Gender"
                                        name="gender"
                                        autoFocus
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    // style={{marginLeft:'100px'}}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        margin="normal"
                                        fullWidth
                                        id="addictType"
                                        label="AddictType"
                                        name="addictType"
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="Alcohol">Alcohol</option>
                                        <option value="Cigarettes">Cigarettes</option>
                                        <option value="Mobile">Mobile</option>
                                    </TextField>

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="perDay"
                                        label="Consumes Per Day"
                                        name="perDay"
                                        type="number"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="years"
                                        label="Years of Addiction"
                                        name="years"
                                        type="number"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="triedToGiveUp"
                                        label="Number of Times Tried to Give Up"
                                        name="triedToGiveUp"
                                        type="number"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="reason"
                                        label="Reason for Addiction"
                                        name="reason"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="avgMoney"
                                        label="Average Money Spent per Week on Addiction"
                                        name="avgMoney"
                                        type="number"
                                        autoFocus
                                    />

                                </Grid>

                                <Box
                                    
                                >
                                    <FormControlLabel
                                        control={<Checkbox checked={isCounselor} onChange={(e) => setIsCounselor(e.target.checked)} />}
                                        label="I am a Counselor"
                                    />
                                    {isCounselor && (
                                        <>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="counselorLicenseNumber"
                                                label="Counselor License Number"
                                                name="counselorLicenseNumber"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="specialization"
                                                label="Specialization"
                                                name="specialization"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="experience"
                                                label="Experience (Years)"
                                                name="experience"
                                                type="number"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="workingIn"
                                                label="Working in (Hospital, Clinic etc.)"
                                                name="workingIn"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                id="portfolio"
                                                label="Portfolio Link"
                                                name="portfolio"
                                                autoFocus
                                            />
                                        </>
                                    )}

                                </Box>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already Have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </Layout>

    )
}

export default Register
