import L from 'leaflet';

const create_icon = ({image_path}) => {
    return new L.Icon({
        iconUrl: require(image_path),
        iconSize: [20, 20]
    });
}

export default create_icon;