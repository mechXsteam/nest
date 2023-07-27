import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Grid from "@mui/material/Grid";

export default function ListingCard(props) {
    return (
        <Card className={"listingCard"} onClick={props.handleClick} >
            <CardActionArea>
                <CardMedia className={'container-overlay'}
                    component="img"
                    height="200"
                    image={props.image}
                    alt="property"
                />
                <Typography color={'white'} fontWeight={"bold"} className={'text-overlay'}>{props.property_status}</Typography>
                <Typography color={'white'} fontWeight={"bold"} className={"realtor-overlay"}>{props.realtor}</Typography>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description.substring(0,200)}...
                    </Typography>
                </CardContent>
                <Grid container justifyContent={'space-around'}>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>Rooms: {props.rooms}</Typography></Grid>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>Furnished</Typography> {props.furnished ? <CheckBoxIcon sx={{color:'springGreen'}}/> : <CheckBoxOutlineBlankIcon/> }</Grid>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>Pool</Typography> {props.pool ? <CheckBoxIcon sx={{color:'springGreen'}}/> : <CheckBoxOutlineBlankIcon/> }</Grid>
                </Grid>
                <Grid container justifyContent={'space-around'}>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>Elevator</Typography> {props.elevator ? <CheckBoxIcon sx={{color:'springGreen'}}/> : <CheckBoxOutlineBlankIcon/> }</Grid>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>CCTV</Typography> {props.cctv ? <CheckBoxIcon sx={{color:'springGreen'}}/> : <CheckBoxOutlineBlankIcon/> }</Grid>
                    <Grid item className={'room-features'} sx={{margin:1}}><Typography color={'white'}>Parking</Typography> {props.parking ? <CheckBoxIcon sx={{color:'springGreen'}}/> : <CheckBoxOutlineBlankIcon/> }</Grid>
                </Grid>
            </CardActionArea>

            <CardActions style={{padding:'0'}}>
                <div className={"price-catalog"}>₹ {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </CardActions>
        </Card>
    );
}