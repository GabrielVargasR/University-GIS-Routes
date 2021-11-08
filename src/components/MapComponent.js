import { useState } from "react";
import "./MapComponent.css";
import { L } from 'leaflet';
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const ClickHandler = () => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click(e) {
          setPosition(e.latlng);
          console.log(e.latlng);
      }
    })
  
    return null;
  }

const MapComponent = () => {

    return (
        <MapContainer center={[9.9325427, -84.0795782]} zoom={8}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler/>
        </MapContainer>
    );
};

export default MapComponent;
