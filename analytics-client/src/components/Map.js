import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '400px',
  height: '400px'
};
 
 
function Map() {
  const mapContainerStyle = {
    height: "100%",
    width: "100%"
  }
  
  const center = {
    lat: 0,
    lng: -180
  }
  

  const [positions, setPositions] = useState([]);
  
  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/locations')
    .then((results)=>{
      setPositions(results.data);
    });
  }, []);
  return (
    <LoadScript
    googleMapsApiKey="AIzaSyDTHZOwBAtGA826SoYUXTOT7WkAKnhfdLE"
  >
  <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={2}
    center={center}
  >
    {positions.map(position=>{
      return (
      <Marker
        onLoad={onLoad}
        position={position.geolocation.location}
      />
      );
    })}
   
  </GoogleMap>
  </LoadScript>
  );
}

export default React.memo(Map);
