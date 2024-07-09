import { useEffect } from "react";
import { useMap } from "react-leaflet";


function SetViewOnClick({ coords, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, zoom);
    }
  }, [coords, zoom]);

  return null;
}

export default SetViewOnClick;
