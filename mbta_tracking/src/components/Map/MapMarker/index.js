import React from "react";
import {Marker, Popup} from "react-leaflet";
import L from 'leaflet'

const color_mapping = new Map();
color_mapping.set("00843D", "green");
color_mapping.set("ED8B00", "orange");
color_mapping.set("DA291C", "red");
color_mapping.set("003DA5", "blue");

const find_direction = (train, train_data) => {
    const route = train_data.included.find(route => route.id === train.relationships.route.data.id)
    return route.attributes.direction_destinations[train.attributes.direction_id]
}

const find_route_hex_color = (train, train_data) => {
    const route = train_data.included.find(route => route.id === train.relationships.route.data.id)
    return route.attributes.color
}

const find_route_text_color = (train, train_data) => {
    const route = train_data.included.find(route => route.id === train.relationships.route.data.id)
    const route_hex = route.attributes.color
    return color_mapping.get(route_hex);
}

const MapMarker = ({train, train_data}) => {
    const text_color = find_route_text_color(train, train_data);
    const icon = new L.Icon({
        iconUrl: `./map_icons/${text_color}/${text_color}_${train.attributes.bearing}.png`,
        iconSize: [15, 15]
    })
    return(
        <Marker position={[train.attributes.latitude, train.attributes.longitude]} icon={icon}>
            <Popup>
                {find_direction(train, train_data)}
                <br/>
            </Popup>
        </Marker>
    )
}

export default MapMarker;
