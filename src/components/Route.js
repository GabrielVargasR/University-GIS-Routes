import { GeoJSON } from "react-leaflet";

const Route = (props) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = "rgb("+r+" ,"+g+","+ b+")";

    return (
    <GeoJSON data = {props.obj} style={{color:color}}/>
    );
}

export default Route