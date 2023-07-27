// MUI table component

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import BookPropertyVisitForm from "../components/BookPropertyVisitForm";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import jwtDecode from "jwt-decode";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


function UpdateProfileForm() {

    const access_token = localStorage.getItem('access_token')
    const {user_id} = jwtDecode(access_token)
    const [formData, setFormData] = React.useState({})
    React.useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/api/vi/user/${user_id}/`)
            .then(response => setFormData(response.data))
    }, [user_id])


    function handleChange(event) {
        // event.preventDefault();
        const {name, value} = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.get('first_name');
        data.get('last_name');
        data.get('username');
        data.get('password');

        Axios.patch(`http://127.0.0.1:8000/api/vi/user/${user_id}/`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(response => {
                Axios.post(`http://127.0.0.1:8000/api/token/`, {
                    username: formData.username,
                    password: formData.password
                })
                    .then(response => {
                        const {access} = response.data
                        localStorage.setItem('access_token', access)
                        console.log('access token', access)

                    })
                    .catch(error => {
                        console.error(error);
                    });
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="firstName"
                                autoFocus
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                name="last_name"
                                autoComplete="family-name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="username"
                                autoComplete="email"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="New password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        color={'success'}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

// defining columns
const columns = [
    {id: 'sno', label: 'S.no', minWidth: 10},
    {
        id: 'name',
        label: 'Property Listing',
        minWidth: 200,
        align: 'center',
    },
    {
        id: 'remove',
        label: 'Remove Listing',
        minWidth: 200,
        align: 'center',
    }
];

// function to create the rows
function createData(sno, name, remove) {
    return {sno, name, remove};
}

function FavoriteListings() {
    // MUI default functions...
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Mine logic starts here...

    // 'favoriteCards' is the key against which selected listings are stored in the localStorage, as such...
    // favoriteCards = ['listing 1',listing 2',...]
    const [houseListings, setHousingList] = useState(JSON.parse(localStorage.getItem('favoriteCards')) || [])

    // So to delete a listing, we are setting the new array to the localStorage which excludes the listing clicked.
    async function handleDelete(listing) {
        const updatedHousingList = houseListings.filter((house) => house !== listing)
        setHousingList(updatedHousingList)
        localStorage.setItem('favoriteCards', JSON.stringify(updatedHousingList))
    }

    // Settings up the rows and each row consist of s.no, listing name, delete icon
    const rows = houseListings.map((listing, row) => {
        return createData(row + 1, listing, <DeleteIcon className={'title'} onClick={() => {
            handleDelete(listing)
        }}/>)
    })

    // Whenever a listing is deleted, we need to update the database with the new array of listings, so we are sending
    // post request everytime whenever houseListings array changes. This functionality has been achieved with useEffect
    // hook.
    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        const {user_id} = jwtDecode(access_token)
        // retrieving user's data from localStorage
        // we need to update the listing of a specific user, hence id is necessary
        // new updated list after every delete click, this schema I got from the api that I've built using DRF.
        const data = {
            "favorite_listings": `${houseListings}`,
        }
        // sending patch request to the server
        async function update() {
            const response = await Axios.patch(`http://127.0.0.1:8000/api/vi/property_visit/${user_id}/`, data)
            console.log(response)
        }

        update()
    }, [houseListings])


    return (
        <Container sx={{my: 20}} >
            <BookPropertyVisitForm/>
            <Paper sx={{width: '100%', overflow: 'hidden', justifyContent: 'center', my: 5}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulating the background loading delay
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(delay);
    }, []);

    if (isLoading) {
        return <LinearProgress color={"success"}/>
    }
    return <Container>
        <Grid container spacing={12}>
            <Grid item md={7}><FavoriteListings/></Grid>
            <Grid item md={5}><UpdateProfileForm/></Grid>
        </Grid>
    </Container>
}