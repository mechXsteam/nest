import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import Axios from "axios";

export default function BookPropertyVisitForm(props) {
    const [open, setOpen] = React.useState(false);
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const userDetails = JSON.parse(localStorage?.getItem('userDetails')) || ""
    console.log('userDetails',userDetails)
    const {email, user_id} = userDetails || ""

    const favoriteProperties = JSON.parse(localStorage.getItem('favoriteCards'))

    const handleSubmit = async () => {
        const data = {
            "favorite_listings": `${favoriteProperties}`,
            "contact": FormData.contact,
            "name": FormData.name,
            "email": email,
        }
        const response = userDetails ? await Axios.patch(`http://127.0.0.1:8000/api/vi/property_visit/${user_id}/`, data) : ''
        setOpen(false);
        setFormData({
            name: "",
            email: "",
            contact: "",
        })
    };


    function handleChange(event) {
        event.preventDefault();
        const {name, value} = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    return (
        <div>
            <Button variant="contained" color={'inherit'} size={"large"} onClick={handleClickOpen}>
                Book Property Visit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={'title'}>Submit the following details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        All the updates related to your property visit will be reflected here. We will specify a date
                        and time interval for your visit for each property.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        name={"name"}
                        value={FormData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        name="email"
                        value={FormData.email}
                        onChange={handleChange}
                    /><TextField
                    autoFocus
                    margin="dense"
                    id="contact"
                    label="Contact No."
                    type="integer"
                    fullWidth
                    variant="standard"
                    name={"contact"}
                    value={FormData.contact}
                    onChange={handleChange}
                /><TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Properties selected"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={favoriteProperties}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={"contained"} color={"warning"}>Cancel</Button>
                    <Button onClick={handleSubmit} variant={'contained'} color={"success"}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
