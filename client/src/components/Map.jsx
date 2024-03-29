import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 34.00,
  lng: -118.00
};

function Map({ posts }) {
  const [coordinates, setCoordinates] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAzvl6nelJ7MoPM0TcOqnVOr2PkoOUq_iw"
  })

  const [location, setLocation] = React.useState('')
  const [map, setMap] = React.useState(null);

  useEffect(() => {
    const values = posts.map((post) => {
      console.log(post.lat, post.lng);

      return {
        lat: +post.lat,
        lng: +post.lng
      };
    });

    setCoordinates(values);
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    coordinates.forEach((location) => {
      bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
    });

    map.fitBounds(bounds);

    setMap(map);
  }, [coordinates]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGetCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=AIzaSyAzvl6nelJ7MoPM0TcOqnVOr2PkoOUq_iw`
      );

      const { results } = response.data;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat, lng });

        // Fit the map to the bounds of the new coordinates
        const bounds = new window.google.maps.LatLngBounds({ lat, lng });
        map.fitBounds(bounds);
      } else {
        console.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      coordinates={coordinates}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onChange={handleLocationChange}
      onClick={handleGetCoordinates}
    >
      { /* Child components, such as markers, info windows, etc. */}
      {(coordinates.map((location, index) => {
        return <Marker key={index} position={location} />
      }))}
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)