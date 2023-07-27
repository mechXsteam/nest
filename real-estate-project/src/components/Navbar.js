import {useContext, useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Axios from 'axios'
// Imported components for routing and building navigation bar

import Home from '../pages/Home'
import Listings from '../pages/Listings'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import NotificationModal from '../components/NotificationModal'
import Dashboard from "../pages/Dashboard";
import {ThemeProvider, createTheme} from '@mui/material/styles';

// MUI imports
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MapsHomeWorkSharpIcon from '@mui/icons-material/MapsHomeWorkSharp';
import {Context} from "../context";
import {useSnackbar} from "notistack";
import jwtDecode from "jwt-decode";


// Navbar component
function ResponsiveAppBar() {

    // Default nav bar configuration
    const [anchorElNav, setAnchorElNav] = useState('')
    const [anchorElUser, setAnchorElUser] = useState('')

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // mine logic starts from here...

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar(); // notification snackbar
    function logout(variant = 'success') {
        localStorage.removeItem("access_token");
        localStorage.removeItem('userDetails')
        enqueueSnackbar('Logged out successfully!', {variant});
        navigate('/listings')
    }

    // get user details from the localStorage, if details are present then show the avatar and logout button else, show
    // the sign-in button.
    const access_token = localStorage.getItem('access_token')
    const {user_id} = access_token ? jwtDecode(access_token) : "not defined"

    const [meetingDetails, setMeetingDetails] = useState({
        fixVisit: '',
        meetingDate: '',
        meetingTime: ''
    })
    useEffect(() => {
        access_token && Axios.get(`http://127.0.0.1:8000/api/vi/property_visit/${user_id}/`)
            .then(res => {
                const {fixVisit, property_visit_date} = res.data
                const meetingDate = new Date(property_visit_date).toDateString()
                const meetingTime = new Date(property_visit_date).toTimeString()
                setMeetingDetails({fixVisit: fixVisit, meetingDate: meetingDate, meetingTime: meetingTime})
            })
    }, [])
    console.log('meeting',meetingDetails)

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* The logo icon */}
                        <MapsHomeWorkSharpIcon
                            sx={{display: {xs: 'none', md: 'flex'}, mr: 1, color: 'springGreen'}}/>
                        <Link to="/" className={'no-link-style'}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'springGreen',
                                    textDecoration: 'none',
                                }}
                            >
                                NEST
                            </Typography>
                        </Link>

                        {/* The responsive menu bar */}
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            ><MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"><Link to={"/listings"}
                                                                         className={'menu-item'}>LISTINGS</Link></Typography>
                                </MenuItem>
                                {access_token && <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"><Link to={"/dashboard"}
                                                                         className={'menu-item'}>DASHBOARD</Link></Typography>
                                </MenuItem>}
                            </Menu>
                        </Box>

                        {/* The desktop navbar  */}
                        <Typography variant="h5"
                                    noWrap
                                    component="a"
                                    href=""
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'flex', md: 'none'},
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}>
                            <Link to={"/"} className={'no-link-style'}>NEST</Link>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link to={"/listings"} className={'no-link-style'}>LISTINGS</Link>
                            </Button>
                            {access_token && <Button
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                <Link to={"/dashboard"} className={'no-link-style'}>Dashboard</Link>
                            </Button>}
                        </Box>

                        {access_token ? <Box sx={{flexGrow: 0, display: 'flex'}}>

                            <Tooltip title={""}>

                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar
                                        src={'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg'}
                                        alt="Remy Sharp"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                            {meetingDetails.fixVisit && <NotificationModal day={meetingDetails.meetingDate} time={meetingDetails.meetingTime} sx={{mx: 2}}/>}
                        </Box> : <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            <Link to={"/sign-in"} className={'no-link-style'}>SIGN-IN</Link>
                        </Button>}
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/listings" element={<Listings/>}></Route>
                <Route path="/sign-in" element={<SignIn/>}></Route>
                <Route path="/sign-up" element={<SignUp/>}></Route>
                {/*<Route path="/dashboard" element={<Dashboard/>}></Route>*/}
                {access_token && <Route path="/dashboard" element={<Dashboard/>}></Route>}
            </Routes>
        </>

    );
}

export default ResponsiveAppBar;

