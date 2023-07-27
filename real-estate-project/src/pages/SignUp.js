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
import {useState} from "react";

import {useSnackbar} from 'notistack';
import Axios from "axios";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

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

export default function SignUp() {
    const {enqueueSnackbar} = useSnackbar(); // notification snack bar
    const navigate = useNavigate()
    const [signUpFormData, setSignUpFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
    });

    function handleChangeSignUp(event) {
        event.preventDefault();
        const {name, value} = event.target;
        setSignUpFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    const handleSubmit = (event, variant = 'success') => {
        event.preventDefault();
        console.log(signUpFormData)
        const {username, email, password1, password2} = signUpFormData
        Axios.post('http://127.0.0.1:8000/api/vi/user/', {
            username: username,
            email: email,
            password: password1,
            re_password: password2,
        }).then(response => {
            navigate('/sign-in')
            console.log('User created successfully:', response.data);
        })
            .catch(error => {
                console.log('Error:', error.response);
            });
        enqueueSnackbar('Account created successfully!', {variant});
        navigate('/listings')
    };

    return (
        <ThemeProvider theme={darkTheme}>
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
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                color={'success'}
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={handleChangeSignUp}
                                value={signUpFormData.username}
                            />
                            <TextField
                                margin="normal"
                                color={'success'}
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                id="email"
                                autoComplete="email"
                                onChange={handleChangeSignUp}
                                value={signUpFormData.email}
                            />
                            <TextField
                                margin="normal"
                                color={'success'}
                                required
                                fullWidth
                                name="password1"
                                label="Password"
                                type="password"
                                id="password1"
                                autoComplete="password"
                                onChange={handleChangeSignUp}
                                value={signUpFormData.password1}
                            />
                            <TextField
                                margin="normal"
                                color={'success'}
                                required
                                fullWidth
                                name="password2"
                                label="Confirm password"
                                type="password"
                                id="password2"
                                autoComplete="confirm-password"
                                onChange={handleChangeSignUp}
                                value={signUpFormData.password2}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                color={'success'}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={() => {
                                        navigate('/sign-in')
                                    }} style={{cursor: "pointer"}} variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}





