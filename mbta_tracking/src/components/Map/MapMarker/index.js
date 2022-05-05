import React from "react";
import {Marker, Popup} from "react-leaflet";

const MapMarker = ({train}) => {
    return(
        <Marker position={[train.attributes.latitude, train.attributes.longitude]}>
            <Popup>
                {train.relationships.route.data.id}
            </Popup>
        </Marker>
    )
}

export default MapMarker;
