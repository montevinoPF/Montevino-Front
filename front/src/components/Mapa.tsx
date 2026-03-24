"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapaComponent() {
  return (
    <MapContainer
      center={[-34.6037, -58.3816]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "250px", width: "100%" }}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=TbwoWCUIhrcSRu5pvMQk`}
      />
      <Marker position={[-34.6037, -58.3816]} icon={customIcon}>
        <Popup>Montevino</Popup>
      </Marker>
    </MapContainer>
  );
}
