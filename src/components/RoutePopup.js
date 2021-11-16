import Popup from "reactjs-popup";
import "./RoutePopup.css"

const RoutePopup = (props) => {
    return (
        // popup para desplegar el detalle de la ruta
        <Popup open={props.open} closeOnDocumentClick onClose={props.close}>
            <div>
                <div className='container' onClick={props.close}>
                    <pre className='popup'>{props.route}</pre>
                </div>
            </div>
      </Popup>
    );
}

export default RoutePopup;