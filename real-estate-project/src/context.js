import Axios from 'axios'

import {createContext} from "react";
import {useState, useEffect} from 'react';


const Context = createContext("");


function ContextProvider(props) {

    // retrieves all the listings from the database and the data gets stored in the listings variable.
    const [listings, setListings] = useState([])
    useEffect(() => {
        try {
            async function getAllListings() {
                const response = await Axios.get('http://127.0.0.1:8000/api/vi/',)
                setListings(response.data)
            }

            getAllListings()
        } catch (e) {
            console.log(new Error('some error occurred', e))
        }
    }, [])




    // All the data is distributed through context (centralised system)
    const context = {
        // listings
        listings,
    }

    return (
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context};