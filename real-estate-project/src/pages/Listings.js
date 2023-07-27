import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import {Grid} from '@mui/material'
import {Icon} from 'leaflet'
import PopupCard from '../components/PopupCard'
import apartmentsIconPng from '../assets/apartments.png'
import ListingCard from '../components/ListingCard'
import {Context} from "../context";
import {useContext, useEffect, useState} from "react";
import LinearProgress from "@mui/material/LinearProgress";


export default function Listings() {
    const [location, setLocation] = useState({
        lat: 51.505,
        lng: -0.09
    })

    const context = useContext(Context);
    const {listings} = context
    const apartmentsIcon = new Icon({
        iconUrl: apartmentsIconPng,
        iconSize: [40, 40]
    });

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulating the background loading delay
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(delay);
    }, []);


    function MyComponent() {
        const map = useMap()
        map.flyTo([location.lat, location.lng], map.getZoom())
    }

    if (isLoading) {
        return <LinearProgress color={"success"}/>
    }

    return <Grid container>

        <Grid item xs={5} justifySelf={"center"}>
            {listings.map((listing) => <ListingCard key={listing.id} image={listing.picture1} title={listing.title}
                                                    description={listing.description}
                                                    property_status={listing.property_status}
                                                    price={listing.price}
                                                    realtor={listing.realtor}
                                                    rooms={listing.rooms}
                                                    furnished={listing.furnished}
                                                    pool={listing.pool}
                                                    elevator={listing.elevator}
                                                    cctv={listing.cctv}
                                                    parking={listing.parking}
                                                    date_posted={listing.date_posted}
                                                    handleClick={() => {
                                                        setLocation({
                                                            lat: listing.lattitude,
                                                            lng: listing.longitude
                                                        })
                                                    }}

            />)}

        </Grid>
        <Grid item xs={8} className={"sticky"}>
            <MapContainer id={"myCont"} center={[28.632932070640823, 77.21966424043708]} zoom={30} scrollWheelZoom={true}
                          style={{height: '100vh'}}>
                <MyComponent/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {listings.map((listing) => {
                    return (
                        <Marker key={listing.id} position={[listing.lattitude, listing.longitude]}
                                icon={apartmentsIcon}>
                            <Popup>
                                <PopupCard picture1={listing.picture1}
                                           picture2={listing.picture2} picture3={listing.picture3}
                                           picture4={listing.picture4}
                                           description={listing.description.substring(0, 100)}
                                           name={listing.title}
                                           cardData={{id: listing.title}}
                                           date_posted={listing.date_posted}
                                />
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </Grid>
    </Grid>
}