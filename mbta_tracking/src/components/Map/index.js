import React, {useEffect, useState} from "react";
import axios from "axios";
import MapMarker from "./MapMarker";

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
const MBTA_API = "https://api-v3.mbta.com/"
const API_KEY = {"api_key":"0e2ef1b620f74c8e99aa627d2f28316e"}
const INCLUDE = {"include": "route,trip"}
const FILTER = {"filter[route_type]":"0,1"}
const PARAMS = {params: {API_KEY, FILTER, INCLUDE}}
const ROUTE = 'ROUTE'



const Map = () => {
    const [train_info, update_train_info] = useState({"data":[]});

    const get_data = async () => {
        let myInterval = setInterval(async () => {
        const request_url = "https://api-v3.mbta.com/vehicles/?api_key=0e2ef1b620f74c8e99aa627d2f28316e&include=route,trip&filter[route_type]=0,1"
        const response = await axios.get(request_url);
        if ( response.status === 200 ){
            update_train_info(response.data)
        } else {
        }
        }, 1000
    )
    }
    useEffect(() => {
        get_data();
    },[])

    const position = [42.3601, -71.0589]

    return(
        // <pre>{JSON.stringify(train_info.data, undefined, 4)}</pre>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://api.mapbox.com/styles/v1/nziegler87/ckfvnoo0d11gv1apc9szyzpve/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnppZWdsZXI4NyIsImEiOiJja2Z2bmh2dDEwdmFuMnpwOXp4Nmozb3pjIn0.meDquxkUvXCwGz8xA29Xfw"
            />
            {train_info.data.map(train => <MapMarker key={train.id} train={train}/>)}
        </MapContainer>
    )

}

export default Map;