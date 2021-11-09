import { Marker } from "react-leaflet";
// import Marker from 'react-leaflet-enhanced-marker';

const Stop = (props) => {
    // prepara las coordenadas a como las espera Marker
    const coordinates = [props.obj.geometry.coordinates[1], props.obj.geometry.coordinates[0]];
    
    // click handler para Marker
    const onClick = () => props.clickHandler(props.obj.properties.id);
    
    // objeto para todos los event handlers del Marker
    const markerHandler = {
        click: onClick
    };

    return (
        <Marker position={coordinates} eventHandlers={markerHandler}/>
    )
}


export default Stop;