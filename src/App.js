import MapComponent from './components/MapComponent'
import { useState } from 'react';
import RoutePopup from './components/RoutePopup';

const App = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [route, setRoute] = useState("Ruta:<br>");

  const closePopup = () => setOpenPopup(false);

  return (
    <div>
      <MapComponent popup={setOpenPopup} routeInfo={setRoute}/>
      <RoutePopup open={openPopup} close={closePopup} route={route}/>
    </div>
  );
}

export default App;
