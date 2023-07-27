import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {ContextProvider} from "./context";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {deepOrange} from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        divider: deepOrange[700],
        text: {
            primary: '#00FF80',
            secondary: '#fff',
        },
    },

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <ContextProvider>
                    <App/>
                </ContextProvider>
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);

