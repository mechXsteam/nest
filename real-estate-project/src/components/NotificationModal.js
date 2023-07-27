import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: "#404240",
    borderRadius:'5px',
    boxShadow: 24,
    p: 4,
    color:'white'
};

export default function NotificationModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const position = [28.632932070640823, 77.21966424043708]
    return (
        <div>
            <Button onClick={handleOpen}><NotificationsActiveIcon sx={{color:'springGreen'}}/></Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <span className={'title'}>Great news!</span> Your property visit has been successfully booked.
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            We look forward to welcoming you on <span className={'title'}>{props.day} at {props.time}</span> at our designated location.
                            Our team is excited to assist you throughout the visit and provide valuable insights to help
                            you make an informed decision. See you soon at the scheduled location! <span className={'title'}>@NEST_headquarters</span>
                        </Typography>
                        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '50vh',marginTop:10}} >
                            {/* attribution to leaflet */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    See you soon !!!
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}