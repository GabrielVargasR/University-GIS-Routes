import { useState } from "react";
import { useMapEvents } from "react-leaflet";

const ClickHandler = () => {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      console.log(e.latlng);
    },
  });

  return null;
};

export default ClickHandler;