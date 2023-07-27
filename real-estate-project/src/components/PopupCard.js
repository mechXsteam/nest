import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightboxDisplay from "./Lightbox";
import {useEffect} from "react";
import { useState} from "react";

export default function PopupCard(props) {
    const {cardData} = props
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favoriteCards")) || [];
        setFavoriteCards(storedFavorites);
    }, []);

    const handleFavoriteToggle = () => {
        const isCardFavorite = favoriteCards.includes(cardData.id);

        if (isCardFavorite) {
            const updatedFavorites = favoriteCards.filter(
                (cardId) => cardId !== cardData.id
            );
            setFavoriteCards(updatedFavorites);
            localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = [...favoriteCards, cardData.id];
            setFavoriteCards(updatedFavorites);
            localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
        }
    };

    const isCardFavorite = favoriteCards.includes(cardData.id);
    const datePostedString = props.date_posted
    const dateObject = new Date(datePostedString)
    const datePosted = dateObject.toLocaleDateString()
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title= {props.name}
                subheader={datePosted}
            />
            <CardMedia
                component="img"
                height="194"
                src={props.picture1}
                alt="property"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.description}...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleFavoriteToggle}
                    color={isCardFavorite ? "success" : "default"}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <LightboxDisplay picture1={props.picture1} picture4={props.picture4} picture2={props.picture2}
                                     picture3={props.picture3}/>
                </IconButton>
            </CardActions>
        </Card>
    );
}