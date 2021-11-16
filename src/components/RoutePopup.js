import Popup from "reactjs-popup";
import "./RoutePopup.css"

const RoutePopup = (props) => {
    return (
        // popup para desplegar el detalle de la ruta
        <Popup open={props.open} closeOnDocumentClick onClose={props.close}>
            <div className="popup">
                <pre>{props.route}</pre>
            </div>
      </Popup>
    );
}

export default RoutePopup;