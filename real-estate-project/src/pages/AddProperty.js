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

function createData(sno, name, remove) {
    return {sno, name, remove};
}

export default function AddProperty() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const [houseListings,setHousingList] = useState(JSON.parse(localStorage.getItem('favoriteCards'))||[])

    const rows = houseListings.map((listing, row) => {
        return createData(row + 1, listing, <DeleteIcon onClick={()=>{handleDelete(listing)}}/>)
    })
    const userDetails = JSON.parse(localStorage.getItem('user'))
    const {email, id} = userDetails
    const data = {
        "favorite_listings": `${houseListings}`,
    }
    useEffect(()=>{
        async function update(){
            const response = await Axios.patch(`http://127.0.0.1:8000/api/vi/property_visit/${id}/`, data)
            console.log(response)
        }
        update()
    },[houseListings])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    async function handleDelete(listing) {
        const updatedHousingList = houseListings.filter((house)=>house !== listing)
        console.log(updatedHousingList)
        setHousingList(updatedHousingList)
        localStorage.setItem('favoriteCards',JSON.stringify(updatedHousingList))
    }

    return (
        <div >
            <CssBaseline/>
            <Container sx={{display: 'flex', justifyContent: 'center', my: 3}}><Typography
                variant={'h2'}>DASHBOARD</Typography>

            </Container>
            <Container sx={{display: 'flex', justifyContent: 'center', my: 3}}><Typography>View all your favorite NEST
                here</Typography>
            </Container >
            <Container sx={{display: 'flex', justifyContent: 'center', my: 3}}>
                <BookPropertyVisitForm />
            </Container>

            <Paper sx={{width: '60%', overflow: 'hidden',mx:30}}>
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
        </div>
    );
}