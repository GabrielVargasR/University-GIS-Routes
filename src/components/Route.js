import { GeoJSON, Tooltip } from "react-leaflet";

const Route = (props) => {
    // se crea un valor RGB de forma aleatoria para
    // distinguir las distintas rutas
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = "rgb("+r+" ,"+g+","+ b+")";

    return (
    // Hace una línea un poco más gruesa y con el color aleatorio
    <GeoJSON data = {props.obj} style={{color:color, weight: 6}}>
        {/* tooltip con el nombre de la ruta cada */}
        <Tooltip>{props.obj.properties.nombre}</Tooltip>
    </GeoJSON>
    );
}

export default Route