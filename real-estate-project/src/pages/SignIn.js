import * as React from 'react';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {Context} from "../context";
import {useContext, useState} from "react";

import {useSnackbar} from 'notistack';
import Axios from "axios";
import jwtDecode from "jwt-decode";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {'findyourNEST '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const [signInFormData, setSignInFormData] = useState({
        username: "",
        password: "",
    });

    function handleChangeSignIn(event) {
        event.preventDefault();
        const {name, value} = event.target;
        setSignInFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    const {username, password} = signInFormData


    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();


    const handleSubmit = (event, variant = 'success') => {
        event.preventDefault();
        Axios.post('http://127.0.0.1:8000/api/token/', {
            username: username,
            password: password,
        }).then(response => {
            console.log('sign in details',signInFormData)
            console.log("sign response",response)
            const {access} = response.data
            localStorage.setItem('access_token', access)

            // decode the user details and store it in the localStorage
            const userDetails = jwtDecode(access)
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
        })
            .catch(error => {
                console.log('Error: bkc', error.response);
            });
        enqueueSnackbar('Logged In successfully!', {variant});
        navigate('/listings')
    }
    return (

        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
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
                    <Avatar sx={{m: 1, bgcolor: '#1bc081'}}>
                        <LockOutlinedIcon color={'white'}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            color={'success'}
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={handleChangeSignIn}
                            value={signInFormData.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            color={'success'}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChangeSignIn}
                            value={signInFormData.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            color={'success'}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link onClick={() => {
                                    navigate('/sign-up')
                                }} style={{cursor: "pointer"}} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{mt: 5}}/>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}