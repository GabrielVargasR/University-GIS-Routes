import { useState, useEffect, useCallback } from "react";
import "./MapComponent.css";
import GeoServerController from "../controllers/GeoServerController";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ClickHandler from "../handlers/ClickHandler";

const MapComponent = () => {
    const [roads, setRoads] = useState(null);
    const [stops, setStops] = useState(null);
    
    const fetchRoads = useCallback(() => {
        const geoServerController = new GeoServerController();
        geoServerController.getRoads()
        .then((geoJSON) => {
            setRoads(geoJSON);
        })
        .catch(() => {
            setRoads(null);
        })
    }, []);

    const fetchStops = useCallback(() => {
        const geoServerController = new GeoServerController();
        geoServerController.getStops()
        .then((geoJSON) => {
            setStops(geoJSON);
        })
        .catch(() => {
            setRoads(null);
        })
    }, []);

    useEffect(() => {
        fetchRoads();
        fetchStops();
    }, [fetchRoads, fetchStops]);

    return (
        <MapContainer center={[9.9325427, -84.0795782]} zoom={8}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {roads && <GeoJSON data={roads.features}/>}
            {stops && <GeoJSON data={stops.features}/>}
            <ClickHandler/>
        </MapContainer>
    );
};

export default MapComponent;
