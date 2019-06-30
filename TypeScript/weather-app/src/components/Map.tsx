import React, { useEffect } from 'react'
import GoogleMapsLoader from 'google-maps';

import './Map.css';

type MapProps = {
  getWeather: (lat: number, lng: number) => void;
  mapReady: Function;
}

const Map: React.FC<MapProps> = ({ getWeather, mapReady }: MapProps) => {
  useEffect(() => {
    GoogleMapsLoader.KEY = 'AIzaSyB5o5wtvz2sf_ckQm9rciFuJxc4pp2Sx-o';
    GoogleMapsLoader.VERSION = 'quarterly';

    GoogleMapsLoader.load(google => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6811673, lng: 139.7648629 }, // default is Tokyo station!!
        zoom: 8,
        mapTypeControl: false,
        disableDoubleClickZoom: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        streetViewControl: false,
        scaleControl: false,
        rotateControl: false,
        panControl: false,
      });

      map.addListener('click', (e) => {
        getWeather(
          e.latLng.lat(),
          e.latLng.lng()
        );
      })

      mapReady();
    });
  }, []);

  return (
    <div id="map" className="map"></div>
  )
}

export default Map;
