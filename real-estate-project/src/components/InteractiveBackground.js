// I have used spline to create the interactive background
import Spline from '@splinetool/react-spline';
import {useEffect, useState} from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

// This is a subcomponent which handles the logic of title, subtitle etc...
function About() {
    return <Box>
        <Typography className={'landing-overlay-title'} variant={'h4'}>Welcome to <span
            className={'title'}>NEST</span> - Your Gateway to Exceptional
            Properties!</Typography>
        <Typography className={'landing-overlay-subtitle'} variant={'subtitle1'}>
            Start your real estate adventure with us today and unlock a world of endless  possibilities.
            Experience the joy of finding your dream property, and let us be your trusted partner in
            turning your aspirations into reality.
            <br/>
            <Button size="large" variant={"contained"} color={"inherit"} sx={{my: 5}}><SearchIcon/>
                <Link className={'no-link-style'} to={'/listings'}>SEARCH LISTINGS</Link>
            </Button>
        </Typography>
    </Box>
}

// main component
export default function InteractiveBackground() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulating the background loading delay
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(delay);
    }, []);
    // for two seconds loading simulation will be shown
    return (
        <div>
            {isLoading ? (
                <LinearProgress color={'success'}/>
            ) : (
                <Box className={'container-overlay'}>
                    <About/>
                    <Spline scene="https://prod.spline.design/VRht5GA3qpB9icZu/scene.splinecode"
                            style={{height: '100vh'}}/>
                </Box>
            )}
        </div>
    )
}

