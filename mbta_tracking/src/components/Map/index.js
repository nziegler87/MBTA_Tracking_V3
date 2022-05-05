import React, {useEffect, useState} from "react";
import axios from "axios";
import MapMarker from "./MapMarker";

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const Map = () => {
    const [train_info, update_train_info] = useState({"data":[]});

    const get_data = async () => {
        let myInterval = setInterval(async () => {
            try {
                const request_url = "https://api-v3.mbta.com/vehicles/?api_key=0e2ef1b620f74c8e99aa627d2f28316e&include=route,trip,stop&filter[route_type]=0,1"
                const response = await axios.get(request_url);
                if (response.status === 200) {
                    update_train_info(response.data)
                } else {
                    update_train_info([])
                }
            } catch (e) {
                update_train_info([])
            }
            }, 5000
        )
    }
    useEffect(() => {
        get_data();
    },[])

    const position = [42.3601, -71.0589]

    return(
        train_info.length === 0 ? <h1 className={"text-center"}>No train data to display!</h1> :
            // <pre>{JSON.stringify(train_info.data, undefined, 4)}</pre>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/nziegler87/ckfvnoo0d11gv1apc9szyzpve/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibnppZWdsZXI4NyIsImEiOiJja2Z2bmh2dDEwdmFuMnpwOXp4Nmozb3pjIn0.meDquxkUvXCwGz8xA29Xfw"
                />
                {train_info.data.map(train => <MapMarker key={train.id} train={train} train_data={train_info}/>)}
            </MapContainer>

    )

}

export default Map;