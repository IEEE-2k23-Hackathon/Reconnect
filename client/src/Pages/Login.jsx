import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { LoggedState } from '../context/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from "axios"

const defaultTheme = createTheme();

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

const Login = () => {

  const navigate = useNavigate();
  const {CurrentUser,setUser,setisLoggedIn} = LoggedState();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(CurrentUser);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error(
        "Please Fill all the Feilds",
        {
          duration: 3000,
        });
      return;
    }
    
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if(data.User)
        toast.success('Logged in SuccessFully');
      else{
        toast.error("User Not Found");
        return ;
      }
      console.log(data.User);
      setisLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      },500);

    } catch (error) {
      toast.error("Error Occured . Check UserName and PassWord ")
    }
  };
  return (
    <Layout title={"Login Page"}>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login Here
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account ? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  )
}

export default Login