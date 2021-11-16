import { useState, useEffect, useCallback } from "react";
import "./MapComponent.css";
import GeoServerController from "../controllers/GeoServerController";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Stop from "./Stop";
import Route from "./Route";

const MapComponent = () => {
    // estados para manejar las capas de carreteras y paradas
    const [roads, setRoads] = useState(null);
    const [stops, setStops] = useState(null);

    // estado para manejar las rutas
    const [source, setSource] = useState(-1);
    const [route, setRoute] = useState(null);
    
    // callbacks para manejar llamadas a backend (geoserver)
    const fetchRoads = useCallback(() => {
        const geoServerController = new GeoServerController();
        geoServerController.getRoads()
        // si se obtiene respuesta del Promise
        .then((geoJSON) => {
            // se carga el geojson de carreteras
            setRoads(geoJSON);
        })
        .catch(() => {
            setRoads(null);
        })
    }, []);

    const fetchStops = useCallback(() => {
        const geoServerController = new GeoServerController();
        geoServerController.getStops()
        // si se obtiene respuesta del Promise
        .then((geoJSON) => {
            // se carga el geojson de las paradas
            setStops(geoJSON);
        })
        .catch(() => {
            setRoads(null);
        })
    }, []);

    // se llama al controlador para obtener las calles y las paradas
    // esta llamada se ejecuta la primera vez que se carga el Component
    useEffect(() => {
        fetchRoads();
        fetchStops();
    }, [fetchRoads, fetchStops]);

    // handler para manejar los clicks de cada parada
    const stopHandler = (stop_id) => {
        if (source===-1) {
            setRoute(null);
            setSource(stop_id);
        }
        else {
            console.log(source, stop_id);
            const geoServerController = new GeoServerController();
            geoServerController.getRoutes(source, stop_id)
            .then((geoJSON)=>{
                console.log(geoJSON);
                setRoute(geoJSON);
                setSource(-1);
            })
            .catch(()=>{
                setSource(-1);
            });
        }
    };

    const onRouteSegment = (segment, layer) => {
        console.log(segment);
    }


    return (
        <MapContainer center={[10.193297204997892, -84.37774658203125]} zoom={10}>
            {/* mapa base de OpenStreetMaps */}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* se cargan las carreteras y las paradas una vez que se obtienen del backend */}
            {roads && <GeoJSON data={roads.features} style={{color:'black'}}/>}
            {stops && stops.features.map((stop) => {return (<Stop obj={stop} clickHandler={stopHandler} key={stop.properties.id}/>)})}
            {route && route.features.map((sub_route) => {return <Route obj={sub_route}/>})}
        </MapContainer>
    );
};

export default MapComponent;
